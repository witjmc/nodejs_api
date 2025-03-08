<template>
	<!-- 모달로 감싸기 -->
	<AppModal v-model="showEditModal" title="게시글 수정">
		<template #default>
			<AppLoading v-if="loading" />
			<AppError v-else-if="error" :message="error.message" />

			<div v-else>
				<PostForm
					v-model:title="form.title"
					v-model:content="form.content"
					@submit.prevent="edit"
				>
					<template #actions>
						<button type="button" class="btn btn-outline-danger" @click="close">
							취소
						</button>
						<button class="btn btn-primary" :disabled="editLoading">
							<template v-if="editLoading">
								<span
									class="spinner-grow spinner-grow-sm"
									role="status"
									aria-hidden="true"
								></span>
								<span class="visually-hidden">Loading...</span>
							</template>
							<template v-else> 수정 </template>
						</button>
					</template>
				</PostForm>
			</div>
		</template>
	</AppModal>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert.js';
import { useAxios } from '@/hooks/useAxios';
import PostForm from '@/components/posts/PostForm.vue';
//import axios from 'axios';

const props = defineProps({
	modelValue: Boolean, // 모달 열림/닫힘 상태를 부모에서 관리
	id: [String, Number],
	posts: Object,
});
console.log('posts:', props.posts);
const emit = defineEmits(['update:modelValue', 'edited']); // 모달 닫기 이벤트 추가
const route = useRoute();
const router = useRouter();
const id = props.id || route.params.id;
console.log('props.id:', props.id);
console.log('route.params.id:', route.params.id);

const post = ref({ ...props.posts });

// alert
const { vAlert, vSuccess } = useAlert();

const {
	data: form,
	error,
	loading,
} = useAxios(`/posts/${id}`, {
	method: 'get',
});

console.log('data,', form);
console.log('error,', error);
console.log('loading,', loading);
console.log('${props.id},', props.id);
const {
	error: editError,
	loading: editLoading,
	execute,
} = useAxios(
	`/posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('수정이 완료되었습니다!');
			emit('edited', post.value); // 부모에게 수정 완료 알림
			//router.push({ name: 'PostDetail', params: { id } });
			console.log('edited:', edit);
			close(); // 모달 닫기
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const showEditModal = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value);
		console.log('value:', value);
	},
});

const edit = async () => {
	execute({
		...form.value,
		createdAt: Date.now(),
	});
};

const close = () => {
	showEditModal.value = false;
};

// 컴포넌트가 마운트될 때 또는 id 값이 변경될 때마다 데이터 로드
// onMounted(() => {
//   loadPostData();
// });
</script>

<style lang="scss" scoped></style>
