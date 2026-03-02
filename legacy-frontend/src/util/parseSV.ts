function parseSV(str: string, delimiter: string = ','): string[][] {
  return str.split('\n').map((line) => line.split(delimiter));
}
export { parseSV };