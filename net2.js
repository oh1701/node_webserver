const net = require('net');

const port = 3030;

// ---------------------------------------------
// server 임
// ---------------------------------------------

var user = {
  id : 300,
  name : "오규성",
  gender : "male"
}

const server = net.createServer(function(client){ // 2.클라이언트 관련은 여기에서 실행하면 된다. TCP 서버 생성하는 부분임.

client.setEncoding('utf8'); // 파싱할 때 euc-kr 로 되어있으면 한글이 깨질 수도 있어서 인코딩해야한다.

  console.log(`[server] 연결된 서버 주소 :: ${JSON.stringify(server.address())}, 포트는 :: ${server.port}, 최대 연결 수 :: ${server.maxConnections}`); // ip 주소와 포트번호와 같은 서버 정보를 운영체제로부터 가져온다.
  console.log(`[server] 연결된 클라이언트 주소 :: ${JSON.stringify(client.address())}`); // ip 주소와 포트번호와 같은 클라이언트 정보를 운영체제로부터 가져온다.

  client.on('data', clientData => { // 4. 클라이언트로 받아온 데이터
    console.log(`[server] 클라이언트로부터 받아온 데이터 :: ${clientData}`);
    
    client.write(`서버에서 다시 되돌려주는 메세지 :: ${clientData.toString()}\r\n`); // 5. 서버에서 클라이언트로 보내줌.

    if(clientData.toString() == "close"){
        client.end();  // 클라이언트를 종료시킨다.
        server.close(); // 서버도 종료시킨다
    };
    
  });
  
});

server.maxConnections = 2 // 서버에 연결되는 커넥션의 최대 수를 정하는 프로퍼티라고 한다.
server.listen(port, () => {
  console.log(`[server] 서버 열림 :: ${JSON.stringify(server.address())}`);
});

// ------------------------------------------------
// listening : server.listen 호출 될 경우 사용
// connection : 새로운 커넥션 만들어질 경우 사용
// close : 서버가 닫힐 경우 사용
// error : 서버 에러 발생할 경우 사용