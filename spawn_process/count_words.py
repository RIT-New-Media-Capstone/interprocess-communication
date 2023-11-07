import sys
import json

data_received = json.loads(sys.argv[1])
words = data_received.get('words', [])

length_of_words = len(words)

print(json.dumps({'length_of_words': length_of_words}))    