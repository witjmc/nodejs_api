<template>
    <div>
        <button class="btn btn-success" @click="currentTab = 'Setting1'">Setting1</button>
        <button class="btn btn-danger" @click="currentTab = 'Setting2'">Setting2</button>
        <component :is="currentTabComponent()"></component>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Setting1 from '@/components//Setting1.vue';
import Setting2 from '@/components/Setting2.vue';

const currentTab = ref('Setting1');

const currentTabComponent = () => {
    console.log('currentTab.value:', currentTab.value);
    return currentTab.value === 'Setting1' ? Setting1 : Setting2;
};
</script>
