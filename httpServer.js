const http = require('http');

const port = 3030;

// ---------------------------------------------
// server 임
// ---------------------------------------------

var user = {
  id : 300,
  name : "오규성",
  gender : "male"
};

const server = http.createServer((req, res) => {
  if(req.url === '/userinfo' && req.method === "GET"){
    res.statusCode = 200;
    res.write(`서버가 전송한 userID 값입니다. :: ${JSON.stringify(user)}`)
    res.on('data', function(data){
      console.log(`데이타는 ${data}`)
    });

  } else if(req.url === '/userinfo' && req.method === "POST"){
    res.statusCode = 200;
  
    res.write(`서버가 전송한 userID 값입니다. :: ${user.id}`)

    res.on('data', function(data){
      user.id = data.toInt()
      res.write(`서버가 전송한 userID 값입니다. :: ${user.id}`)
    });
  } else {
    res.statusCode = 404;
    res.write("에러났다다다");
    res.end();
    server.close();
  }
}).listen(port, () => { // 클라이언트 접속을 대기 시킨다.
    console.log(`[server] 서버 열림 :: ${JSON.stringify(server.address())}`);
  });

server.maxConnections = 2 // 서버에 연결되는 커넥션의 최대 수를 정하는 프로퍼티라고 한다.

// ------------------------------------------------
// listening : server.listen 호출 될 경우 사용
// connection : 새로운 커넥션 만들어질 경우 사용
// close : 서버가 닫힐 경우 사용
// error : 서버 에러 발생할 경우 사용