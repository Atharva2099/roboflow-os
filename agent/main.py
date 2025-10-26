#!/usr/bin/env python3
"""
Main CLI entry point for the Roboflow ReAct Agent.

This script provides an interactive command-line interface for
communicating with the agent that can execute pick and place operations.
"""

import sys
from agent import create_react_agent, chat_with_agent


def print_banner():
    """Print welcome banner."""
    banner = """
    ╔═══════════════════════════════════════════════════════╗
    ║           ROBOFLOW-OS ReAct Agent CLI                 ║
    ║                                                       ║
    ║  Available commands:                                  ║
    ║    - Type your instructions naturally                 ║
    ║    - Type 'exit' or 'quit' to end the session        ║
    ║    - Type 'help' for examples                        ║
    ╚═══════════════════════════════════════════════════════╝
    """
    print(banner)


def print_help():
    """Print help message with example commands."""
    help_text = """
    Example commands you can try:

    1. "Pick up a red block from the table"
    2. "Place the cube in the bin"
    3. "Pick up the bottle from the shelf and place it on the table"
    4. "Move the red block from the table to the container"

    The agent will understand your instructions and use the available
    tools (pick and place) to accomplish the task.
    """
    print(help_text)


def main():
    """Main CLI loop."""
    print_banner()

    try:
        # Initialize the agent
        print("Initializing ReAct agent with Anthropic Claude...\n")
        agent = create_react_agent()
        print("Agent ready! You can start giving instructions.\n")

    except ValueError as e:
        print(f"\nError: {e}")
        print("\nPlease create a .env file in the agent directory with:")
        print("ANTHROPIC_API_KEY=your_api_key_here")
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error during initialization: {e}")
        sys.exit(1)

    # Main interaction loop
    while True:
        try:
            # Get user input
            user_input = input("\n> You: ").strip()

            # Handle special commands
            if not user_input:
                continue

            if user_input.lower() in ["exit", "quit", "q"]:
                print("\nGoodbye! 👋")
                break

            if user_input.lower() == "help":
                print_help()
                continue

            # Send message to agent
            print("\n> Agent: ", end="", flush=True)
            response = chat_with_agent(agent, user_input)
            print(response)

        except KeyboardInterrupt:
            print("\n\nSession interrupted. Goodbye! 👋")
            break
        except Exception as e:
            print(f"\nError: {e}")
            print("You can continue or type 'exit' to quit.")


if __name__ == "__main__":
    main()
