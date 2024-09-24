<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <TodoListItem
          v-for="todoItem in todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
          @delete-todo="deleteTodoHandler"
          @toggle-completed="toggleCompletedHandler"
        />
      </ul>
    </div>
  </div>
</template>

<script setup>
import TodoListItem from './TodoListItem.vue'
import { defineProps, defineEmits } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  todoList: { type: Array, required: true }
})

const { emit } = defineEmits(['delete-todo', 'toggle-completed'])

const deleteTodoHandler = (id) => {
  emit('delete-todo', id)
}

const toggleCompletedHandler = (id) => {
  emit('toggle-completed', id)
}
</script>
