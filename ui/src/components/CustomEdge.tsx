import { memo, useState } from 'react';
import type { EdgeProps } from 'reactflow';
import { getBezierPath } from 'reactflow';

interface CustomEdgeProps extends EdgeProps {
  onDelete?: (edgeId: string) => void;
}

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  onDelete,
}: CustomEdgeProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {/* Delete button in the middle of the edge */}
      {isHovered && (
        <g>
          <circle
            cx={labelX}
            cy={labelY}
            r="12"
            fill="#DC2626"
            stroke="#EF4444"
            strokeWidth="2"
            className="cursor-pointer"
            onClick={handleDelete}
          />
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[12px] fill-white font-bold pointer-events-none"
          >
            ×
          </text>
        </g>
      )}
    </>
  );
}

export default memo(CustomEdge);
