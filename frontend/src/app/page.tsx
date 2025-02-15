import SideBar from "@/components/SideBar";
import { array2LectureArray } from "@/util/timeTable";
import { fetchAll } from "../util/rishu";

export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const lectures = array2LectureArray(datas);
  return (
    <>
      <SideBar timeTable={lectures} />
    </>
  );
}
