"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantsBar from "@/components/ApplicantsBar/ApplicantsBar";
import LectureDetailTable from "./components/LectureDetailTable";

export default function DetailPopup({
  lecture,
  open,
  onClose,
}: {
  lecture: LotteryCourseStatus;
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState("detail");

  /** 全角英数字 → 半角英数字 */
  const normalizeCategory = (s: string) =>
    s.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0xfee0)
    );

  const categoryLabel =
    normalizeCategory(lecture.category) +
    (lecture.category === "ＧＳ科目"
      ? lecture.number.slice(1, 2) + "郡" + lecture.number.slice(2, 3)
      : "");

  const syllabusUrl = `https://eduweb.sta.kanazawa-u.ac.jp/Portal/Public/Syllabus/DetailMain.aspx?student=1&lct_year=${new Date().getFullYear()}&lct_cd=${encodeURIComponent(lecture.number)}&je_cd=1&ActingAccess=1`;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle>{lecture.title}</DialogTitle>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>{lecture.number}</span>
            <span className="text-border">|</span>
            <span>{categoryLabel}</span>
            <span className="text-border">|</span>
            <span>
              {lecture.dateTime.day}
              {lecture.dateTime.period ?? ""}
            </span>
            <span className="text-border">|</span>
            <span>{lecture.teacher.replace(/　/g, " ")}</span>
          </div>
        </DialogHeader>

        <Tabs
          value={tab}
          onValueChange={setTab}
          className="flex min-h-0 flex-1 flex-col"
        >
          <TabsList className="shrink-0">
            <TabsTrigger value="detail">詳細</TabsTrigger>
            <TabsTrigger value="transition">推移</TabsTrigger>
          </TabsList>

          <TabsContent
            value="detail"
            className="mt-2 flex flex-col gap-2 overflow-auto"
          >
            {lecture.applicants.all > 0 && (
              <ApplicantsBar lecture={lecture} base="allApplicants" />
            )}
            <LectureDetailTable lecture={lecture} />
            <p className="text-xs text-muted-foreground">
              ※当選確率はすべての優先指定が第１希望で指定されているものとして計算されています。
            </p>
            <div className="mt-1">
              <a
                href={syllabusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded border px-3 py-1.5 text-sm hover:bg-muted"
              >
                シラバス
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </TabsContent>

          <TabsContent value="transition" className="mt-2">
            開発中
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
