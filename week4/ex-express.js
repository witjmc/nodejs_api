// express 역할 : 웹 프레임워크(프론트엔드에서 백엔드로 요청을 보내서 백엔드에서 처리(db조회, 계산처리 등)해서 응답을 보내주는 것) 를 만들고 사용하는 것
// 설치 : npm i express
// 실행 : node index.js
// 웹실행 : localhost:3000
const express = require('express');
const app = express();

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.listen(3000);
