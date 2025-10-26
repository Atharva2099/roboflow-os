from llama_index.core.tools import FunctionTool


def place(object_name: str, target_location: str) -> str:
    """
    Place an object at a specified target location.

    Args:
        object_name (str): The name of the object to place (e.g., "red block", "cube", "bottle")
        target_location (str): The target location where the object should be placed (e.g., "bin", "shelf", "container")

    Returns:
        str: A status message indicating whether the place operation was successful
    """
    # Mock implementation - simulates placing an object
    print(f"[PLACE] Executing place operation...")
    print(f"[PLACE] Object: {object_name}")
    print(f"[PLACE] Target Location: {target_location}")

    # Simulate successful placement
    result = f"Successfully placed '{object_name}' at '{target_location}'. Gripper is now empty."
    print(f"[PLACE] {result}")

    return result


# Create the LlamaIndex FunctionTool
place_tool = FunctionTool.from_defaults(fn=place)
