import { ChevronDown } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';
import type { NodeProps } from 'reactflow';
import { Handle, Position, useReactFlow } from 'reactflow';

interface CustomNodeData {
  label: string;
  nodeType: string;
  config: {
    icon: string;
  };
  pickDropValue?: string;
  delayValue?: string;
}

function CustomWorkflowNode({ data, selected, id }: NodeProps<CustomNodeData>) {
  const { deleteElements, setNodes } = useReactFlow();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState(data.delayValue || '5');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  };

  // Options for pick and drop nodes
  const pickOptions = ['Tape', 'Cube'];
  const dropOptions = ['Bowl', 'Box'];
  
  // Determine which options to use based on node type
  const options = data.nodeType === 'pick' ? pickOptions : dropOptions;

  const handleOptionSelect = (option: string) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              pickDropValue: option,
            },
          };
        }
        return node;
      })
    );
    setIsDropdownOpen(false);
  };

  const handleDelayChange = (value: string) => {
    setInputValue(value);
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              delayValue: value,
            },
          };
        }
        return node;
      })
    );
  };

  const handleDelayIncrement = () => {
    const newValue = (parseInt(inputValue) || 0) + 5;
    handleDelayChange(newValue.toString());
  };

  const handleDelayDecrement = () => {
    const newValue = Math.max(5, (parseInt(inputValue) || 5) - 5);
    handleDelayChange(newValue.toString());
  };

  // Determine if this is a start or end node
  const isStartNode = data.nodeType === 'start';
  const isEndNode = data.nodeType === 'end';
  const isPickDropNode = data.nodeType === 'pick' || data.nodeType === 'drop';
  const isDelayNode = data.nodeType === 'delay';

  return (
    <div
      className="
        group relative bg-gray-700/30 backdrop-blur-sm rounded-lg
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

      {/* Node Content */}
      <div className="p-3">
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

        {/* Pick/Drop Dropdown */}
        {isPickDropNode && (
          <div className="mt-3 relative" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full bg-gray-600/50 hover:bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-sm text-white flex items-center justify-between transition-colors"
            >
              <span>{data.pickDropValue || `Select ${data.nodeType === 'pick' ? 'object' : 'container'}`}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-50 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg">
                {options.map((option: string) => (
                  <button
                    key={option}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionSelect(option);
                    }}
                    className="w-full px-3 py-2 text-sm text-white hover:bg-gray-600 text-left transition-colors first:rounded-t-md last:rounded-b-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Delay Value Input */}
        {isDelayNode && (
          <div className="mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelayDecrement();
                }}
                className="bg-gray-600/50 hover:bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-sm text-white transition-colors"
              >
                −
              </button>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => handleDelayChange(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                min="5"
                step="5"
                className="flex-1 bg-gray-600/50 border border-gray-500 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelayIncrement();
                }}
                className="bg-gray-600/50 hover:bg-gray-600 border border-gray-500 rounded-md px-3 py-2 text-sm text-white transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-center">seconds (5 sec increments)</p>
          </div>
        )}
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

