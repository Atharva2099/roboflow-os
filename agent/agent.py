import os
import asyncio
from dotenv import load_dotenv
from llama_index.llms.anthropic import Anthropic
from llama_index.core.agent import ReActAgent
from tools import pick_tool, place_tool

# Load environment variables
load_dotenv()


def create_react_agent():
    """
    Create and configure a ReAct agent with pick and place tools.

    Returns:
        ReActAgent: Configured agent instance
    """
    # Get API key from environment
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError(
            "ANTHROPIC_API_KEY not found in environment variables. "
            "Please set it in your .env file or environment."
        )

    # Initialize Anthropic LLM
    # Using Claude 3.5 Sonnet for best reasoning capabilities
    llm = Anthropic(
        model="claude-3-5-sonnet-20241022",
        api_key=api_key,
        temperature=0.0,  # Lower temperature for more deterministic behavior
    )

    # Create ReAct agent with tools
    agent = ReActAgent(
        tools=[pick_tool, place_tool],
        llm=llm,
        verbose=True,  # Show reasoning steps
        max_iterations=10,  # Maximum reasoning iterations
    )

    return agent


async def chat_with_agent_async(agent: ReActAgent, message: str) -> str:
    """
    Send a message to the agent and get a response (async).

    Args:
        agent (ReActAgent): The configured agent
        message (str): User message/query

    Returns:
        str: Agent's response
    """
    response = await agent.run(message)
    return str(response)


def chat_with_agent(agent: ReActAgent, message: str) -> str:
    """
    Send a message to the agent and get a response (synchronous wrapper).

    Args:
        agent (ReActAgent): The configured agent
        message (str): User message/query

    Returns:
        str: Agent's response
    """
    return asyncio.run(chat_with_agent_async(agent, message))


if __name__ == "__main__":
    # Test the agent
    agent = create_react_agent()
    test_query = "Pick up a red block from the table and place it in the bin."
    print(f"\nUser: {test_query}")
    response = chat_with_agent(agent, test_query)
    print(f"\nAgent: {response}")
