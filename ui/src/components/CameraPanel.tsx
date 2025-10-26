"use client";
import { useEffect, useRef, useState } from "react";

interface CameraPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CameraPanel({ isOpen, onClose }: CameraPanelProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [size, setSize] = useState({ width: 300, height: 100 });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    if (isOpen && !stream) {
      startCamera();
    } else if (!isOpen && stream) {
      stopCamera();
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 300, 
          height: 100,
          facingMode: 'user' // Front-facing camera for mirror effect
        }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError("Failed to access camera");
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only start dragging if clicking on the header area
    const target = e.target as HTMLElement;
    if (target.closest('.camera-header')) {
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - size.width / 2,
        y: e.clientY - 30
      });
    } else if (isResizing) {
      const newSize = {
        width: Math.max(200, e.clientX - position.x),
        height: Math.max(80, e.clientY - position.y)
      };
      setSize(newSize);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, size, position]);

  const handleResize = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed z-50 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
      }}
      onMouseDown={handleMouseDown}
    >
        {/* Header */}
        <div className="camera-header flex items-center justify-between p-2 bg-gray-700 rounded-t-lg cursor-move select-none">
          <h3 className="text-sm font-medium text-white">Camera Feed</h3>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>

        {/* Video Container */}
        <div className="relative p-2" style={{ height: size.height - 40 }}>
          {error ? (
            <div className="flex items-center justify-center h-full bg-gray-900 rounded">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">📷</div>
                <p className="text-sm">{error}</p>
                <button
                  onClick={startCamera}
                  className="mt-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div className="relative bg-gray-900 rounded overflow-hidden h-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{
                  transform: 'scaleX(-1)' // Mirror the video horizontally
                }}
              />
            </div>
          )}
        </div>

        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize hover:bg-gray-500 transition-colors"
          onMouseDown={handleResize}
          style={{
            background: 'linear-gradient(-45deg, transparent 30%, #6B7280 30%, #6B7280 50%, transparent 50%)',
            borderBottom: '2px solid #6B7280',
            borderRight: '2px solid #6B7280'
          }}
        />
    </div>
  );
}
