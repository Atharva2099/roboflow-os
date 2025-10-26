import { useEffect, useRef, useState } from 'react';
import type { Edge, Node } from 'reactflow';

interface BackendStep {
    tool: 'pick' | 'place';
    object: string;
}

export function useWorkflow() {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [hasReceivedData, setHasReceivedData] = useState(false);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const isConnectingRef = useRef(false);

    useEffect(() => {
        const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8000/ws';

        const connectWebSocket = () => {
            if (isConnectingRef.current) return;
            isConnectingRef.current = true;

            const websocket = new WebSocket(wsUrl);

            websocket.onopen = () => {
                console.log('✅ WebSocket connected:', wsUrl);
                isConnectingRef.current = false;
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current);
                    reconnectTimeoutRef.current = null;
                }
            };

            websocket.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    console.log('📩 Received:', data);
                    setHasReceivedData(true);

                    // Handle both single objects and arrays
                    const steps = Array.isArray(data) ? data : [data];
                    const workflowNodes = createWorkflowFromBackend(steps);
                    setNodes(workflowNodes.nodes);
                    setEdges(workflowNodes.edges);
                } catch (error) {
                    console.error('❌ Error parsing WebSocket data:', error);
                }
            };

            websocket.onclose = () => {
                console.log('⚠️ WebSocket closed, reconnecting in 3s...');
                isConnectingRef.current = false;
                reconnectTimeoutRef.current = setTimeout(() => {
                    if (!isConnectingRef.current) connectWebSocket();
                }, 3000);
            };

            websocket.onerror = (error) => {
                console.error('🚨 WebSocket error:', error);
                isConnectingRef.current = false;
            };

            setWs(websocket);
        };

        connectWebSocket();

        return () => {
            if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
            if (ws) ws.close(1000, 'Component unmounting');
        };
    }, []);

    return { nodes, edges, hasReceivedData, updateNodes: setNodes, updateEdges: setEdges };
}

function createWorkflowFromBackend(steps: BackendStep[]) {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    nodes.push({
        id: 'start',
        type: 'customNode',
        position: { x: 280, y: 100 },
        data: {
            label: 'Start',
            nodeType: 'start',
            config: { icon: '┌───┐\n│ ▶ │\n└───┘' }
        },
    });

    let currentY = 250;
    let previousNodeId = 'start';

    steps.forEach((step, index) => {
        const nodeId = `step_${index}`;
        let label = '';
        let nodeType = '';

        if (step.tool === 'pick') {
            label = `Pick`;
            nodeType = 'pick';
        } else if (step.tool === 'place') {
            label = `Drop`;
            nodeType = 'drop';
        }

        nodes.push({
            id: nodeId,
            type: 'customNode',
            position: { x: 280, y: currentY },
            data: {
                label,
                nodeType,
                pickDropValue: step.object, // Set the object as the selected option
                config: {
                    icon: step.tool === 'pick' ? '┌─┐\n│R│\n└─┘' : '┌───┐\n│ ▓ │\n└───┘'
                }
            },
        });

        edges.push({
            id: `edge_${index}`,
            source: previousNodeId,
            target: nodeId,
            type: 'smoothstep',
            style: { stroke: '#9CA3AF', strokeWidth: 1.5, strokeDasharray: '5,5' },
        });

        previousNodeId = nodeId;
        currentY += 200;
    });

    nodes.push({
        id: 'end',
        type: 'customNode',
        position: { x: 280, y: currentY },
        data: {
            label: 'End',
            nodeType: 'end',
            config: { icon: '┌───┐\n│ ⏹ │\n└───┘' }
        },
    });

    edges.push({
        id: 'edge_end',
        source: previousNodeId,
        target: 'end',
        type: 'smoothstep',
        style: { stroke: '#9CA3AF', strokeWidth: 1.5, strokeDasharray: '5,5' },
    });

    return { nodes, edges };
}