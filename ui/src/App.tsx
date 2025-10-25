import { useState } from "react";
import robotImage from "./assets/so100.png";
import { Particles } from "./components/ui/particles";
import { TextHoverEffect } from "./components/ui/text-hover-effect";
import { TypewriterEffectSmooth } from "./components/ui/typewriter-effect";
import WorkflowBuilder from "./pages/WorkflowBuilder";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "workflow">("home");

  const words = [
    {
      text: "Build",
      className: "text-white",
    },
    {
      text: "powerful",
      className: "text-blue-400",
    },
    {
      text: "robot",
      className: "text-green-400",
    },
    {
      text: "workflows",
      className: "text-purple-400",
    },
  ];

  if (currentPage === "workflow") {
    return <WorkflowBuilder />;
  }

  return (
    <div className="min-h-screen w-full bg-black relative">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <div className="relative z-10 flex flex-col justify-center min-h-screen">
        <TextHoverEffect text="So100 Robot Arm" />
        <div className="">
          <TypewriterEffectSmooth words={words} />
        </div>
        <div className="mt-8 ml-28">
          <button
            onClick={() => setCurrentPage("workflow")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-semibold transition-colors"
          >
            🚀 Open Workflow Builder
          </button>
        </div>
      </div>
      <div className="absolute right-22 bottom-40">
        <img
          src={robotImage}
          alt="SO100 Robotic Arm"
          className="w-[420px] md:w-[480px] lg:w-[520px] animate-float"
        />
      </div>
    </div>
  )
}

export default App
