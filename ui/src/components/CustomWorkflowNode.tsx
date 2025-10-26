import { memo } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';

interface CustomNodeData {
  label: string;
  nodeType: string;
  config: {
    icon: string;
  };
}

function CustomWorkflowNode({ data, selected, id }: NodeProps<CustomNodeData>) {
  const { deleteElements } = useReactFlow();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  // Determine if this is a start or end node
  const isStartNode = data.nodeType === 'start';
  const isEndNode = data.nodeType === 'end';

  return (
    <div
      className="
        group relative p-3 bg-gray-700/30 backdrop-blur-sm rounded-lg
        border hover:shadow-lg
        transition-all duration-200 hover:scale-[1.02]
      "
      style={{
        width: '280px',
        borderColor: isStartNode ? 'oklch(0.6 0.2 120)' : isEndNode ? 'oklch(0.6 0.2 0)' : 'oklch(0.71 0.2 307.12)',
      }}
    >
      {/* Input Handle - only for non-start nodes */}
      {!isStartNode && (
        <Handle
          type="target"
          position={Position.Top}
          className="w-2 h-2 bg-gray-500 border border-gray-400 hover:bg-gray-400 transition-colors"
          style={{ top: -4 }}
        />
      )}

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[8px] transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100 z-10"
        title="Delete node"
      >
        ×
      </button>

      {/* Node Content - exact match to ToolboxPanel layout */}
      <div className="flex items-center space-x-3">
        <div className="text-[10px] font-mono font-bold text-gray-300 leading-tight whitespace-pre">
          {data.config.icon}
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-white">
            {data.label}
          </h4>
          <p className="text-xs text-gray-400">
            {data.nodeType}
          </p>
        </div>
        <div className="text-gray-500 text-sm">
          ⋯
        </div>
      </div>

      {/* Output Handle - only for non-end nodes */}
      {!isEndNode && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-2 h-2 bg-gray-500 border border-gray-400 hover:bg-gray-400 transition-colors"
          style={{ bottom: -4 }}
        />
      )}
    </div>
  );
}

export default memo(CustomWorkflowNode);

