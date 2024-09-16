import { parseSV } from "./helper";
async function fetchAll() {
  try {
    const response = await fetch("https://kurisyushien.org/api?mode=&word=", {
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
    throw new Error("Failed to fetch data");
  }
}
export { fetchAll };
