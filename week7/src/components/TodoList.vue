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
          @edit-todo="editTodoHandler"
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

const emit = defineEmits(['delete-todo', 'toggle-completed'])

const deleteTodoHandler = (id) => {
  console.log('Received delete-todo for id:', id)
  emit('delete-todo', id)
}

const toggleCompletedHandler = (id) => {
  //emit('toggle-completed', id)
  const todo = props.todoList.find((todo) => todo.id === id) // props.todoList로 수정
  if (todo) {
    todo.todo = id.todo // todo 수정
  }
}
</script>

