<script setup lang="ts">
import { add } from '../wasm/trial/pkg/trial';

let wasm: { add: typeof add };
import('../wasm/trial/pkg').then((pkg) => (wasm = pkg));

const foo = ref(0);
const bar = ref(0);
const baz = ref(0);
const addWithWasm = () => {
  const result = wasm?.add(foo.value, bar.value);
  baz.value = result;
};
</script>

<template>
  <div>
    <input v-model="foo" type="number" />
    <input v-model="bar" type="number" />
    <button @click="addWithWasm">add</button>
    <p>{{ baz }}</p>
    <NuxtLink to="/pulldown-cmark">pulldown-cmark</NuxtLink>
  </div>
</template>
