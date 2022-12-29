import './style.css'
import { setupEditor } from './editor.js'

document.querySelector('#app').innerHTML = `
  <div id="y-functions">
    <div id="y-version"></div>
    <button type="button" id="y-connect-btn">Disconnect</button>
  </div>
  <p></p>
  <p>This is a demo of the <a href="https://github.com/yjs/yjs">Yjs</a> ⇔ <a href="http://prosemirror.net/">ProseMirror</a> binding: <a href="https://github.com/yjs/y-prosemirror">y-prosemirror</a>.</p>
  <p>The content of this editor is shared with every client that visits this domain.</p>
  <div id="editor"></div>
`

setupEditor(document.querySelector('#editor'))
