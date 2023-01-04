<template>
    <p>This is a demo of the <a href="https://github.com/yjs/yjs">Yjs</a> ⇔ <a
            href="http://tiptap.dev/">Tiptap</a> via <a
            href="https://tiptap.dev/guide/collaborative-editing">Collaborative editing</a>.</p>
    <p>The content of this editor is shared with every client that visits this domain.</p>
    <Editor />
</template>

<script setup lang="ts">
import Editor from './Editor.vue';
</script>