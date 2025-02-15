import fs from "fs";
import { NextResponse } from "next/server";
const text = fs.readFileSync("public/dammy-data.tsv", "utf-8");
export async function GET(request: Request) {
  return NextResponse.json(text);
}
