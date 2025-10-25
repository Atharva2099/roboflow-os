import type { DragEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import type {
  Connection,
  Node,
  NodeTypes,
} from 'reactflow';
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomWorkflowNode from './CustomWorkflowNode';

// Define custom node types
const nodeTypes: NodeTypes = {
  customNode: CustomWorkflowNode,
};

// No custom edge types needed - using default smoothstep

// Node type configurations with clean icons
const nodeConfigs = {
  pick: {
    icon: '🤖',
  },
  move: {
    icon: '➡️',
  },
  drop: {
    icon: '📦',
  },
};

export default function CanvasPanel() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(0);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if there's already an edge between these nodes
      const existingEdge = edges.find(
        (edge) => 
          (edge.source === params.source && edge.target === params.target) ||
          (edge.source === params.target && edge.target === params.source)
      );

      if (existingEdge) {
        // Delete the existing edge
        setEdges((eds) => eds.filter((edge) => edge.id !== existingEdge.id));
        console.log('Deleted existing edge:', existingEdge.id);
      } else {
        // Add new edge
        setEdges((eds) =>
          addEdge(
            {
              ...params,
              animated: false,
              style: { 
                stroke: '#6B7280', 
                strokeWidth: 1.5,
                strokeDasharray: '5,5'
              },
              type: 'smoothstep',
            },
            eds
          )
        );
        console.log('Added new edge');
      }
    },
    [setEdges, edges]
  );

  // Handle drag over canvas
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop on canvas
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = event.dataTransfer.getData('application/reactflow');

      if (!nodeData) return;

      const { type, title } = JSON.parse(nodeData);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${type}_${nodeIdCounter}`,
        type: 'customNode',
        position,
        data: {
          label: title,
          nodeType: type,
          config: nodeConfigs[type as keyof typeof nodeConfigs],
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeIdCounter((id) => id + 1);
    },
    [reactFlowInstance, nodeIdCounter, setNodes]
  );

  // Handle node deletion
  const onNodesDelete = useCallback(
    (deleted: Node[]) => {
      console.log('Nodes deleted:', deleted);
    },
    []
  );

  // Handle edge deletion
  const onEdgesDelete = useCallback(
    (deleted: any[]) => {
      console.log('Edges deleted:', deleted);
    },
    []
  );

  // Handle custom edge deletion
  const handleEdgeDelete = useCallback(
    (edgeId: string) => {
      console.log('Deleting edge:', edgeId);
      setEdges((eds) => eds.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  return (
    <div className="relative h-full w-full bg-gray-900" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1.6 }}
        deleteKeyCode="Delete"
        snapToGrid={true}
        snapGrid={[20, 20]}
        defaultEdgeOptions={{
          animated: false,
          style: { 
            stroke: '#6B7280', 
            strokeWidth: 1.5,
            strokeDasharray: '5,5'
          },
          type: 'smoothstep',
        }}
        className="bg-gray-900"
      >
        <Background
          color="#374151"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
        />
        
        <Controls
          className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
          showInteractive={false}
        />
      </ReactFlow>

      {/* Empty state message */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-4 text-gray-400">⚡</div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Start Building Your Workflow
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Drag nodes from the toolbox to get started
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Hover over nodes to see delete button</p>
              <p>• Connect to existing edge to delete it</p>
              <p>• Press Delete key to remove selected items</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
