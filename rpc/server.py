import os
from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

#  Get the port to listen on from the environment, or default to 8000
PORT = int(os.environ.get("RPC_PORT", 8000))

# Define a simple function to expose over RPC
def my_python_function(greeting, name):
    print(f"In my_python_function with {greeting} and {name}")
    
    if greeting.lower() != "hello":
        raise ValueError("Greeting must be 'hello'")
    
    return f"Goodbye, {name}!"

def count_words(words):
    print("In count_words with:")
    for w in words:
        print(w)
    return len(words)

# Create the server
server = SimpleJSONRPCServer(('localhost', PORT))

# Register the functions that can be called via RPC
server.register_function(my_python_function)
server.register_function(count_words)

# Run the server
print("Starting server...")
server.serve_forever()