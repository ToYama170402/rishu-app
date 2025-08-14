interface IFaculty {
  department: string;
  faculty: string;
}

type yugo = IFaculty & {
  department: "融合学域";
  faculty: "先導学類" | "観光デザイン学類" | "スマート創成科学類";
};

type rikoh = IFaculty & {
  department: "理工学域";
  faculty:
    | "数物科学類"
    | "物質化学類"
    | "機械工学類"
    | "フロンティア工学類"
    | "電子情報通信学類"
    | "地球社会基盤学類"
    | "生命理工学類";
};

type jinsha = IFaculty & {
  department: "人間社会学域";
  faculty:
    | "人文学類"
    | "法学類"
    | "経済学類"
    | "学校教育学類"
    | "地域創造学類"
    | "国際学類";
};

type iyaku = IFaculty & {
  department: "医薬保健学域";
  faculty: "医学類" | "薬学類" | "医薬科学類" | "保健学類";
};

export type Faculty = yugo | rikoh | jinsha | iyaku;
export type Department = Faculty["department"];
