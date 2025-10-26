from llama_index.core.tools import FunctionTool


def pick(object_name: str, location: str) -> str:
    """
    Pick up an object from a specified location.

    Args:
        object_name (str): The name of the object to pick up (e.g., "red block", "cube", "bottle")
        location (str): The location where the object is located (e.g., "table", "shelf", "conveyor belt")

    Returns:
        str: A status message indicating whether the pick operation was successful
    """
    # Mock implementation - simulates picking an object
    print(f"[PICK] Executing pick operation...")
    print(f"[PICK] Object: {object_name}")
    print(f"[PICK] Location: {location}")

    # Simulate successful pick
    result = f"Successfully picked up '{object_name}' from '{location}'. Object is now in gripper."
    print(f"[PICK] {result}")

    return result


# Create the LlamaIndex FunctionTool
pick_tool = FunctionTool.from_defaults(fn=pick)
