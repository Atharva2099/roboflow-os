import type { DragEvent } from 'react';

// ToolboxPanel component interface
interface ToolboxPanelProps {
  onAddNode?: (node: { type: string; title: string }) => void;
}

export default function ToolboxPanel({ onAddNode }: ToolboxPanelProps) {
  const nodeTypes = [
    {
      category: "Triggers",
      nodes: [
        { type: "pick", title: "Pick", description: "Select an object to pick up", icon: "🤖" },
        { type: "move", title: "Move", description: "Move to coordinates", icon: "➡️" },
        { type: "drop", title: "Drop", description: "Drop object at location", icon: "📦" },
      ],
    },
  ];

  const handleNodeClick = (node: { type: string; title: string }) => {
    onAddNode?.(node);
  };

  const onDragStart = (event: DragEvent, node: { type: string; title: string }) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="h-full bg-gray-800 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Node Toolbox</h2>
        <p className="text-sm text-gray-400">Drag nodes to add to canvas</p>
      </div>
      
      {/* Node Categories */}
      <div className="p-4 space-y-6">
        {nodeTypes.map((category) => (
          <div key={category.category}>
            <h3 className="text-sm font-medium text-gray-300 mb-3">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.nodes.map((node) => (
                <div
                  key={node.type}
                  onClick={() => handleNodeClick(node)}
                  onDragStart={(e) => onDragStart(e, node)}
                  draggable
                  className="
                    p-3 bg-gray-700 rounded-lg cursor-grab active:cursor-grabbing
                    border border-gray-600 hover:border-gray-500 hover:shadow-lg
                    transition-all duration-200 hover:scale-[1.02]
                  "
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">{node.icon}</div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-white">
                        {node.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {node.description}
                      </p>
                    </div>
                    <div className="text-gray-500 text-sm">
                      ⋯
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
