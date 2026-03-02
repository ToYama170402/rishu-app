import Layout from "@/components/Layout";
import { array2LectureArray } from "@/util/timeTable";
import { fetchAll } from "../util/rishu";
import RishuTimeTable from "@/features/TimeTable/TimeTable";

import type { JSX } from "react";

export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const lectures = array2LectureArray(datas);

  return (
    <>
      <Layout>
        <RishuTimeTable timeTable={lectures} />
      </Layout>
    </>
  );
}
