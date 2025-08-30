import type { Instructor } from "@/course";
import { isInstructor } from "@/course";
import { BaseParser } from "../core";

export class TeatureNameParser extends BaseParser<string, Instructor[]> {
  parse(input: string) {
    const { result, duration } = this.measureParseTime(() => {
      return input
        .trim()
        .replace(/\[.*?\]/g, "")
        .replace(/[　 ]/g, "")
        .split(",")
        .map((part) => {
          const instructor = { name: part.trim() };
          if (!isInstructor(instructor)) {
            throw new Error(`Invalid instructor format: ${part}`);
          }
          return instructor;
        });
    });
    return this.createParseResult(result, duration);
  }
}
