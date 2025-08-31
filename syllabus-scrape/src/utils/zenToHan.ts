export function zenToHan(input: string): string {
  // 全角英数字・記号
  const replaced = input.replace(/[\uFF01-\uFF5E]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
  });
  // 全角スペース
  return (
    replaced
      .replace(/\u3000/g, " ")
      // 波ダッシュ（〜）→ チルダ（~）
      .replace(/\u301C/g, "~")
  );
}
