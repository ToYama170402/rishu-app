/**
 * 区切り文字つき文字列を2次元配列にパースする。
 * CRLF / LF どちらの行末にも対応する。空行は結果に含まれない。
 * @param str パース対象の文字列
 * @param delimiter 区切り文字（デフォルト: ','）
 */
function parseSV(str: string, delimiter: string = ","): string[][] {
  return str
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => line.split(delimiter));
}

export { parseSV };
