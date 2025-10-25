import { memo } from 'react';
import type { EdgeProps } from 'reactflow';
import { useReactFlow } from 'reactflow';
import CustomEdge from './CustomEdge';

function EdgeWrapper(props: EdgeProps) {
  const { deleteElements } = useReactFlow();
  
  const handleDelete = (edgeId: string) => {
    deleteElements({ edges: [{ id: edgeId }] });
  };

  return <CustomEdge {...props} onDelete={handleDelete} />;
}

export default memo(EdgeWrapper);
