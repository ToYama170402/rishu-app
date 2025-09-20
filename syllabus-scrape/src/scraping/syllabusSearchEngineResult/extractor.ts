import { BaseExtractor, type DOMParser, type ExtractionContext } from "../core";

export class SyllabusSearchResultExtractor extends BaseExtractor<string[][]> {
  extract(
    parser: DOMParser,
    selector: string = "#ctl00_phContents_ucGrid_grv>tbody>tr",
    context?: ExtractionContext
  ) {
    const { result, duration } = this.measureExtraction(() => {
      return parser.find(selector).map((row) => {
        const columns = row.find("td").map((cell) => {
          if (cell.find("a").length === 0) {
            return cell.html().replace(/<br>/g, "\n");
          } else {
            return cell.find("a")[0]?.attr("href") ?? "";
          }
        });
        return columns;
      });
    });
    return this.createExtractionResult(result, duration);
  }
}
