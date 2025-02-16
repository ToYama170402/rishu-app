import Layout from "@/components/Layout";
import { array2LectureArray } from "@/util/timeTable";
import { fetchAll } from "../util/rishu";
import RishuTimeTable from "@/features/TimeTable/TimeTable";

export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const lectures = array2LectureArray(datas);

  return (
    <>
      <Layout timeTable={lectures}>
        <RishuTimeTable timeTable={lectures} />
      </Layout>
    </>
  );
}
