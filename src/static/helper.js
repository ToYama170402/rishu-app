// ちょっとした関数を定義

// CSVやTSVの様な形式のテキストをパース
// strにパースしたい文字列を指定
// delimiter引数に区切り文字を指定
// 参考：https://qiita.com/_shimizu/items/e45f94e7ee8a75a04e50
function parseSV(str, delimiter) {
  if (!delimiter) delimiter = ","
  return str.split('\n').reduce(function (table, row) {
    if (!table) return;
    table.push(
      row.split(delimiter).map(function (d) { return d.trim() }) //余白削除
    );
    return table;
  }, []);
}