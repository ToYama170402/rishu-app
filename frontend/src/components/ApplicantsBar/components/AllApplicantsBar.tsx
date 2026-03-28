import type { ApplicantsBarProps } from "../types/applicantsBarProps";

/** 全志望者モードの棒グラフ（超過時は赤縞パターンで表示） */
const AllApplicantsBar = ({ lecture }: Omit<ApplicantsBarProps, "base">) => {
  const applicantsAmount = lecture.applicants;
  const isOver = applicantsAmount.all > lecture.capacity;

  const totalBase = isOver ? applicantsAmount.all : lecture.capacity;
  const capacityRatio = isOver
    ? (lecture.capacity / applicantsAmount.all) * 100 + "%"
    : "100%";
  const overflowRatio = isOver
    ? (1 - lecture.capacity / applicantsAmount.all) * 100 + "%"
    : "0%";

  function w(count: number) {
    if (totalBase === 0) {
      return "0%";
    }
    return (count / totalBase) * 100 + "%";
  }

  return (
    <div className="relative my-1">
      {/* 定員ライン（破線枠） */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 border border-dashed border-black bg-transparent"
        style={{ width: capacityRatio }}
      />
      {/* 超過分（赤縞） */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 opacity-80"
        style={{
          width: overflowRatio,
          backgroundImage:
            "repeating-linear-gradient(60deg, transparent, #fca5a5 0px 5px, transparent 5px 10px)",
        }}
      />

      {/* 志望者棒グラフ */}
      <div className="relative flex h-fit overflow-visible text-center">
        {/* 第１希望（優先指定含む） */}
        <div
          className="relative shrink-0 bg-blue-100"
          style={{ width: w(applicantsAmount.first) }}
        >
          {applicantsAmount.first ? applicantsAmount.first : null}
          {/* 優先指定（上半分） */}
          <div
            className="absolute left-0 top-0 h-1/2 shrink-0 whitespace-nowrap bg-amber-100 text-[0.5rem]"
            style={{ width: w(applicantsAmount.primary) }}
          >
            優先指定：
            {applicantsAmount.primary ? applicantsAmount.primary : null}
          </div>
        </div>
        {/* 第２希望 */}
        <div
          className="shrink-0 bg-orange-100"
          style={{ width: w(applicantsAmount.second) }}
        >
          {applicantsAmount.second ? applicantsAmount.second : null}
        </div>
        {/* 第３希望 */}
        <div
          className="shrink-0 bg-green-100"
          style={{ width: w(applicantsAmount.third) }}
        >
          {applicantsAmount.third ? applicantsAmount.third : null}
        </div>
        {/* 第４希望 */}
        <div
          className="shrink-0 bg-purple-100"
          style={{ width: w(applicantsAmount.fourth) }}
        >
          {applicantsAmount.fourth ? applicantsAmount.fourth : null}
        </div>
        {/* 第５希望 */}
        <div
          className="shrink-0 bg-gray-100"
          style={{ width: w(applicantsAmount.fifth) }}
        >
          {applicantsAmount.fifth ? applicantsAmount.fifth : null}
        </div>
      </div>
    </div>
  );
};

export default AllApplicantsBar;
