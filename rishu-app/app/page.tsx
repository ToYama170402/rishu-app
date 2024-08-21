import TimeTable from "../components/TimeTable";
import { fetchAll } from "../util/rishu";
import { arrayToWeekTimeTable } from "@/util/timeTable";
export default async function Home(): Promise<JSX.Element> {
  const datas = await fetchAll();
  datas.shift()?.shift();
  const weekTimeTableData = arrayToWeekTimeTable(datas);
  return (
    <TimeTable timeTable={weekTimeTableData} width={'100%'} height={'100vh'} />);
}
