import { parseSV } from "./helper";
async function fetchAll() {
  try {
    const response = await fetch("http://localhost:3000/api", {
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
  try {
    const response = await fetch(
      `https://kurisyushien.org/api?mode=search&word=${lectureNumber}`,
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
