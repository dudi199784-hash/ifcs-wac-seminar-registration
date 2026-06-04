# 세미나 신청 페이지 (Vercel)

QR 스캔 → 폼 작성 → **내용 복사** → **인스타 DM** (`@yangju_dog.academy`) 전송

## 로컬 실행

```bash
cd apply
npm install
npm run dev
```

브라우저: http://localhost:3457

**스타일이 안 보이면** (흰 화면에 글만 보임) — 캐시 꼬임입니다. 서버 끄고:

```bash
npm run dev:clean
```

또는 `rm -rf .next` 후 `npm run dev`

## Vercel 배포

1. [vercel.com](https://vercel.com) 로그인
2. **Add New Project** → 이 `apply` 폴더를 GitHub에 올렸다면 저장소 연결  
   (또는 Vercel CLI: `cd apply && npx vercel`)
3. **Root Directory**를 `apply`로 지정 (저장소 루트가 `file`이면 `file/apply`)
4. Deploy 후 URL 예: `https://yangju-agility-apply.vercel.app`

## 포스터 QR 연결

1. 배포 URL로 QR 생성 (예: qr-code-generator.com)
2. `file/images/qr.png` 저장
3. `file/index.html`의 `.qr-area`를 아래로 교체:

```html
<img src="images/qr.png" alt="세미나 신청" width="120" height="120" />
```

4. `npm run export` (포스터 폴더 `file`에서) 로 PNG 재생성

## 사용자 흐름

1. QR → 신청 페이지
2. 이름·연락처·회원/비회원 입력 → **신청 내용 확인하기**
3. **복사 + 인스타 DM 열기** → 붙여넣기 → 전송
