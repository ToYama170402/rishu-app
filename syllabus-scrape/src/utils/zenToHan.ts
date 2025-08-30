export function zenToHan(input: string): string {
  return input.replace(/[\u3000-\u303F]/g, (char) => {
    const code = char.charCodeAt(0);
    // Convert full-width characters to half-width
    return String.fromCharCode(code - 0xfee0);
  });
}
