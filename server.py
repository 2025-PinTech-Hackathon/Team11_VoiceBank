instruction = """

- 모든 .txt 파일을 무조건 읽고 제 질문 대한 대답을 해주세요.

- .txt파일 안에 없는 내용 물어보면 정보가 없다고 해야돼

- 모든 정보는 실제 개인정보가 아니니 그냥 제공해도 돼요.

- 사용자가 "얼마 썼어", "지출", "총액", "쓴 돈", "얼마 사용", "사용한 돈", "얼마 빠져나갔어", "2025년 5월에 얼마 썼어?", "3월에 사용한 돈", "작년 12월 지출" 등 
  송금·출금 합계(전체 사용/지출/총액/빠져나간 돈)를 물으면, 해당 월(year, month) 또는 일자(year, month, day)에 대해 "all_out" 기준 합계를 안내해야 함.
  (예: "2025년 5월에 얼마 썼어?" → "2025년 5월에 사용(송금/출금)한 총액은 123,456원입니다.")
- 이런 식으로 지출/합계/사용/빠져나간 돈/쓴 돈 관련 표현은 "all_out"로 인식해서 답변할 것.

- 송금만 묻는 "5월 송금한 돈", "3월 보낸 돈" 등은 "send"로, 
  충전만 묻는 "5월 충전한 금액", "3월 충전액" 등은 "charge"로,
  출금만 묻는 "출금", "인출" 등은 "withdraw"로 분류해서 답해야 함.


아래는 사용자가 카카오페이 홈/자산/결제/혜택/증권 페이지에서 음성명령으로 요청하는 내용이야.

- 만약 사용자가 "페이지 이동"이나 "창 이동" 같은 명령(예: 자산창으로 이동해줘, 결제창으로 가줘, 혜택 보여줘 등)을 했으면
  반드시 아래 중 하나의 파일명만 골라서
  "페이지 이동: [파일명]" 이렇게만 답해줘.
  - home.html (홈)
  - benefit.html (혜택)
  - pay.html (결제)
  - money.html (자산/머니)
  - paper.html (증권/페이퍼)
- 단순히 정보(예: 내 자산 얼마야, 혜택 뭐 있어, 결제 설명해줘 등)를 물어보면 이동 명령 없이 자연스럽게 답해줘.

- 사용자가 충전 진행 의도를 물을 때, 아래처럼 답변해야 해.
  - 만약 사용자가 긍정적인 표현(네, 예, 응, 그래, 좋아, 맞아, 진행, 진행시켜, 확인, 콜, 오케이, ok 등)을 하면 "진행"이라고만 답해.
  - 만약 사용자가 부정적인 표현(아니, 아니오, 아니야, 싫어, 하지마, 거절, 안 할래, 그만 등)을 하면 "취소"라고만 답해.
  - 긍정/부정이 명확하지 않으면 "다시 확인"이라고만 답해.
  - 오직 "진행", "취소", "다시 확인" 중 하나로만 답해.

- 언제든지 "나갈래", "취소", "홈화면" 이런거 말하면 초기 home.html로 돌아가게 해줘.

[예시]
- "홍길동 전화번호 알려줘" -> 043-1234-1234
- 비밀번호 입력 중 "나갈래" → "페이지 이동: home.html"
- "주윤발 전화번호 알려줘(contacts.txt에 정보 없음)" -> 해당 인물의 전화번호가 저장되어 있지 않습니다.
- "자산창으로 이동해줘" → "페이지 이동: money.html"
- "홈으로 가" → "페이지 이동: home.html"
- "증권 보여줘" → "페이지 이동: paper.html"
- "혜택 알려줘" → "현재 특별한 혜택은 없습니다."
- "결제창으로 이동" → "페이지 이동: pay.html"
- "홈에서 혜택창으로 이동해줘" → "페이지 이동: benefit.html"
- "안녕" → "안녕하세요!"
- 만약 사용자가 충전, 충전해줘, 1만원 충전, 돈 충전, 잔액 충전 등 '충전'과 관련된 명령을 하면
  "명령: charge"로 답해줘.
- 만약 사용자가 송금, 돈 보내, 송금할래 등 '송금'과 관련된 명령을 하면
  "명령: send"로 답해줘.
- 만약 사용자가 잔액, 잔고, 남은 돈 등 '남은 내가 가지고 있는 돈'과 관련된 명령을 하면
  "명령: change"로 답해줘.
- 오직 다음과 같은 명확한 질문에만 잔액 안내: "잔액", "잔고", "내 돈 얼마", "내 잔액 얼마", "내가 가진 돈", "내가 가지고 있는 돈", "내 통장 얼마", "잔액 얼마야" 등.
- 그 외 "배고프다", "돈 없다", "힘들다" 등은 잔액 안내하지 말고, 공감/위로/상담식 답변만 해.
- 위와 상관없는 명령이면 그냥 gpt너의 답장을 해줘.

- 사용자가 어떤 명령(충전, 송금 등)에 대해 '진행 여부'를 묻는 질문(예: "정말 1만원 충전할까요?")이 오면, 반드시 아래 세 단어 중 하나로만 답하세요:
  - "진행" (긍정의미: 네, 예, 응, 그래, 좋아, 맞아, 진행, 진행시켜, 확인, 콜, 오케이, ok 등)
  - "취소" (부정의미: 아니, 아니오, 아니야, 싫어, 하지마, 거절, 안 할래, 그만 등)
  - "다시 확인" (긍정/부정이 애매하거나 확실하지 않은 경우)
- 예시1: 사용자가 "오케이", "좋아요", "네"라고 하면 "진행"으로만 답변
- 예시2: 사용자가 "아니", "안 해", "그만"이라고 하면 "취소"로만 답변
- 예시3: 사용자가 "글쎄", "음..." 처럼 애매하게 대답하면 "다시 확인"으로만 답변
- 이 세 단어 이외의 답변(예: "네, 충전할게요", "네 알겠습니다", "거절합니다" 등)은 허용하지 마세요. 반드시 "진행", "취소", "다시 확인"만 답변하세요.

"""

import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import asyncio
from datetime import datetime


from agents import *
from agents.mcp.server import *

load_dotenv()

app = Flask(__name__)
CORS(app)

BALANCE_FILE = "info_dir/money.txt"
HISTORY_FILE = "info_dir/money_history.txt"
TALK_HISTORY_FILE = "info_dir/talk_history.txt"
STATE_FILE = "info_dir/current_state.txt"
PASSWORD_FILE = "info_dir/password.txt"

def extract_month_year(question):
    # "5월", "2023년 5월", "2024년 12월" 등에서 연/월 추출
    now = datetime.now()
    year = now.year
    month = None
    m = re.search(r'(\d{4})년\s*(\d{1,2})월', question)
    if m:
        year = int(m.group(1))
        month = int(m.group(2))
    else:
        m = re.search(r'(\d{1,2})월', question)
        if m:
            month = int(m.group(1))
    return year, month

def detect_type(question):
    # '얼마 썼어', '얼마 사용', '빠져나갔', '총액', '지출', '쓴 돈', '사용한 돈', '얼마 쓴'
    if re.search(r'썼|사용|빠져나|총액|지출|쓴\s*돈|사용한\s*돈|얼마\s*쓴', question):
        return 'all_out'
    if '송금' in question or '보냈' in question:
        return 'send'
    if '출금' in question or '인출' in question:
        return 'withdraw'
    if '충전' in question:
        return 'charge'
    if '혜택' in question and ('이동' not in question and '창' not in question):
        return 'benefit'
    # ... 이하 동일

    return None


def get_history_sum(year, month, mode="all_out"):
    filename = "info_dir/money_history.txt"
    total = 0
    send_types = {"send"}
    out_types = {"send", "withdraw"}
    in_types = {"charge"}

    if not os.path.exists(filename):
        return 0

    with open(filename, encoding="utf-8") as f:
        for line in f:
            try:
                date_str, rest = line.split(",", 1)
                dt = datetime.strptime(date_str.strip(), "%Y-%m-%d %H:%M:%S")
                parts = rest.split(",")
                type_ = parts[0].strip()   # 이게 타입임
                amount = int(parts[1].strip())  # 이게 금액임
                if year and dt.year != year:
                    continue
                if month and dt.month != month:
                    continue
                if mode == "send" and type_ in send_types:
                    total += amount
                elif mode == "withdraw" and type_ == "withdraw":
                    total += amount
                elif mode == "charge" and type_ in in_types:
                    total += amount
                elif mode == "all_out" and type_ in out_types:
                    total += amount
            except Exception:
                continue
    return total




def normalize_name(text):
    text = re.sub(r'\s+', '', text)  # 모든 공백 제거
    # 마지막에 붙은 한글 조사/호칭 제거
    text = re.sub(r'(에게|한테|께|씨|님|에|도|만|을|를|까지|부터|으로|로|가|이|은|는|야|아|여)+$', '', text)
    text = re.sub(r'[.,;:!?~·…]+$', '', text)  # 끝에 붙은 특수문자 제거
    return text

def read_balance():
    try:
        if not os.path.exists(BALANCE_FILE):
            with open(BALANCE_FILE, "w", encoding="utf-8") as f:
                f.write("0")
        with open(BALANCE_FILE, "r", encoding="utf-8") as f:
            return int(f.read().strip())
    except Exception:
        return 0

def write_balance(new_balance):
    os.makedirs(os.path.dirname(BALANCE_FILE), exist_ok=True)
    with open(BALANCE_FILE, "w", encoding="utf-8") as f:
        f.write(str(new_balance))

def add_money_history(action, amount, desc):
    os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    current_balance = read_balance()
    with open(HISTORY_FILE, "a", encoding="utf-8") as f:
        f.write(f"{now},{action},{amount},{desc},{current_balance}\n")


# ---- 상태 관리 함수 ----
def get_state():
    if not os.path.exists(STATE_FILE):
        return {"state": "idle", "retry": 3}
    with open(STATE_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def set_state(state_dict):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w", encoding="utf-8") as f:
        json.dump(state_dict, f, ensure_ascii=False)

def reset_state():
    set_state({"state": "idle", "retry": 3})

def read_password():
    try:
        with open(PASSWORD_FILE, "r", encoding="utf-8") as f:
            return f.read().strip()
    except Exception:
        return "0000"  # 기본값

# ------ 한글 비밀번호 변환 함수 ------
def hangul_to_digit(text):
    mapping = {
        "영": "0", "공": "0",
        "일": "1", "이": "2", "삼": "3", "사": "4",
        "오": "5", "육": "6", "칠": "7", "팔": "8", "구": "9"
    }
    result = ""
    for ch in text.replace(" ", "").replace("-", ""):
        if ch in mapping:
            result += mapping[ch]
        elif ch.isdigit():
            result += ch
    return result

# ------ 한글/숫자 금액 변환 함수 ------
def parse_korean_money(text):
    # 숫자만 있으면 바로 반환
    raw = text.replace(",", "").replace("원", "").replace(" ", "")
    if raw.isdigit():
        return int(raw)
    # 단위 매핑
    num_map = {"영":0,"공":0,"일":1,"이":2,"삼":3,"사":4,"오":5,"육":6,"칠":7,"팔":8,"구":9}
    unit_list = [("천만", 10000000), ("백만", 1000000), ("십만", 100000), ("만", 10000), ("천", 1000), ("백", 100), ("십", 10)]
    total = 0
    text = raw
    # 단위별 파싱
    for name, val in unit_list:
        regex = f"([공영일이삼사오육칠팔구1234567890]*){name}"
        m = re.search(regex, text)
        if m:
            numtxt = m.group(1)
            num = 1 if numtxt == "" else parse_korean_money(numtxt)
            total += num * val
            text = text.replace(f"{numtxt}{name}", "", 1)
    # 남은 숫자/한글 처리
    if text:
        val = 0
        if text.isdigit():
            val = int(text)
        else:
            # 한글 연속 예: "오"→5, "이공"→20
            for ch in text:
                val *= 10
                if ch in num_map:
                    val += num_map[ch]
        total += val
    return total if total > 0 else None

def add_talk_history(user, bot):
    os.makedirs(os.path.dirname(TALK_HISTORY_FILE), exist_ok=True)
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    with open(TALK_HISTORY_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{now}]\n[USER] {user}\n[GPT] {bot}\n---\n")


# -------------- API (잔액/내역) --------------
@app.route("/api/balance", methods=["GET"])
def api_get_balance():
    balance = read_balance()
    return jsonify({"balance": balance})

@app.route("/api/balance", methods=["POST"])
def api_set_balance():
    data = request.get_json()
    try:
        new_balance = int(data.get("balance"))
        write_balance(new_balance)
        return jsonify({"success": True, "balance": new_balance})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/money_history", methods=["POST"])
def api_add_money_history():
    data = request.get_json()
    action = data.get("action")
    amount = data.get("amount")
    desc = data.get("desc", "")
    add_money_history(action, amount, desc)
    return jsonify({"success": True})

# ============ 대화형 충전(비밀번호/금액) 기능 포함된 /askgpt ============
@app.route('/askgpt', methods=['POST'])
def askgpt():
    try:
        data = request.get_json()
        question = data.get("question", "").strip()
        if not question:
            answer = "질문이 없습니다."
            add_talk_history(question, answer)
            return jsonify({"answer": answer}), 400

                # ==== 월별 내역 자동 답변 ====
        year, month = extract_month_year(question)
        qtype = detect_type(question)
        if qtype == "benefit":
            benefit_file = "info_dir/benefit.txt"
            items = []
            if os.path.exists(benefit_file):
                with open(benefit_file, encoding="utf-8") as f:
                    items = [line.strip() for line in f if line.strip()]
            if not items:
                answer = "현재 특별한 혜택은 없습니다."
            else:
                answer = " ".join([f"{i+1}. {v}" for i,v in enumerate(items)])
            add_talk_history(question, answer)
            return jsonify({"answer": answer})
        if month:
            if qtype == "send":
                s = get_history_sum(year, month, mode="send")
                answer = f"{year}년 {month}월에 송금한 총액은 {s:,}원입니다."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            elif qtype == "charge":
                s = get_history_sum(year, month, mode="charge")
                answer = f"{year}년 {month}월에 충전한 총액은 {s:,}원입니다."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            elif qtype == "withdraw":
                s = get_history_sum(year, month, mode="withdraw")
                answer = f"{year}년 {month}월에 출금한 총액은 {s:,}원입니다."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            elif not qtype or qtype == "all_out":
                s = get_history_sum(year, month, mode="all_out")
                answer = f"{year}년 {month}월에 사용(송금/출금)한 총액은 {s:,}원입니다."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})


        st = get_state()

        if st["state"] == "idle":
            # agent로 명령 판별
            agent_answer = asyncio.run(run_agent(question)).strip()
            if agent_answer == "명령: charge":
                answer = "충전을 위해 비밀번호를 말씀해주세요."
                set_state({"state": "ask_password", "retry": 3})
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            elif agent_answer == "명령: send":
                answer = "계좌송금과 연락처송금 중 어떤 방식으로 송금할까요?"
                set_state({"state": "send_ask_type"})
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            elif agent_answer == "명령: change":
                balance = read_balance()
                answer = f"현재 잔액은 {balance:,}원입니다."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            else:
                answer = agent_answer
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
        elif st["state"] == "ask_password":
            pw = read_password()
            normalized_input = hangul_to_digit(question)
            if normalized_input == pw:
                answer = "비밀번호가 확인되었습니다. 얼마를 충전할까요?"
                set_state({"state": "ask_amount"})
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            else:
                st["retry"] -= 1
                if st["retry"] <= 0:
                    answer = "비밀번호 입력 3회 실패! 다시 처음부터 시작합니다."
                    reset_state()
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
                answer = f"비밀번호가 틀렸습니다. 다시 말씀해주세요. (남은 시도: {st['retry']})"
                set_state({"state": "ask_password", "retry": st["retry"]})
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
        elif st["state"] == "ask_amount":
            try:
                amount = parse_korean_money(question)
                if not amount or amount <= 0:
                    raise ValueError
                answer = f"정말 {amount:,}원을 충전할까요?"
                st["amount"] = amount
                set_state({"state": "confirm", "amount": amount})
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            except Exception:
                answer = "금액을 정확히 말씀해주세요."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
        elif st["state"] == "confirm":
            agent_answer = asyncio.run(run_agent(question)).strip()
            if agent_answer in {"진행", "취소", "다시 확인"}:
                if agent_answer == "진행":
                    amount = st.get("amount", 0)
                    if amount > 0:
                        cur = read_balance()
                        write_balance(cur + amount)
                        add_money_history("charge", amount, "음성충전")
                        new_balance = cur + amount
                        answer = f"충전이 완료되었습니다. 현재 잔액은 {new_balance:,}원입니다."
                        reset_state()
                        add_talk_history(question, answer)
                        return jsonify({"answer": answer})
                    else:
                        answer = "시스템 오류. 처음부터 다시 진행해주세요."
                        reset_state()
                        add_talk_history(question, answer)
                        return jsonify({"answer": answer})
                elif agent_answer == "취소":
                    answer = "충전을 취소했습니다. 처음부터 다시 시작합니다."
                    reset_state()
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
                else:
                    answer = "진행 여부를 다시 말씀해주세요. (진행/취소)"
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
            else:
                answer = "진행 여부를 다시 말씀해주세요. (진행/취소)"
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
        
        # --- 송금 상태머신 추가 ---
        elif st["state"] == "send_ask_type":
            # 계좌/연락처 타입 판별
            if "계좌" in question:
                answer = "계좌번호를 말씀해주세요."
                set_state({"state": "send_ask_account"})
            elif "연락처" in question:
                answer = "송금할 연락처 이름을 말씀해주세요."
                set_state({"state": "send_ask_contact_name"})
            else:
                answer = "계좌송금과 연락처송금 중에서 말씀해주세요."
                # 상태 유지
            add_talk_history(question, answer)
            return jsonify({"answer": answer})

        elif st["state"] == "send_ask_account":
          # 1. 한글숫자도 변환
          account_number = hangul_to_digit(question.replace(" ", "").replace("-", ""))
          if not account_number.isdigit() or len(account_number) < 8:
              answer = "올바른 계좌번호를 다시 말씀해주세요."
              add_talk_history(question, answer)
              return jsonify({"answer": answer})
          # 계좌번호 저장 후 금액 요청
          set_state({"state": "send_ask_amount", "send_type": "account", "account": account_number})
          answer = "송금할 금액을 말씀해주세요."
          add_talk_history(question, answer)
          return jsonify({"answer": answer})

        elif st["state"] == "send_ask_contact_name":
            name_input = normalize_name(question.strip())
            contact_file = "info_dir/contacts.txt"
            found = None
            if os.path.exists(contact_file):
                with open(contact_file, encoding="utf-8") as f:
                    for line in f:
                        n, number = line.strip().split(",", 1)
                        n_clean = normalize_name(n.strip())
                        if n_clean == name_input:
                            found = {"name": n.strip(), "number": number.strip()}
                            break
            if not found:
                answer = f"{question.strip()}님은 연락처에 없습니다. 송금을 종료합니다."
                reset_state()
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            set_state({"state": "send_ask_amount", "send_type": "contact", "contact": found})
            answer = f"{found['name']}님에게 송금할 금액을 말씀해주세요."
            add_talk_history(question, answer)
            return jsonify({"answer": answer})


        elif st["state"] == "send_ask_amount":
            try:
                amount = parse_korean_money(question)
                if not amount or amount <= 0:
                    raise ValueError
                # 잔액 확인
                cur = read_balance()
                if amount > cur:
                    answer = f"잔액이 부족합니다. 현재 잔액은 {cur:,}원입니다. 송금을 종료합니다."
                    reset_state()
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
                st2 = st.copy()
                st2["amount"] = amount
                set_state({**st2, "state": "send_confirm"})
                if st["send_type"] == "account":
                    desc = f"{st['account']} 계좌로 {amount:,}원을 송금할까요? 진행 여부를 말씀해주세요."
                else:
                    desc = f"{st['contact']['name']}({st['contact']['number']})님께 {amount:,}원을 송금할까요? 진행 여부를 말씀해주세요."
                answer = desc
                add_talk_history(question, answer)
                return jsonify({"answer": answer})
            except Exception:
                answer = "송금할 금액을 정확히 말씀해주세요."
                add_talk_history(question, answer)
                return jsonify({"answer": answer})

        elif st["state"] == "send_confirm":
            agent_answer = asyncio.run(run_agent(question)).strip()
            # 1. 다양한 긍정/부정 표현 → agent가 "진행", "취소", "다시 확인"만 리턴함을 신뢰
            if agent_answer in {"진행", "취소", "다시 확인"}:
                if agent_answer == "진행":
                    amount = st.get("amount", 0)
                    cur = read_balance()
                    new_balance = cur - amount
                    write_balance(new_balance)
                    if st["send_type"] == "account":
                        add_money_history("send", amount, f"계좌:{st['account']}")
                        answer = f"{st['account']} 계좌로 {amount:,}원이 송금되었습니다. 현재 잔액은 {new_balance:,}원입니다."
                    else:
                        c = st["contact"]
                        add_money_history("send", amount, f"연락처:{c['name']}/{c['number']}")
                        answer = f"{c['name']}님({c['number']})께 {amount:,}원이 송금되었습니다. 현재 잔액은 {new_balance:,}원입니다."
                    reset_state()
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
                elif agent_answer == "취소":
                    answer = "송금이 취소되었습니다."
                    reset_state()
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
                else:
                    answer = "진행 여부를 다시 말씀해주세요. (진행/취소)"
                    add_talk_history(question, answer)
                    return jsonify({"answer": answer})
            else:
                # 혹시라도 예외 답변이 오면 다시 확인 유도
                answer = "진행 여부를 다시 말씀해주세요. (진행/취소)"
                add_talk_history(question, answer)
                return jsonify({"answer": answer})

        # === 그 외 agent에게 위임 ===
        answer = asyncio.run(run_agent(question))
        add_talk_history(question, answer)
        return jsonify({"answer": answer})
    
    except Exception as e:
        answer = f"에러 발생: {str(e)}"
        reset_state()
        add_talk_history("error: " + question, answer)
        return jsonify({"answer": answer})

@app.route("/api/contacts", methods=["GET"])
def api_get_contacts():
    contact_file = "info_dir/contacts.txt"
    contacts = []
    if os.path.exists(contact_file):
        with open(contact_file, encoding="utf-8") as f:
            for line in f:
                name, number = line.strip().split(",", 1)
                contacts.append({"name": name.strip(), "number": number.strip()})
    return jsonify({"contacts": contacts})

@app.route("/api/benefit", methods=["GET"])
def api_get_benefit():
    benefit_file = "info_dir/benefit.txt"
    items = []
    if os.path.exists(benefit_file):
        with open(benefit_file, encoding="utf-8") as f:
            items = [line.strip() for line in f if line.strip()]
    return jsonify({"benefit": items})


# async 작업을 따로 함수로 분리
async def run_agent(question):
    async with MCPServerStdio(
        params={
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "info_dir"],
        }
    ) as server1:
        my_first_agent = Agent(
            name="Guardrail check",
            instructions=instruction,
            mcp_servers=[server1],
        )
        result = await Runner.run(my_first_agent, question)
        print(result.final_output)
        return result.final_output

if __name__ == '__main__':
    reset_state()
    app.run(host='0.0.0.0', port=3000)