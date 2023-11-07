## Install
Before you run any of the examples, you need to install a few dependencies.

First, you'll need [Python](https://www.python.org/downloads/) and [Node.js](https://nodejs.org/en/download) installed. 

If the folder has a `requirements.txt` file, that's a listing of the python dependencies. 

> Run `pip install -r requirements.txt`

If it has a `package.json` file (they all do), that lists the Node.js dependencies.

> Run `npm install`

### ./http

Install dependencies, then run these in two separate terminal windows, starting the python process first:
```bash
npm run start-python
npm run start-node
```

### ./redis

For this, you'll need to have a local instance of [Redis](https://redis.io/) running. 

Run these in two separate terminal windows, in no particular order:
```bash
npm run start-python
npm run start-node
```

### ./rpc

Install dependencies, then run these in two separate terminal windows, starting the python process first:
```bash
npm run start-python
npm run start-node
```

### ./spawn_process

Install dependencies, then just run this in a terminal window:
```bash
npm run start
```