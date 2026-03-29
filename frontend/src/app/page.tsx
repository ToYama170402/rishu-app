import { fetchLectures } from "@/lib/api/lectures";
import LotteryTimeTable from "@/features/LotteryTimeTable/LotteryTimeTable";

/**
 * トップページ（抽選科目一覧時間割）。
 *
 * Server Component として抽選データを取得し、
 * LotteryTimeTable に渡してレンダリングする。
 */
export default async function Home() {
  const lectures = await fetchLectures();
  return <LotteryTimeTable initialLectures={lectures} />;
}
