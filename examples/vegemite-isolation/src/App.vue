<template>
  <div id="app" class="wide">
    <img alt="Vue logo" src="./assets/abc.png" />
    <h1>ABC Example TODO App</h1>
    <h2>Using ABC with Vegemite in Isolated Config</h2>
    <div class="example-app">
      <div class="cta-buttons flex row center full">
        <button class="btn flex">Set IndexedDB TODOs</button>
        <button class="btn flex">Clear IndexedDB TODOs</button>
      </div>
      <div class="cta-buttons flex row center full">
        <button class="btn flex">Set FirebaseDB TODOs</button>
        <button class="btn flex">Clear FirebaseDB TODOs</button>
      </div>

      <div class="stats">
        <div class="stat">Firebase records: {{ firebase ? firebase.mock.db.todos.length : 'not-connected' }}</div>
        <div class="stat">Store records: {{ firebase ? firebase.mock.db.todos.length : 'not-connected' }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, Ref, ref, defineComponent } from 'vue';
import { Todo } from './models/Todo';

export default defineComponent({
  setup() {
    const todos: Ref<Todo[]> = ref([]);
    return { firebase };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app h2 {
  font-weight: 400;
}

.btn {
  padding: 0.5rem;
  margin: 0.25rem;
}
.flex {
  display: flex;
}
.row {
  flex-direction: row;
}
.full {
  width: 100%;
}
.row.between {
  justify-content: space-between;
}
.row.around {
  justify-content: space-around;
}
.row.center {
  justify-content: center;
}
</style>
