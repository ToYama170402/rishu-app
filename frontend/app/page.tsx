import TimeTable from "../components/TimeTable";
import SideBar from "@/components/SideBar";
import { fetchAll } from "../util/rishu";
import { array2WeekTimeTable } from "@/util/timeTable";
export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const weekTimeTableData = array2WeekTimeTable(datas);
  return (
    <>
      <SideBar>
        <TimeTable
          timeTable={weekTimeTableData}
          width={"100%"}
          height={"100%"}
        />
      </SideBar>
    </>
  );
}
