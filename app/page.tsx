"use client";

import { useState } from "react";
import {
  formatApplyMessage,
  INSTAGRAM_DM_URL,
  INSTAGRAM_HANDLE,
  type ApplyFormData,
} from "@/lib/formatMessage";
import { copyToClipboard, openInstagramDm } from "@/lib/copyText";
import { AgilityLevelPicker } from "@/components/AgilityLevelPicker";
import { ChoiceChips } from "@/components/ChoiceChips";

const INITIAL: ApplyFormData = {
  name: "",
  phone: "",
  memberType: "member",
  agilityLevel: "",
  dogName: "",
  note: "",
};

const MEMBER_OPTIONS = [
  { value: "member" as const, label: "회원 20만" },
  { value: "non-member" as const, label: "비회원 30만" },
];

export default function ApplyPage() {
  const [form, setForm] = useState<ApplyFormData>(INITIAL);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ApplyFormData, string>>
  >({});
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof ApplyFormData, string>> = {};
    if (!form.name.trim()) next.name = "이름을 입력해 주세요.";
    if (!form.phone.trim()) next.phone = "연락처를 입력해 주세요.";
    else if (!/^[\d\s\-+()]{9,}$/.test(form.phone.trim())) {
      next.phone = "올바른 연락처를 입력해 주세요.";
    }
    if (!form.agilityLevel) {
      next.agilityLevel = "어질리티 레벨을 선택해 주세요.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setMessage(formatApplyMessage(form));
    setCopied(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = async () => {
    if (!message) return;
    const ok = await copyToClipboard(message);
    if (ok) {
      setCopied(true);
      showToast("복사되었습니다");
    } else {
      showToast("길게 눌러 직접 복사해 주세요");
    }
  };

  const handleCopyAndOpen = async () => {
    await handleCopy();
    openInstagramDm();
    showToast("인스타에서 붙여넣기 후 전송");
  };

  const reset = () => {
    setForm(INITIAL);
    setMessage(null);
    setErrors({});
    setCopied(false);
  };

  return (
    <div className="page">
      <header className="top-bar">
        <div className="brand">
          <div className="avatar-ring">
            <div className="avatar-ring-inner">IF</div>
          </div>
          <div className="brand-text">
            양주독아카데미
            <span>세미나 신청</span>
          </div>
        </div>
        <a
          className="dm-link"
          href={INSTAGRAM_DM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </header>

      <section className="hero">
        <span className="chip">IFCS · WORLD CHAMPION</span>
        <h1>IFCS 어질리티 월드챔피언 세미나</h1>
        <p className="meta">
          <strong>7.11(토)</strong> 07:00–12:00 · 양주독아카데미
          <br />
          선착순 10명 · 회원 20만 / 비회원 30만
        </p>
      </section>

      <main className="main">
        {message ? (
          <section className="success" aria-live="polite">
            <div className="success-header">
              <div className="success-icon">✓</div>
              <h2>DM으로 신청 보내기</h2>
              <p>
                아래 메시지를 복사해 <strong>{INSTAGRAM_HANDLE}</strong>으로
                보내주세요.
              </p>
            </div>

            <div className="steps-card">
              <h3>How to apply</h3>
              <ol className="steps">
                <li>「복사 + DM 열기」 버튼을 누릅니다</li>
                <li>채팅창에 붙여넣기 합니다</li>
                <li>전송하면 접수 완료</li>
              </ol>
            </div>

            <div className="bubble-wrap">
              <p className="label">보낼 메시지</p>
              <div className="bubble">
                <div className="handle">
                  <div className="handle-ring">
                    <span>나</span>
                  </div>
                  <div className="handle-name">
                    신청 메시지
                    <small>복사 후 DM에 붙여넣기</small>
                  </div>
                </div>
                <pre>{message}</pre>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-gradient btn-ig-icon"
              onClick={handleCopyAndOpen}
            >
              복사 + 인스타 DM 열기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCopy}>
              {copied ? "복사됨 ✓" : "내용만 복사"}
            </button>
            <button
              type="button"
              className="btn btn-outline btn-ig-icon"
              onClick={openInstagramDm}
            >
              인스타 DM 열기
            </button>
            <button type="button" className="back-link" onClick={reset}>
              신청서 다시 작성
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="card">
            <p className="card-title">참가 신청서</p>

            <div className="field">
              <label htmlFor="name">
                이름<span className="req">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="이름"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="phone">
                연락처<span className="req">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>

            <div className="field">
              <label>
                참가 구분<span className="req">*</span>
              </label>
              <ChoiceChips
                name="memberType"
                value={form.memberType}
                options={MEMBER_OPTIONS}
                onChange={(memberType) =>
                  setForm({ ...form, memberType })
                }
              />
            </div>

            <div className="field">
              <label>
                어질리티 레벨<span className="req">*</span>
              </label>
              <p className="field-hint">해당하는 단계를 선택해 주세요</p>
              <AgilityLevelPicker
                value={form.agilityLevel}
                onChange={(agilityLevel) => {
                  setForm({ ...form, agilityLevel });
                  if (errors.agilityLevel) {
                    setErrors((e) => ({ ...e, agilityLevel: undefined }));
                  }
                }}
                error={errors.agilityLevel}
              />
            </div>

            <div className="field">
              <label htmlFor="dogName">반려견 이름</label>
              <input
                id="dogName"
                name="dogName"
                type="text"
                placeholder="선택 입력"
                value={form.dogName}
                onChange={(e) => setForm({ ...form, dogName: e.target.value })}
              />
            </div>

            <div className="field">
              <label htmlFor="note">메모</label>
              <textarea
                id="note"
                name="note"
                placeholder="문의 사항 (선택)"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              다음
            </button>
          </form>
        )}
      </main>

      <footer className="footer-note">
        주최 양주독아카데미 ·{" "}
        <a href={INSTAGRAM_DM_URL} target="_blank" rel="noopener noreferrer">
          {INSTAGRAM_HANDLE}
        </a>
        <br />
        DM 확인 후 접수가 완료됩니다.
      </footer>

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
