// npm init, npm install figlet (-g: 전역으로 사용할 경우, 모든 드라이브에 저장될 수 있다. 프로젝트 단위대로 저장하는 것이 좋다!) 
// npm 공식문서(npmjs.com)에서 figlet 예제
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
// 안쓰는모듈 삭제 : npm unistall figlet
