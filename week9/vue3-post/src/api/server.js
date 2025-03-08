import express, { json } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());

// JSON 데이터 파싱을 위한 미들웨어
app.use(json());

// 예시 데이터 (데이터베이스 대신)
let posts = [
	{
		id: 1,
		title: '첫 번째 게시글',
		content: '내용 1',
		createdAt: '2025-03-05T10:00:00Z',
	},
	{
		id: 2,
		title: '두 번째 게시글',
		content: '내용 2',
		createdAt: '2025-03-04T09:00:00Z',
	},
	{
		id: 3,
		title: '세 번째 게시글',
		content: '내용 3',
		createdAt: '2025-03-03T08:00:00Z',
	},
	// 더 많은 게시글 추가
];

// GET /posts (목록 조회)
app.get('/posts', (req, res) => {
	const { _sort, _order, _page, _limit, title_like } = req.query;

	// 쿼리 파라미터 처리
	let filteredPosts = posts;

	// title_like 필터링
	if (title_like) {
		filteredPosts = filteredPosts.filter(post =>
			post.title.toLowerCase().includes(title_like.toLowerCase()),
		);
	}

	// 정렬 처리 (_sort, _order)
	if (_sort && _order) {
		filteredPosts = filteredPosts.sort((a, b) => {
			if (_order === 'asc') {
				return a[_sort] > b[_sort] ? 1 : -1;
			} else {
				return a[_sort] < b[_sort] ? 1 : -1;
			}
		});
	}

	// 페이지 처리 (_page, _limit)
	const page = parseInt(_page) || 1;
	const limit = parseInt(_limit) || 6;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	// 페이지에 해당하는 게시글만 자르기
	const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

	// 결과 응답
	res.setHeader('X-Total-Count', filteredPosts.length); // 전체 게시글 수를 헤더에 포함
	res.json(paginatedPosts); // 페이지에 해당하는 게시글만 반환
});

// 게시글 조회
app.get('/posts/:id', (req, res) => {
	const { id } = req.params;
	const post = posts.find(post => post.id === parseInt(id));

	if (!post) {
		return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
	}

	// 게시글 반환
	res.send(post);
});

// POST /posts (게시글 등록)
app.post('/posts', (req, res) => {
	const { title, content } = req.body;

	// 새 게시글 생성
	const newPost = {
		id: posts.length + 1, // 새로운 게시글 ID는 기존 게시글의 수 + 1
		title,
		content,
		createdAt: new Date().toISOString(),
	};

	// 게시글 목록에 추가
	posts.push(newPost);

	// 등록된 게시글 목록 반환
	res.status(201).json({
		message: '게시글이 등록되었습니다!',
		post: newPost,
		posts, // 전체 게시글 목록을 반환
	});
});
// PATCH /posts/:id (게시글 수정)
app.patch('/posts/:id', (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	// 기존 게시글 찾기
	const post = posts.find(post => post.id === parseInt(id));
	if (!post) {
		return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
	}

	// 게시글 수정
	post.title = title;
	post.content = content;
	post.updatedAt = new Date().toISOString(); // 수정일 갱신

	// 수정된 게시글 반환
	res.send({
		message: '게시글이 수정되었습니다!',
		post,
	});
});
// DELETE /posts/:id
app.delete('/posts/:id', (req, res) => {
	const { id } = req.params;

	// 게시글 찾기
	const postIndex = posts.findIndex(post => post.id === parseInt(id));
	if (postIndex === -1) {
		return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
	}

	// 게시글 삭제
	posts.splice(postIndex, 1);

	// 삭제된 게시글 반환
	res.send({ message: '게시글이 삭제되었습니다!' });
});

// PATCH /posts/:id (좋아요 증가)
app.patch('/posts/:id', (req, res) => {
	const { id } = req.params;
	const { likes } = req.body;

	const post = posts.find(p => p.id === parseInt(id));
	if (!post) {
		return res.status(404).send({ message: '게시글을 찾을 수 없습니다.' });
	}

	post.likes = likes;
	res.send({ message: '좋아요 업데이트 완료', post });
});

// 서버 실행
app.listen(port, () => {
	console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
