require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const pages = [
    { name: "홈", file: "home.html" },
    { name: "혜택", file: "benefit.html" },
    { name: "결제", file: "pay.html" },
    { name: "자산", file: "money.html" },
    { name: "머니", file: "money.html" },
    { name: "증권", file: "paper.html" },
    { name: "페이퍼", file: "paper.html" }
];

app.post('/askgpt', async (req, res) => {
    try {
        const question = req.body.question;
        if (!question) {
            return res.status(400).json({ answer: '질문이 없습니다.' });
        }

        // 프롬프트에 '반드시 아래 5개 파일명만 이동 명령에 사용' 명시!
        const prompt = `
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


[사용자 질문]
${question}

[예시]
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
`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: prompt }
            ],
            max_tokens: 400,
        });

        const answer = completion.choices[0].message.content;
        res.json({ answer });
    } catch (err) {
        res.json({ answer: `에러 발생: ${err.message}` });
    }
});

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중!');
});
