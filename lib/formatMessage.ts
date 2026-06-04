export type ApplyFormData = {
  name: string;
  phone: string;
  memberType: "member" | "non-member";
  dogName: string;
  note: string;
};

const MEMBER_LABEL = { member: "회원", "non-member": "비회원" } as const;

export function formatApplyMessage(data: ApplyFormData): string {
  const lines = [
    "[IFCS 어질리티 월드챔피언 세미나 신청]",
    "",
    `이름: ${data.name.trim()}`,
    `연락처: ${data.phone.trim()}`,
    `구분: ${MEMBER_LABEL[data.memberType]}`,
  ];

  if (data.dogName.trim()) {
    lines.push(`반려견: ${data.dogName.trim()}`);
  }
  if (data.note.trim()) {
    lines.push(`메모: ${data.note.trim()}`);
  }

  lines.push(
    "",
    "일정: 7월 11일(토) 07:00~12:00",
    "장소: 양주독아카데미 (양주시 광사동 269-1)",
    "",
    "신청 내용 확인 부탁드립니다."
  );

  return lines.join("\n");
}

export const INSTAGRAM_DM_URL = "https://ig.me/m/yangju_dog.academy";
export const INSTAGRAM_HANDLE = "@yangju_dog.academy";
