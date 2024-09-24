<template>
  <li
    class="list-group-item"
    :class="{ 'list-group-item-success': todoItem.completed }"
    @click="handleToggleCompleted"
  >
    <span class="pointer" :class="{ 'todo-done': todoItem.completed }">
      {{ todoItem.todo }}{{ todoItem.completed ? '(완료)' : '' }}
    </span>
    <span class="float-end badge bg-secondary pointer" @click.stop="handleDeleteTodo">삭제</span>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  todoItem: { type: Object, required: true }
})

const { emit } = defineEmits(['delete-todo', 'toggle-completed'])

const handleDeleteTodo = () => {
  console.log('Delete todo clicked')
  emit('delete-todo', props.todoItem.id)
}

const handleToggleCompleted = () => {
  console.log('Toggle completed clicked')
  emit('toggle-completed', props.todoItem.id)
}
</script>
