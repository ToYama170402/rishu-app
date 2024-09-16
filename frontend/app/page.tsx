import SideBar from "@/components/SideBar";
import { array2WeekTimeTable } from "@/util/timeTable";
import { fetchAll } from "../util/rishu";

export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const weekTimeTableData = array2WeekTimeTable(datas);
  return (
    <>
      <SideBar timeTable={weekTimeTableData} />
    </>
  );
}
