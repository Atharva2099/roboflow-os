"use client";
import CanvasPanel from "./CanvasPanel";
import ChatPanel from "./ChatPanel";
import ToolboxPanel from "./ToolboxPanel";

export default function WorkflowLayout() {
  const handleAddNode = (node: { type: string; title: string }) => {
    // Use the global handler if available
    if ((window as any).addNodeHandler) {
      (window as any).addNodeHandler(node);
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-900 overflow-hidden">
      {/* Left Panel - Chat */}
      <div className="w-80 h-full border-r border-gray-700 bg-gray-800 shrink-0">
        <ChatPanel />
      </div>
      
      {/* Center Panel - Canvas */}
      <div className="flex-1 h-full relative min-w-0">
        <CanvasPanel />
      </div>
      
      {/* Right Panel - Toolbox */}
      <div className="w-80 h-full border-l border-gray-700 bg-gray-800 shrink-0">
        <ToolboxPanel onAddNode={handleAddNode} />
      </div>
    </div>
  );
}
