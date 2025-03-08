<template>
	<AppCard>
		<h5 class="card-title text-truncate">{{ title }}</h5>
		<p class="card-text text-truncate">
			{{ content }}
		</p>
		<p class="text-muted">{{ createdDate }}</p>
		<template #footer>
			<div class="d-flex flex-row-reverse">
				<button class="btn p-1" @click.stop="$emit('modal')">
					<i class="bi bi-emoji-sunglasses"></i>
				</button>
				<a href="#" class="btn" :class="isLikeClass" @click.stop="toggleLike">
					좋아요
				</a>
				<button class="btn p-1" @click.stop="$emit('preview')">
					<i class="bi bi-app"></i>
				</button>
				<button class="btn p-1" @click.stop="$emit('editmodal', { ...props })">
					<i class="bi bi-pencil-square"></i> 수정
				</button>
			</div>
		</template>
	</AppCard>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const props = defineProps({
	id: Number, // id 로 props 로 받도록 설정
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number],
	},
});
defineEmits(['modal', 'preview', 'toggleLike', 'editmodal']);
const dayjs = inject('dayjs');
const createdDate = computed(() =>
	dayjs(props.createdAt).format('YYYY. MM. DD HH:mm:ss'),
);

// 좋아요 상태를 `ref`로 관리 (초기값은 `false`)
const isLiked = ref(false);

// `isLikeClass`는 버튼의 색깔을 제어하는 클래스입니다.
const isLikeClass = computed(() => {
	//console.log(isLiked.value);
	return isLiked.value ? 'text-danger' : 'text-muted'; // 좋아요 O -> 빨간색, X -> 회색
});

// `toggleLike` 클릭 시 상태 변경 (부모로 상태를 전달)
const toggleLike = () => {
	// 좋아요 상태를 전환
	isLiked.value = !isLiked.value;

	// 부모로 `toggleLike` 이벤트를 emit, 상태 전달
	//$emit('toggleLike', isLiked.value);
};
</script>

<style lang="scss" scoped></style>
