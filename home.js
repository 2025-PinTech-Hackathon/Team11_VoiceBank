//---------- 잔액(서버연동) ----------
let balance = 0;

function fetchBalanceAndUpdate() {
    fetch('http://localhost:3000/api/balance')
        .then(res => res.json())
        .then(data => {
            balance = data.balance || 0;
            updateBalance();
        });
}

function updateBalance() {
    document.getElementById('balance').textContent = balance.toLocaleString() + "원";
}

// 서버에 잔액 반영
function setBalanceOnServer(newBalance) {
    return fetch('http://localhost:3000/api/balance', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ balance: newBalance })
    });
}

// 내역 기록
function saveMoneyHistory(action, amount, desc) {
    fetch('http://localhost:3000/api/money_history', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, amount, desc })
    });
}

//========= 충전 ==============
document.getElementById('chargeBtn').addEventListener('click', () => {
    document.getElementById('modal').style.display = "flex";
});
window.closeModal = function () {
    document.getElementById('modal').style.display = "none";
};
document.querySelectorAll('.quick-charge').forEach(btn => {
    btn.addEventListener('click', function () {
        const amount = parseInt(this.getAttribute('data-amount'));
        balance += amount;
        setBalanceOnServer(balance).then(() => {
            updateBalance();
            saveMoneyHistory("charge", amount, "빠른충전");
            alert(amount.toLocaleString() + "원이 충전되었습니다.");
            closeModal();
        });
    });
});
document.getElementById('customCharge').addEventListener('click', () => {
    const input = prompt("충전할 금액을 직접 입력하세요:");
    const amount = parseInt(input);
    if (!isNaN(amount) && amount > 0) {
        balance += amount;
        setBalanceOnServer(balance).then(() => {
            updateBalance();
            saveMoneyHistory("charge", amount, "직접입력충전");
            alert(amount + "원이 충전되었습니다.");
            closeModal();
        });
    } else {
        alert("올바른 금액을 입력해주세요.");
    }
});

//========= 송금 =============
document.getElementById('sendBtn').addEventListener('click', () => {
    askSendType();
});

function askSendType() {
    // 모달 등 원하는 UI로 바꿀 수 있음. 예시는 prompt
    const type = prompt("송금 방법을 선택하세요. (1: 계좌송금, 2: 연락처송금)");
    if (type == "1") {
        openAccountSendModal();
    } else if (type == "2") {
        openContactSendModal();
    }
}

function openAccountSendModal() {
    document.getElementById('sendModal').style.display = "flex";
}

window.closeSendModal = function () {
    document.getElementById('sendModal').style.display = "none";
};
document.getElementById('accountInputBtn').addEventListener('click', () => {
    const account = prompt("계좌번호를 입력하세요:");
    if (!account) return alert("계좌번호를 입력해야 합니다.");
    const amount = prompt("송금할 금액을 입력하세요:");
    const intAmount = parseInt(amount);
    if (isNaN(intAmount) || intAmount <= 0) return alert("올바른 금액을 입력해주세요.");
    if (intAmount > balance) return alert("잔액이 부족합니다.");
    balance -= intAmount;
    setBalanceOnServer(balance).then(() => {
        updateBalance();
        saveMoneyHistory("send", intAmount, "계좌:" + account);
        alert(account + " 계좌로 " + intAmount.toLocaleString() + "원을 송금했습니다.");
        closeSendModal();
    });
});

function openContactSendModal() {
    fetch('http://localhost:3000/api/contacts')
        .then(res => res.json())
        .then(data => {
            showContactSendList(data.contacts || []);
        });
}

// 연락처 리스트 동적 생성
function showContactSendList(contacts) {
    // 예시: 모달이름 'contactSendModal' 사용
    let modal = document.getElementById('contactSendModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contactSendModal';
        modal.style = 'position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(0,0,0,0.4);z-index:10000;display:flex;align-items:center;justify-content:center;';
        modal.innerHTML = `
          <div style="background:white;padding:20px;border-radius:16px;min-width:250px;">
            <div style="font-weight:bold;margin-bottom:10px;">연락처로 송금</div>
            <div id="contactList"></div>
            <button onclick="document.body.removeChild(this.parentNode.parentNode)">닫기</button>
          </div>`;
        document.body.appendChild(modal);
    }
    const listDiv = modal.querySelector('#contactList');
    listDiv.innerHTML = '';
    contacts.forEach(c => {
        const btn = document.createElement('button');
        btn.textContent = c.name + ' (' + c.number + ')';
        btn.style = 'display:block;margin:4px 0;padding:8px 12px;font-size:16px;';
        btn.onclick = function () {
            askSendAmountByContact(c.name, c.number);
            document.body.removeChild(modal); // 닫기
        };
        listDiv.appendChild(btn);
    });
}

// 금액 입력받아 송금 처리
function askSendAmountByContact(name, number) {
    const amount = prompt(`${name}님에게 송금할 금액을 입력하세요:`);
    const intAmount = parseInt(amount);
    if (isNaN(intAmount) || intAmount <= 0) return alert("올바른 금액을 입력해주세요.");
    if (intAmount > balance) return alert("잔액이 부족합니다.");
    balance -= intAmount;
    setBalanceOnServer(balance).then(() => {
        updateBalance();
        saveMoneyHistory("send", intAmount, "연락처:" + name + "/" + number);
        alert(`${name}님(${number})에게 ${intAmount.toLocaleString()}원을 송금했습니다.`);
    });
};

//========= 잔액 처음 표시 =========
fetchBalanceAndUpdate();

//--------- 나머지 기존 음성/네비/서비스 버튼 로직 동일 ----------
/* ... 이하 기존 음성 명령/네비 버튼 로직 ... */


// 1. 하단 네비게이션/서비스 버튼 클릭 시 이동
document.getElementById('nav-home').onclick = () => location.href = 'home.html';
document.getElementById('nav-benefit').onclick = () => location.href = 'benefit.html';
document.getElementById('nav-pay').onclick = () => location.href = 'pay.html';
document.getElementById('nav-money').onclick = () => location.href = 'money.html';
document.getElementById('nav-paper').onclick = () => location.href = 'paper.html';

// 주요 서비스 버튼 연결 (service-btn 순서: 결제/손해보험/카드만들기/대출비교/신용관리/보험진단/통신비할인/더보기)
document.querySelectorAll('.service-btn').forEach((btn, idx) => {
    btn.onclick = () => {
        switch (idx) {
            case 0: location.href = 'pay.html'; break;
            case 1: location.href = 'money.html'; break;
            case 2: location.href = 'benefit.html'; break;
            case 3: location.href = 'money.html'; break;
            case 4: location.href = 'money.html'; break;
            case 5: location.href = 'money.html'; break;
            case 6: location.href = 'money.html'; break;
            case 7: location.href = 'benefit.html'; break;
        }
    };
});

// 2. 음성 명령: 오직 GPT가 "페이지 이동: [파일명]" 답변할 때만 이동, 명령:charge/send 등은 모달, 그 외는 TTS 답변
let isRecording = false;
let recognition = null;
let transcriptAll = '';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceBtn = document.getElementById('voice-btn');
if (!window.SpeechRecognition) {
    alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
    voiceBtn.disabled = true;
} else {
    recognition = new window.SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
        transcriptAll = '';
        voiceBtn.innerHTML = '<span class="voice-icon">⏹️</span>';
    };
    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
            transcriptAll += event.results[i][0].transcript;
        }
    };
    recognition.onerror = (event) => {
        isRecording = false;
        voiceBtn.innerHTML = '<span class="voice-icon">&#127908;</span>';
    };
    recognition.onend = () => {
        isRecording = false;
        voiceBtn.innerHTML = '<span class="voice-icon">&#127908;</span>';
        const userSpeech = transcriptAll.trim();
        if (!userSpeech) return;

        // 🔥 음성 합성(TTS) 중이면 즉시 중단
        window.speechSynthesis.cancel();

        fetch('http://localhost:3000/askgpt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: userSpeech })
        })
            .then(res => res.json())
            .then(data => {
                let answer = (data.answer || '응답이 없습니다.');
                console.log(answer); // ★ 디버깅용: 실제 답변 출력

                // 1. 페이지 이동 명령
                const moveMatch = answer.match(/페이지 이동: (home\.html|benefit\.html|pay\.html|money\.html|paper\.html)/);
                if (moveMatch) {
                    location.href = moveMatch[1];
                    return;
                }
                const cmdMatch = answer.match(/명령: (\w+)/);
                const actionMap = {
                    charge: () => document.getElementById('modal').style.display = "flex",
                    send: () => document.getElementById('sendModal').style.display = "flex",
                    change: () => {
                        const change = new SpeechSynthesisUtterance(`현재 남은 금액은 ${balance.toLocaleString()}원 입니다.`);
                        change.lang = 'ko-KR';
                        window.speechSynthesis.speak(change);
                    }
                };
                if (cmdMatch && actionMap[cmdMatch[1]]) {
                    actionMap[cmdMatch[1]]();
                    return;
                }

                // **나머지 응답은 다 TTS로 읽어주기**
                const tts = new SpeechSynthesisUtterance(answer);
                tts.lang = 'ko-KR';
                window.speechSynthesis.speak(tts);
            })

            .catch(err => {
                // 실패시에도 UI 변화 없음
            });
    };

    voiceBtn.onclick = function () {
        // 🔥 음성 합성(TTS) 중이면 즉시 중단
        window.speechSynthesis.cancel();

        if (!isRecording) {
            recognition.start();
            isRecording = true;
            voiceBtn.innerHTML = '<span class="voice-icon">⏹️</span>';
        } else {
            recognition.stop();
        }
    };

    // // 홈 진입시 안내멘트+자동음성인식 (브라우저 정책상 첫 진입은 클릭후 동작이 보장)
    // window.addEventListener('DOMContentLoaded', () => {
    //     if (window.SpeechRecognition && recognition && !isRecording) {
    //         const greeting = new SpeechSynthesisUtterance("안녕하세요 보이스 뱅크입니다. 무엇을 도와드릴까요?");
    //         greeting.lang = 'ko-KR';
    //         window.speechSynthesis.speak(greeting);

    //         greeting.onend = () => {
    //             if (!isRecording) {
    //                 recognition.start();
    //                 isRecording = true;
    //                 voiceBtn.innerHTML = '<span class="voice-icon">⏹️</span>';
    //             }
    //         };
    //     }
    // });
}