import { calcApplicantsRatio } from "@/utils/calcApplicantsRatio";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import UnderLinedText from "./UnderLinedText";

const LectureDetailTable = ({
  lecture,
}: {
  lecture: LotteryCourseStatus;
}) => {
  const applicantsRatio = calcApplicantsRatio(
    lecture.capacity,
    lecture.applicants
  ).map((ratio) => Math.round(ratio * 100) + "%");

  const rows = [
    {
      label: <UnderLinedText color="#fef3c7">優先指定</UnderLinedText>,
      count: lecture.applicants.primary,
      ratio: applicantsRatio[0],
    },
    {
      label: <UnderLinedText color="#dbeafe">第１希望</UnderLinedText>,
      count: lecture.applicants.first,
      ratio: applicantsRatio[1],
    },
    {
      label: <UnderLinedText color="#ffedd5">第２希望</UnderLinedText>,
      count: lecture.applicants.second,
      ratio: applicantsRatio[2],
    },
    {
      label: <UnderLinedText color="#dcfce7">第３希望</UnderLinedText>,
      count: lecture.applicants.third,
      ratio: applicantsRatio[3],
    },
    {
      label: <UnderLinedText color="#f3e8ff">第４希望</UnderLinedText>,
      count: lecture.applicants.fourth,
      ratio: applicantsRatio[4],
    },
    {
      label: <UnderLinedText color="#f3f4f6">第５希望</UnderLinedText>,
      count: lecture.applicants.fifth,
      ratio: applicantsRatio[5],
    },
  ];

  return (
    <div className="overflow-x-auto rounded border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="whitespace-nowrap px-3 py-2 text-left font-medium">
              希望順位
            </th>
            <th className="whitespace-nowrap px-3 py-2 text-right font-medium">
              人数
            </th>
            <th className="whitespace-nowrap px-3 py-2 text-right font-medium">
              当選確率
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-muted/30" : ""}>
              <td className="whitespace-nowrap px-3 py-1">{row.label}</td>
              <td className="whitespace-nowrap px-3 py-1 text-right">
                {row.count}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-right">
                {row.ratio}
              </td>
            </tr>
          ))}
          <tr className="border-t-2 border-double">
            <td className="whitespace-nowrap px-3 py-1">合計</td>
            <td className="whitespace-nowrap px-3 py-1 text-right">
              {lecture.applicants.all}
            </td>
            <td className="whitespace-nowrap px-3 py-1 text-right">-</td>
          </tr>
          <tr className={rows.length % 2 === 0 ? "bg-muted/30" : ""}>
            <td className="whitespace-nowrap px-3 py-1">適正人数</td>
            <td className="whitespace-nowrap px-3 py-1 text-right">
              {lecture.capacity}
            </td>
            <td className="whitespace-nowrap px-3 py-1 text-right">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LectureDetailTable;
