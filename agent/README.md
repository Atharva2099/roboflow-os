# Roboflow-OS ReAct Agent

A simple ReAct (Reasoning + Acting) agent built with LlamaIndex and Anthropic Claude that can execute robotic pick and place operations through natural language instructions.

## Features

- **ReAct Agent**: Uses Claude 3.5 Sonnet for reasoning and tool selection
- **Two Core Tools**:
  - `pick`: Pick up objects from specified locations
  - `place`: Place objects at target locations
- **CLI Interface**: Interactive command-line interface for natural language instructions
- **Mock Implementation**: Simple functions for testing and development

## Setup

### 1. Create Virtual Environment

```bash
cd agent
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
# OR
# venv\Scripts\activate  # On Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure API Key

Copy the example environment file and add your Anthropic API key:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

```
ANTHROPIC_API_KEY=your_actual_api_key_here
```

Get your API key from: https://console.anthropic.com/

## Usage

### Run the Interactive CLI

```bash
python main.py
```

### Example Commands

Once the CLI is running, you can give natural language instructions:

```
> You: Pick up a red block from the table

> You: Place the cube in the bin

> You: Pick up the bottle from the shelf and place it on the table

> You: Move the red block from the table to the container
```

The agent will:
1. Understand your instruction
2. Reason about which tools to use
3. Execute the appropriate pick and/or place operations
4. Return a confirmation

### Special Commands

- `help` - Show example commands
- `exit`, `quit`, or `q` - Exit the CLI
- `Ctrl+C` - Interrupt and exit

## Project Structure

```
agent/
├── tools/
│   ├── __init__.py      # Tool exports
│   ├── pick.py          # Pick tool implementation
│   └── place.py         # Place tool implementation
├── agent.py             # ReAct agent configuration
├── main.py              # CLI entry point
├── requirements.txt     # Python dependencies
├── .env                 # API keys (gitignored)
├── .env.example         # Environment template
└── README.md            # This file
```

## How It Works

### ReAct Agent

The agent uses the ReAct (Reasoning + Acting) pattern:

1. **Thought**: Agent thinks about what needs to be done
2. **Action**: Agent selects and executes a tool
3. **Observation**: Agent observes the result
4. **Repeat**: Process continues until task is complete

### Tools

Each tool is a Python function wrapped with LlamaIndex's `FunctionTool`:

- **pick(object_name, location)**: Simulates picking an object
- **place(object_name, target_location)**: Simulates placing an object

### LLM Configuration

- Model: `claude-3-5-sonnet-20241022`
- Temperature: `0.1` (deterministic reasoning)
- Max Iterations: `10` (maximum reasoning steps)
- Verbose: `True` (shows reasoning process)

## Development

### Testing Individual Tools

```python
from tools import pick_tool, place_tool

# Test pick
result = pick_tool.fn("red block", "table")
print(result)

# Test place
result = place_tool.fn("red block", "bin")
print(result)
```

### Running Agent Programmatically

```python
from agent import create_react_agent, chat_with_agent

agent = create_react_agent()
response = chat_with_agent(
    agent,
    "Pick up the cube from the shelf and place it in the container"
)
print(response)
```

## Next Steps

To integrate with actual robotic hardware:

1. Replace mock implementations in `tools/pick.py` and `tools/place.py`
2. Add hardware communication (e.g., ROS, gRPC, REST API)
3. Implement actual vision and motion planning
4. Add error handling and recovery mechanisms
5. Create additional tools as needed (e.g., dip, rotate, grasp)

## Troubleshooting

### API Key Error

If you see `ANTHROPIC_API_KEY not found`:
- Make sure you created a `.env` file in the `agent/` directory
- Verify your API key is correct
- Check that `python-dotenv` is installed

### Import Errors

If you see import errors:
- Ensure you activated the virtual environment
- Run `pip install -r requirements.txt` again
- Check Python version (requires 3.8+)

### Connection Issues

If the agent can't connect to Anthropic:
- Check your internet connection
- Verify your API key is valid and has credits
- Check if there are any API outages

## License

Part of the Roboflow-OS project.
