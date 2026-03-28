import { describe, test, expect } from "vitest";
import { parseSV } from "./parseSV";

describe("parseSV", () => {
  test("parses comma separated values into 2D array", () => {
    const input = "a,b,c\n1,2,3";
    const result = parseSV(input);
    expect(result).toStrictEqual([
      ["a", "b", "c"],
      ["1", "2", "3"],
    ]);
  });

  test("uses custom delimiter", () => {
    const input = "a|b|c\nx|y|z";
    const result = parseSV(input, "|");
    expect(result).toStrictEqual([
      ["a", "b", "c"],
      ["x", "y", "z"],
    ]);
  });

  test("handles CRLF line endings", () => {
    const input = "a,b\r\nc,d\r\n";
    const result = parseSV(input);
    expect(result).toStrictEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  test("ignores empty lines", () => {
    const input = "a,b\n\nc,d\n\n";
    const result = parseSV(input);
    expect(result).toStrictEqual([
      ["a", "b"],
      ["c", "d"],
    ]);
  });

  test("returns empty array for empty string", () => {
    const input = "";
    const result = parseSV(input);
    expect(result).toStrictEqual([]);
  });

  test("preserves empty fields when consecutive delimiters present", () => {
    const input = "a,,c\n,1,";
    const result = parseSV(input);
    expect(result).toStrictEqual([
      ["a", "", "c"],
      ["", "1", ""],
    ]);
  });

  test("does not trim fields (preserves surrounding whitespace)", () => {
    const input = " a , b \n c ,d ";
    const result = parseSV(input);
    expect(result).toStrictEqual([
      [" a ", " b "],
      [" c ", "d "],
    ]);
  });
});
