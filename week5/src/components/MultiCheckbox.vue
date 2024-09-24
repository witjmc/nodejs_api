<template>
  <div class="checkbox-container">
    <template v-for="(item, index) in items" :key="index">
      <div class="checkbox-container">
        <input type="checkbox" :id="item.id" :value="item.value" v-model="checkedNames" />
        <div class="checkbox-label" :for="item.id">{{ item.label }}</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

// props 정의
const props = defineProps<{
  items: { id: string; value: string; label: string }[]
  value: string[]
}>()

// items prop의 기본값 설정
const defaultItems = [
  { id: 'jack', value: 'Jack', label: 'Jack' },
  { id: 'john', value: 'John', label: 'John' },
  { id: 'mike', value: 'Mike', label: 'Mike' }
]

// items prop의 값이 주어지지 않은 경우 기본값 사용
const items = props.items || defaultItems

// checkedNames 변수 설정
const checkedNames = ref<string[]>(props.value || [])

// v-model을 위한 업데이트 함수
const emit = defineEmits()
const updateCheckedNames = (newValue: string[]) => {
  checkedNames.value = newValue
  emit('update:value', newValue)
}
</script>
<style scoped>
.checkbox-container {
  display: flex; /* 수평 정렬을 위한 flex 컨테이너 */
  align-items: center; /* 세로 정렬을 위해 중앙 정렬 */
}

.checkbox-label {
  margin-right: 10px; /* 오른쪽 여백 추가 */
}
</style>
