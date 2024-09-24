<template>
  <div class="row mb-3">
    <div class="col">
      <div class="input-group">
        <input
          id="msg"
          type="text"
          class="form-control"
          name="msg"
          placeholder="할일을 여기에 입력!"
          v-model.trim="todo"
          @keyup.enter="addTodoHandler"
        />
        <span class="btn btn-primary input-group-addon" @click="addTodoHandler">추가</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
// import { defineEmits } from 'vue' ---> emit 작동하지않아서, provide, inject 사용함
const todo = ref('')

//const { emit } = defineEmits(['add-todo'])
const addTodo = inject('addTodo') // 부모 컴포넌트(App.vue)에 InputTodo 컴포넌트를 import 하고있어서, 부모 컴포넌트에서 provide 해둔 것을 자식 컴포넌트에 inject 함

const addTodoHandler = () => {
  if (todo.value.trim().length >= 2) {
    console.log('addTodoHandler', todo.value.trim())
    //emit('add-todo', todo.value.trim())
    addTodo(todo.value.trim())
    console.log('자식 컴포넌트', todo.value.trim())
    todo.value = ''
  }
}
</script>
