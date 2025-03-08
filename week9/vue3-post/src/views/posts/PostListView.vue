<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			:limit="params._limit"
			@update:limit="changeLimit"
		/>
		<!-- v-model:limit="params._limit" -->

		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else-if="!isExist">
			<p class="text-center py-4 text-muted">No Results</p>
		</template>

		<template v-else>
			<AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
						@toggleLike="item.isLike = !item.isLike"
						@editmodal="openEditModal(item.id)"
					></PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>
		<!-- Edit Modal 추가 -->
		<!-- <Teleport to="#editmodal">
			<EditPostModal
				v-model="editshow"
				:id="editPostId"
				:title="editmodalTitle"
				:content="editmodalContent"
				:created-at="editmodalCreatedAt"
			/> 
		</Teleport>-->

		<PostEidtModal
			v-if="selectedPostId !== null"
			v-model="showEditModal"
			:id="selectedPostId"
			@edited="refreshPost"
		/>

		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId"></PostDetailView>
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostModal from '@/components/posts/PostModal.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostEidtModal from '@/components/posts/PostEidtModal.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useAxios } from '@/hooks/useAxios';
import axios from 'axios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);
console.log('previewId.value:', previewId.value);

//조회
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});
const changeLimit = value => {
	params.value._limit = value;
	params.value._page = 1;
};
const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

const isExist = computed(() => posts.value && posts.value.length > 0);
// pagination
const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);
const goPage = id => {
	// router.push(`/posts/${id}`);
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
	console.log('id:', id);
};

// modal
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};

const showEditModal = ref(false);
const selectedPostId = ref(null);

const openEditModal = id => {
	selectedPostId.value = id;
	console.log('selectedPostId.value:', selectedPostId.value);
	showEditModal.value = true;
};

watch(showEditModal, newValue => {
	if (!newValue) {
		// showEditModal이 false로 변경되었을 때 목록을 갱신하는 로직
		refreshPost(); // 목록을 새로 불러오는 함수
	}
});

const refreshPost = async () => {
	console.log('게시글이 갱신되었습니다.');
	try {
		// 게시글 목록을 다시 가져오기 위한 API 요청
		const response = await axios.get('/posts', { params: params.value });
		posts.value = response.data; // 목록 업데이트
		console.log('게시글 목록 갱신 완료:', posts.value);
	} catch (error) {
		console.error('게시글 목록 갱신 실패:', error);
	}
};
</script>

<style lang="scss" scoped></style>
