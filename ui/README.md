# 🤖 So100 Robot Arm - Workflow Builder

A modern, interactive web application for building visual workflows for robotic arm operations. Drag-and-drop interface to create, connect, and manage robot workflow nodes.

![Workflow Builder](client/src/assets/so100.png)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Usage](#usage)
- [Development](#development)
- [Scripts](#scripts)

## ✨ Features

- **Visual Workflow Builder**: Drag-and-drop interface for creating robot workflows
- **Interactive Canvas**: ReactFlow-powered canvas with snap-to-grid functionality
- **Three-Panel Layout**: 
  - Left: Chat panel for workflow assistance
  - Center: Main canvas for building workflows
  - Right: Toolbox with draggable nodes
- **Custom Node Types**: Pick 🤖, Move ➡️, Drop 📦 operations
- **Smart Connections**: Connect nodes with animated edges that can be deleted by reconnecting
- **Real-time Chat**: Workflow assistant chat interface
- **Responsive Design**: Modern dark theme with Tailwind CSS

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 4.1.16
- **Workflow Engine**: ReactFlow 11.11.4
- **Animations**: Framer Motion 11.18.2
- **UI Components**: Custom React components

### Key Dependencies

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "reactflow": "^11.11.4",
  "framer-motion": "^11.18.2",
  "tailwindcss": "^4.1.16"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
```

2. Install dependencies:
```bash
cd client
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
client/
├── src/
│   ├── assets/
│   │   └── so100.png              # Robot arm image
│   ├── components/
│   │   ├── ui/                    # UI components
│   │   │   ├── particles.tsx      # Particle background effect
│   │   │   ├── text-hover-effect.tsx
│   │   │   └── typewriter-effect.tsx
│   │   ├── CanvasPanel.tsx        # Main workflow canvas
│   │   ├── ChatPanel.tsx          # Workflow assistant chat
│   │   ├── ToolboxPanel.tsx       # Node toolbox with draggable nodes
│   │   ├── WorkflowLayout.tsx     # Three-panel layout
│   │   └── CustomWorkflowNode.tsx # Custom node component
│   ├── pages/
│   │   └── WorkflowBuilder.tsx    # Workflow builder page
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🧩 Key Components

### 1. **App.tsx** - Main Application
- Landing page with particle effects
- Page routing between home and workflow builder
- Hero section with typewriter and hover effects

### 2. **CanvasPanel.tsx** - Workflow Canvas
- ReactFlow integration with custom nodes
- Drag-and-drop functionality from toolbox
- Edge connection/deletion logic
- Snap-to-grid layout
- Empty state messaging

### 3. **ToolboxPanel.tsx** - Node Library
- Draggable node types (Pick, Move, Drop)
- Category organization
- Drag event handlers
- Visual node descriptions

### 4. **ChatPanel.tsx** - Workflow Assistant
- Real-time messaging interface
- System and user message types
- Timestamp display
- Input with send functionality

### 5. **CustomWorkflowNode.tsx** - Custom Node Component
- Visual node representation
- Delete button on hover
- Handle positions for connections
- Icon and label display

### 6. **WorkflowLayout.tsx** - Three-Panel Layout
- Responsive grid layout
- Border separation between panels
- Component orchestration

## 💡 Usage

### Creating a Workflow

1. **Start from the Landing Page**: Click "🚀 Open Workflow Builder"

2. **Add Nodes**: Drag nodes from the right toolbox to the canvas
   - **Pick** 🤖: Select an object to pick up
   - **Move** ➡️: Move to coordinates
   - **Drop** 📦: Drop object at location

3. **Connect Nodes**: Click and drag from the bottom handle of one node to the top handle of another

4. **Delete Nodes**: 
   - Hover over a node and click the red × button
   - Or select a node and press the Delete key

5. **Delete Edges**: Reconnect to an existing edge to delete it

6. **Chat Assistance**: Use the left panel to get help with your workflow

### Canvas Controls

- **Zoom**: Mouse wheel or controls in bottom-left
- **Pan**: Click and drag the canvas background
- **Snap to Grid**: Enabled by default (20x20 grid)
- **Fit View**: Automatically fits all nodes in view

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Key Development Features

- **Hot Module Replacement (HMR)**: Instant updates during development
- **TypeScript**: Full type safety
- **ESLint**: Code quality and consistency
- **Tailwind CSS**: Utility-first styling
- **ReactFlow**: Professional workflow builder

### Code Style

- Components use functional components with hooks
- TypeScript interfaces for type safety
- Tailwind CSS for styling
- Memoization for performance optimization
- Custom hooks where appropriate

## 🎨 Styling

The application uses:
- **Dark Theme**: Gray-800/900 backgrounds with blue accents
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-friendly layouts
- **Custom Animations**: Hover effects, transitions, and particle effects


## 📝 License

This project is created for a hackathon and is open for further development.

## 👨‍💻 Author

Built with ❤️ for the So100 Robot Arm Workflow Builder

---

**Happy Workflow Building!** 🚀
