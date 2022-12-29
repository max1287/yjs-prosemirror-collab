const { createServer } = require("http")
const { WebSocket } = require("ws")
const { setupWSConnection, setPersistence } = require("y-websocket/bin/utils")
const {LeveldbPersistence} = require("y-leveldb");
const Y = require("yjs");
const { log } = require("console");

const port = 4567;

const server = createServer();
const wss = new WebSocket.Server({ server });

var persistenceDir = "./data";
const ldb = new LeveldbPersistence(persistenceDir)
const persistence = {
  provider: ldb,
  bindState: async (docName, ydoc) => {
    const persistedYdoc = await ldb.getYDoc(docName)
    const newUpdates = Y.encodeStateAsUpdate(ydoc)
    ldb.storeUpdate(docName, newUpdates)
    Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
    ydoc.on('update', update => {
      ldb.storeUpdate(docName, update)
    })
  },
  writeState: async (docName, ydoc) => {log("WRITE!")}
}
setPersistence(persistence);

wss.on('connection', (conn, req) => setupWSConnection(conn, req))



server.listen(port)

console.log(`Listening to http://localhost:${port}`)