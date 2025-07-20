import { parseSV } from "@/util/parseSV";
import endpoints from "@/const/endpoint";
import nodeEnv from "./nodeEnv";

async function fetchAll() {
  const endpoint =
    nodeEnv() === "development" ? endpoints.TSVDemo : endpoints.TSV;
  console.log(`Fetching data from: ${endpoint}`);
  try {
    const response = await fetch(endpoint, {
      mode: "cors",
      redirect: "follow",
      next: { revalidate: 50 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return parseSV(data, "\t");
  } catch (error) {
    throw new Error(`Failed to fetch data${error}`);
  }
}
async function fetchDetail(lectureNumber: string) {
  const endpoint =
    nodeEnv() === "development" ? endpoints.TSVDemo : endpoints.TSV;
  try {
    const response = await fetch(
      `${endpoint}?mode=search&word=${lectureNumber}`,
      {
        mode: "cors",
        redirect: "follow",
        next: { revalidate: 50 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    console.log(response);
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data${error}`);
  }
}
export { fetchAll, fetchDetail };
