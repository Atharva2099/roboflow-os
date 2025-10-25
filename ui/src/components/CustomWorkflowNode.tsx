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

  return (
    <div
      className={`
        group relative px-2 py-1.5 rounded-md
        bg-gray-700 border border-white
        transition-all duration-200 ease-in-out
        hover:border-white hover:border-opacity-80
        shadow-lg hover:shadow-xl
        min-w-[80px] max-w-[110px]
        ${selected ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}
      `}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 bg-gray-500 border border-gray-400 hover:bg-gray-400 transition-colors"
        style={{ top: -4 }}
      />

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[8px] transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100"
        title="Delete node"
      >
        ×
      </button>

      {/* Node Content */}
      <div className="flex items-center space-x-1">
        <div className="text-xs shrink-0 text-gray-300">
          {data.config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-[10px] truncate">
            {data.label}
          </h3>
          <p className="text-gray-400 text-[8px] uppercase tracking-wide">
            {data.nodeType}
          </p>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 bg-gray-500 border border-gray-400 hover:bg-gray-400 transition-colors"
        style={{ bottom: -4 }}
      />
    </div>
  );
}

export default memo(CustomWorkflowNode);

