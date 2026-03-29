"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}): React.ReactNode {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ヘルプ</DialogTitle>
        </DialogHeader>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger className="text-base font-semibold">
              このアプリについて
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                このアプリは、抽選科目の登録状況をわかりやすく可視化するアプリです。
              </p>
              <p>
                Inspired by{" "}
                <Link
                  href="https://kurisyushien.org"
                  className="underline text-blue-600 hover:text-blue-800"
                >
                  risyu
                </Link>
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="how-to-read">
            <AccordionTrigger className="text-base font-semibold">
              見方
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                各講義は、1週間のカレンダーの中に棒グラフのような見た目で配置されています。棒グラフの色分けは左から順に、優先指定、第1希望、第2希望…となっています。グラフ領域に色が塗られていないところがある講義は、その講義の定員に空きがあることを示しています。
              </p>
              <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 mb-2">
                グラフはすべての優先指定が第１希望に指定されているものとして、第１希望数から優先指定数を引いて表示しています。
              </div>
              <Image
                src="/how-to-understand-graph.png"
                alt="棒グラフの例"
                width={600}
                height={400}
                style={{ width: "100%", height: "auto", marginTop: "8px" }}
              />
              <p className="mt-2">
                上の画像だと、デザイン思考入門は第2志望（緑色のところ）で登録しても確実に取れますが、第3希望（ピンクのところ）で登録すると抽選になってリスキーです。逆に画像下の英語学術リテラシー科目は、登録すれば確実に取れます。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="filter">
            <AccordionTrigger className="text-base font-semibold">
              フィルター機能
            </AccordionTrigger>
            <AccordionContent>
              <p>
                フィルター機能を使うことで、表示する講義を絞り込むことができます。フィルターは、時間割画面の「フィルター」ボタンを押すと表示されます。デフォルトは全て表示されていますが、例えば「ＧＳ科目」だけを表示するようにすることもできます。
              </p>
              <Image
                src="/how-to-use-filter.png"
                alt="GS科目だけ表示"
                width={600}
                height={400}
                style={{ width: "100%", height: "auto" }}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="detail">
            <AccordionTrigger className="text-base font-semibold">
              詳細表示
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                講義の棒グラフをクリックすると、その講義の詳細情報を表示することができます。詳細情報には、講義名、時間割番号、科目区分、開講曜日時限、担当教員、登録状況、当選確率、シラバスへのリンクが表示されます。
              </p>
              <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
                当選確率はすべての優先指定が第１希望に指定されているとして計算しています。
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="disclaimer">
            <AccordionTrigger className="text-base font-semibold">
              免責事項
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                このアプリは、大学の公式情報ではなく、個人が作成したものです。情報の正確性を保証するものではありません。講義の登録状況は変更される可能性がありますので、公式の情報に基づいて登録してください。
              </p>
              <p className="mb-2">
                また、本アプリの使用することによる損害について、一切の責任を負いません。
              </p>
              <p className="mb-2">
                ちょっともっさりとした動作をしますが、ご了承ください。
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contribution">
            <AccordionTrigger className="text-base font-semibold">
              貢献
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                このアプリはオープンソースで公開されています。バグの報告や機能追加の提案は、GitHubのissueやPull
                Requestを通じてお願いします。
              </p>
              <p className="mb-3">
                また、このアプリの開発に参加していただける方を募集しています。興味がある方は、GitHubのレポジトリをご覧ください。
              </p>
              <Link
                href="https://github.com/ToYama170402/rishu-app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                レポジトリ
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md px-4 py-2 text-sm font-medium border border-input hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            閉じる
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
