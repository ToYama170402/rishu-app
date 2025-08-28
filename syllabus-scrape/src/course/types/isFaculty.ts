import type { Faculty } from "@/course";

export function isFaculty(value: unknown): value is Faculty["faculty"] {
  // input: 何らかの完全な学類名を含む文字列
  const faculties: Faculty["faculty"][] = [
    "先導学類",
    "観光デザイン学類",
    "スマート創成科学類",
    "数物科学類",
    "物質化学類",
    "機械工学類",
    "フロンティア工学類",
    "電子情報通信学類",
    "地球社会基盤学類",
    "生命理工学類",
    "人文学類",
    "法学類",
    "経済学類",
    "学校教育学類",
    "地域創造学類",
    "国際学類",
    "医学類",
    "薬学類",
    "医薬科学類",
    "保健学類",
  ];
  return (
    typeof value === "string" && faculties.includes(value as Faculty["faculty"])
  );
}
