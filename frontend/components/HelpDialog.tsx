import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import exampleGraphImage from "/public/how-to-understand-graph.png";
import usingFilter from "/public/how-to-use-filter.png";
import { GitHub, ExpandMore, Settings } from "@mui/icons-material";
export default function HelpDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}): React.ReactNode {
  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>ヘルプ</DialogTitle>
        <DialogContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                このアプリについて
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                このアプリは、抽選科目の登録状況をわかりやすく可視化するアプリです。
              </Typography>
              <Typography component={"p"} variant="body1">
                Inspired by <Link href="https://kurisyushien.org">risyu</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                見方
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                各講義は、1週間のカレンダーの中に棒グラフのような見た目で配置されています。棒グラフの色分けは左から順に、優先指定、第1希望、第2希望…となっています。グラフ領域に色が塗られていないところがある講義は、その講義の定員に空きがあることを示しています。
              </Typography>
              <Alert severity="warning">
                グラフはすべての優先指定が第１希望に指定されているものとして、第１希望数から優先指定数を引いて表示しています。
              </Alert>
              <Image
                src={exampleGraphImage}
                alt="棒グラフの例"
                style={{ width: "100%", height: "auto", marginTop: "8px" }}
              />
              <Typography component={"p"} variant="body1">
                上の画像だと、デザイン思考入門は第2志望（緑色のところ）で登録しても確実に取れますが、第3希望（ピンクのところ）で登録すると抽選になってリスキーです。逆に画像下の英語学術リテラシー科目は、登録すれば確実に取れます。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                フィルター機能
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                フィルター機能を使うことで、表示する講義を絞り込むことができます。フィルターは、PCなら左上、スマホなら左下のメニューボタンを押すと表示されます。デフォルトは全て表示されていますが、例えば「ＧＳ科目」だけを表示するようにすることもできます。
                <Image
                  src={usingFilter}
                  alt="GS科目だけ表示"
                  style={{ width: "100%", height: "auto" }}
                />
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                詳細表示
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                講義の棒グラフをクリックすると、その講義の詳細情報を表示することができます。詳細情報には、講義名、時間割番号、科目区分、開講曜日時限、担当教員、登録状況、当選確率、シラバスへのリンクが表示されます。
              </Typography>
              <Alert severity="warning">
                当選確率はすべての優先指定が第１希望に指定されているとして計算しています。
              </Alert>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                免責事項
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                このアプリは、大学の公式情報ではなく、個人が作成したものです。情報の正確性を保証するものではありません。講義の登録状況は変更される可能性がありますので、公式の情報に基づいて登録してください。
              </Typography>
              <Typography component={"p"} variant="body1">
                また、本アプリの使用したことによる損害について、一切の責任を負いません。
              </Typography>
              <Typography component={"p"} variant="body1">
                ちょっともっさりとした動作をしますが、ご了承ください。
              </Typography>
              <Typography component={"p"} variant="body1">
                設定アイコン
                <Settings />
                はまだ機能しません。
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography component={"h2"} variant="h6">
                貢献
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component={"p"} variant="body1">
                このアプリはオープンソースで公開されています。バグの報告や機能追加の提案は、GitHubのissueやPull
                Requestを通じてお願いします。
              </Typography>
              <Typography component={"p"} variant="body1">
                また、このアプリの開発に参加していただける方を募集しています。興味がある方は、GitHubのレポジトリをご覧ください。
              </Typography>
              <Button
                startIcon={<GitHub />}
                variant="outlined"
                sx={{ marginLeft: "auto" }}
                href="https://github.com/ToYama170402/rishu-app"
              >
                レポジトリ
              </Button>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
