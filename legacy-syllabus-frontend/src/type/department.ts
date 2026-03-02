export const facultyMap = {
  融合学域: ["先導学類", "観光デザイン学類", "スマート創成科学類"],
  理工学域: [
    "数物科学類",
    "物質化学類",
    "機械工学類",
    "フロンティア工学類",
    "電子情報通信学類",
    "地球社会基盤学類",
    "生命理工学類",
  ],
  人間社会学域: [
    "人文学類",
    "法学類",
    "経済学類",
    "学校教育学類",
    "地域創造学類",
    "国際学類",
  ],
  医薬保健学域: ["医学類", "薬学類", "医薬科学類", "保健学類"],
} as const;

// 学域名の型
export type Department = keyof typeof facultyMap;

// 学類名の型（全ての学類のユニオン型）
export type FacultyName = (typeof facultyMap)[Department][number];

// Faculty型（学域と学類の組み合わせ）
export type Faculty = {
  [D in Department]: { department: D; faculty: (typeof facultyMap)[D][number] };
}[Department];
