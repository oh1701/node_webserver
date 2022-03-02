const net = require('net');
const readLine = require('readline');

const options = {
    port: 3030, // 서버와 동일한 포트로 지정
    host: `localhost` // 아이피 주소 동일하게.  혹은 'localhost' 라고 해도 된다고 한ㄷ.
};

// ---------------------------------------------
// Client 임
// ---------------------------------------------

const rl = readLine.createInterface({ // 이 함수를 통해 input 과 output 설정해준다.
    input: process.stdin,
    output: process.stdout
});

const client = net.connect(options, () => { // 소켓 연결, 서버 접속
    console.log("연결되었음");

    client.setTimeout(500); // 타임아웃 설정. 초과시간이 지나면 timeout 이벤트 발생. 발생해도 커넥션은 유지됨. 즉, 사용자가 끊거나 해야한다.
    client.setEncoding('utf-8'); // 인코딩 설정

    rl.on('line', function(line){
        // 입력 값을 처리할 callback 내용 기재
        client.write(line); // 소켓에 내가 입력한 데이터를 보낸다. 버퍼에 쌓인 데이터가 성공적으로 전송되면 True. buffer가 모두 비워지면 drain 이벤트가 발생한다고 한다.

        if(line == "close"){ // 입력 값이 close 면 종료시키기.
            rl.close();
        };

    })

    rl.on('close', function(close){ // 종료 될 시 실행되는 구문
        console.log("입력 및 클라이언트 종료");
    })

    client.on('data', (data) => { // 데이터 수신 이벤트 
        console.log(data.toString());
    });

    client.on('error', function(err){
        console.log("에러가 발생함 ::", JSON.stringify(err));
        client.destroy(); // 소켓의 i/o활동을 발생하지 않게하는 메소드. 에러 발생시 필요하다고 함. pause, resume 등등이 또 있다.
    })

    client.on('end', () => { // 접속 종료
        console.log("연결이 끊김")   
    })

    client.once('drain', () => { // addListener() 와 on() 는 같음. 이벤트를 계속 연결한 상태를 유지하고, once 는 한 번 실행되면 제거된다고 한다.
        console.log("버퍼를 모두 소모하여 성공적으로 데이터가 보내졌다.")
    })
});