<template>
    <div>
        <h2>Multi Checkbox</h2>
        <MultiCheckbox :items="items" v-model="checkedNames1" @update:selected="checkedNames1 = $event" />
        <h2>Multi Checkbox2</h2>
        <MultiCheckbox :items="items2" v-model="checkedNames2" @update:selected="checkedNames2 = $event" />
        <h2>Multi Checkbox3</h2>
        <MultiCheckbox :items="items3" v-model="checkedNames3" @update:selected="checkedNames3 = $event" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MultiCheckbox from '@/components/MultiCheckbox.vue';

const items = [
    { id: 'jack', value: 'Jack', label: 'Jack' },
    { id: 'john', value: 'John', label: 'John' },
    { id: 'mike', value: 'Mike', label: 'Mike' },
];

const items2 = [
    { id: 'jack', value: 'Jack', label: 'Jack' },
    { id: 'john', value: 'John', label: 'John' },
    { id: 'mike', value: 'Mike', label: 'Mike' },
];

const items3 = [
    { id: 'jack', value: 'Jack', label: 'Jack' },
    { id: 'john', value: 'John', label: 'John' },
    { id: 'mike', value: 'Mike', label: 'Mike' },
];

const checkedNames1 = ref<string[]>([]);
const checkedNames2 = ref<string[]>([]);
const checkedNames3 = ref<string[]>([]);
</script>
