// express 역할 : 웹 프레임워크(프론트엔드에서 백엔드로 요청을 보내서 백엔드에서 처리(db조회, 계산처리 등)해서 응답을 보내주는 것) 를 만들고 사용하는 것
// 설치 : npm i express , npm install cors
// 실행 : node index.js
// 웹실행 : localhost:3000
// 공식문서 : https://expressjs.com/ko/starter/hello-world.html
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000; // ip는 대표번호, port는 내선번호 (포트는 항구)

app.use(cors()); // cors 설정 모든 서버 허용

// app.get은 http 메소드
// http 매소드 종류는 get,post(요청방식) 가 있음. get은 주소창에 입력하여 데이터를 전달, post는 주소창이 아닌 내부적으로 body에 데이터 전달,
// app.get('라우팅', 콜백함수)
// 콜백함수는 특정 함수가 끝나고 실행할 함수이다. 즉, 다른 코드의 인수(파라미터)로서 넘겨주는 실행 가능한 코드. 예시)setTimeout(()=>{console.log("5초지남")},5000)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/port/:name', (req, res) => {
    const { name } = req.params;
    console.log(name);
    // 웹 실행 :http://localhost:3000/port/http

    // CORS 헤더 설정
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // 자바스크립트
    // 웹 실행 : localhost:3000/port/ftp or localhost:3000/port/ssh ...
    if (name == 'ftp') {
        res.json({ port: '20,21(tcp)' });
    } else if (name == 'ssh') {
        res.json({ port: '22(tcp)' });
    } else if (name == '텔렛') {
        res.json({ port: '25(tcp)' });
    } else if (name == 'dns') {
        res.json({ port: '53(tcp/udp)' });
    } else if (name == 'dhcp') {
        res.json({ port: '67(udp)' });
    } else if (name == 'http') {
        res.json({ port: '80(tcp)' });
    } else if (name == 'https') {
        res.json({ port: '443(tcp)' });
    } else {
        res.json({ port: '알수 없음' });
    }
});

// 이 포트는 듣고 있다.(listen은 항상하고 있음, port 로 서버로 들어가고 send로 내보내줌)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
