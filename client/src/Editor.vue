<template>
  <button type="button" @click="toggleConnect">{{ connectBtnText }}</button>
  <EditorContent :editor="editor" />
</template>

<script lang="ts" setup>
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { onBeforeUnmount, ref } from 'vue'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:4567', 'prosemirror-demo', ydoc)

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
    Placeholder.configure({
      placeholder: 'Write something … It’ll be shared with everyone else looking at this example.',
    }),
    Collaboration.configure({
      document: ydoc,
    }),
    CollaborationCursor.configure({
      provider: provider,
      user: {
        name: `User ${Date.now()}`,
        color: `#${randomColor()}`,
      },
    }),
  ],
})

const connectBtnText = ref("Disconnect");
function toggleConnect() {
  if (provider.shouldConnect) {
    provider.disconnect()
    connectBtnText.value = "Connect";
  } else {
    provider.connect()
    connectBtnText.value = "Disconnect";
  }
}

onBeforeUnmount(() => {
  provider.destroy()
});
</script>

<style>
/* Basic editor styles */
.ProseMirror {
  margin-top: 0.75em;
  outline: none;
}

/* Placeholder (at the top) */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}

/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0D0D0D;
  border-right: 1px solid #0D0D0D;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #fff;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}
</style>