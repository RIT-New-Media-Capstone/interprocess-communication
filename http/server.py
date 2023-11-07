import http.server
import sys
import os
from flask import Flask, request
import threading

PORT = int(os.environ.get("RPC_PORT", 8000))

last_line = ""

# continuously store the last line entered into stdin
def stdin_loop():
    global last_line # Makes last_line editable from within this function

    print("Looping...")
    while True:
        last_line = sys.stdin.readline()
        print("Read line: " + last_line)

threading.Thread(target=stdin_loop, daemon=True).start()

app = Flask(__name__)

@app.route('/make_name', methods=['POST'])
def make_name():
    data = request.get_json()

    name = data['last_name'] + ', ' + data['first_name']

    return name, 200

@app.route('/last_line', methods=['GET'])
def get_last_line():
    print(last_line)
    return last_line, 200

print("Starting server...")
app.run(port=8000)
