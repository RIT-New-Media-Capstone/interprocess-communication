import sys
import json

a = json.loads(sys.argv[1])
b = json.loads(sys.argv[2])
sum = int(a) + int(b)
squared = sum ** 2

print(json.dumps(squared))    