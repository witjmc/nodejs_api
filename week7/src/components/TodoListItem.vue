<template>
  <li class="list-group-item">
    <span v-if="!isEditing" @click="handleToggleCompleted">
      <span class="pointer" :class="{ 'todo-done': todoItem.completed }">
        {{ todoItem.todo }}{{ todoItem.completed ? '(완료)' : '' }}
      </span>
    </span>
    <input
      v-if="isEditing"
      type="text"
      v-model="editedTodo"
      @blur="saveEdit"
      @keyup.enter="saveEdit"
      class="form-control"
    />
    <span class="float-end badge bg-secondary pointer" @click.stop="handleDeleteTodo">삭제</span>
    <button v-if="!isEditing" @click.stop="editTodo" class="btn float-end badge bg-secondary">
      수정
    </button>
  </li>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  todoItem: { type: Object, required: true }
})

const emit = defineEmits(['delete-todo', 'toggle-completed', 'edit-todo'])

const isEditing = ref(false)
const editedTodo = ref(props.todoItem.todo)

const handleDeleteTodo = () => {
  console.log('Delete todo clicked', props.todoItem.id)
  emit('delete-todo', props.todoItem.id)
}

const handleToggleCompleted = () => {
  console.log('Toggle completed clicked', props.todoItem.id)
  emit('toggle-completed', props.todoItem.id)
}

const editTodo = () => {
  isEditing.value = true
}

const saveEdit = () => {
  if (editedTodo.value.trim() === '') return // 빈값이 아닐 경우에만 수정
  console.log('Edit todo clicked', props.todoItem.id, editedTodo.value)

  emit('edit-todo', { id: props.todoItem.id, todo: editedTodo.value }) // 수정된 todo 값 전달
  isEditing.value = false
  // eslint-disable-next-line vue/no-mutating-props
  props.todoItem.todo = editedTodo.value // 현재 todoItem의 todo를 수정된 값으로 업데이트
}
</script>

