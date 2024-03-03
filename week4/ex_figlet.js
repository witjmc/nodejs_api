// npm init, npm install figlet , npm 공식문서에서 figlet 예제
var figlet = require('figlet'); //figlet 모듈을 요구하다.

// Hello World 글자 출력 하는 함수 node ex_figlet.js 로 console에서 확인 가능
figlet('Hello World!!', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
