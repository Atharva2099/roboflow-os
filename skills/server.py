import asyncio
import json
import websockets

connected_clients = set()

# 💾 Embedded workflow data (you can edit this list directly)
workflow_data = [
    { "tool": "pick", "object": "tape" },
    { "tool": "place", "object": "bowl" },
]

async def handler(websocket):
    print("✅ Client connected:", websocket.remote_address)
    connected_clients.add(websocket)

    try:
        while True:
            # Send the entire workflow as a single JSON array
            message = json.dumps(workflow_data)
            await websocket.send(message)
            print(f"📤 Sent complete workflow: {workflow_data}")
            
            # Wait before sending again
            await asyncio.sleep(5)  # delay before repeating

    except websockets.exceptions.ConnectionClosedOK:
        print("❌ Client disconnected normally.")
    except websockets.exceptions.ConnectionClosedError as e:
        print(f"⚠️ Connection error: {e}")
    finally:
        connected_clients.remove(websocket)
        print("🧹 Cleaned up connection.")

async def main():
    # Start WebSocket server
    async with websockets.serve(handler, "0.0.0.0", 8000):
        print("🚀 WebSocket server running on ws://localhost:8000/ws")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n🛑 Server stopped manually")