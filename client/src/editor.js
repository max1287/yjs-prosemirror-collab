import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { ySyncPlugin, yCursorPlugin, yUndoPlugin, undo, redo } from 'y-prosemirror'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { schema } from './schema.js'
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'

export function setupEditor(element) {
  window.addEventListener('load', () => {
    const ydoc = new Y.Doc()
    const provider = new WebsocketProvider('ws://localhost:4567', 'prosemirror-demo', ydoc)
    const yXmlFragment = ydoc.getXmlFragment('prosemirror')
  
    const prosemirrorView = new EditorView(element, {
      state: EditorState.create({
        schema,
        plugins: [
          ySyncPlugin(yXmlFragment),
          yCursorPlugin(provider.awareness),
          yUndoPlugin(),
          keymap({
            'Mod-z': undo,
            'Mod-y': redo,
            'Mod-Shift-z': redo
          })
        ].concat(exampleSetup({ schema }))
      })
    })
  
    const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
    connectBtn.addEventListener('click', () => {
      if (provider.shouldConnect) {
        provider.disconnect()
        connectBtn.textContent = 'Connect'
      } else {
        provider.connect()
        connectBtn.textContent = 'Disconnect'
      }
    })
  
    // @ts-ignore
    window.example = { provider, ydoc, yXmlFragment, prosemirrorView }
  })
}
