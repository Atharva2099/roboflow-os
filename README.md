# ROBOFLOW-OS

roboflow-os is a modular system for planning and executing robotic workflows through natural language prompts.  
it converts user instructions into structured sequences of skills such as pick, place, and dip, then verifies and documents each step.  
the platform provides a flow-based interface to visualize and modify task graphs.

## Overview

this project aims to demonstrate a unified interface for controlling robotic arms (such as the s0100 series) using large language models as planners.  
the system maps user prompts to atomic actions (act models) and executes them in sequence while maintaining verification, memory, and diagnostics.

## Structure

- **core**: small model for verification, memory logging, and summarization    
- **skills**: trained act models for basic actions like pick, place, and dip  
- **agent**:  planning logic, skill contracts, and runtime coordination
- **ui**: graph interface for task visualization and manual workflow editing

## Goals

1. provide a consistent abstraction for robotic skills  
2. enable language-based planning that produces verifiable action sequences  
3. support real-time feedback, diagnostics, and visual debugging  
4. allow modular extensions for different hardware or skill sets

## Planned features

- natural language prompt to structured task plan conversion  
- execution engine with preconditions and effects checking  
- memory layer for state, results, and recovery logs  
- graph-based interface for building and editing workflows  
- support for multiple robotic platforms through standard skill apis

## Development

```bash
git clone https://github.com/Atharva2099/roboflow-os.git
cd roboflow-os
npm install
```
each module (core, skills, agent, ui) will be developed as an independent workspace.
