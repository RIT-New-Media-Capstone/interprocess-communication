import redis
import json
import time

current_super_important_value = 0
increment = 0

# Create a Redis connection
r = redis.Redis(host='localhost', port=6379, db=0)

def handle_set_increment(message):
    print("Got message:", message)
    # json parse the message
    data = json.loads(message['data'])
    inc = data.get('amount', 0)

    global increment
    increment = inc

    r.publish('current-increment', increment)

pubsub = r.pubsub()
pubsub.subscribe(**{
    'set-increment': handle_set_increment
})
thread = pubsub.run_in_thread(sleep_time=0.001, daemon=True)

while True:
    # do stuff
    current_super_important_value += increment

    r.publish('current-value', current_super_important_value)

    time.sleep(1)
