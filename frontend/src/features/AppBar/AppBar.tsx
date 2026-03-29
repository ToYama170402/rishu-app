"use client";

import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { HelpCircle, Menu, X } from "lucide-react";
import HelpDialog from "@/components/HelpDialog/HelpDialog";

const AppBar = ({ children }: { children?: ReactNode }): React.ReactNode => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-primary text-primary-foreground rounded-t">
        <div className="flex items-center justify-between px-4 py-2">
          <Link href="/" className="text-lg font-bold hover:opacity-80">
            rishu-app
          </Link>
          {/* Desktop navigation */}
          <nav className="hidden sm:flex items-center gap-4">
            <Link href="/view" className="text-sm hover:opacity-80">
              view
            </Link>
            <Link href="/builder" className="text-sm hover:opacity-80">
              builder
            </Link>
            {children}
            <button
              onClick={() => setHelpOpen(true)}
              aria-label="ヘルプを開く"
              className="p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </nav>
          {/* Mobile menu button */}
          <button
            onClick={() => setDrawerOpen((open) => !open)}
            aria-label="メニューを開く"
            className="sm:hidden p-1 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded"
          >
            {isDrawerOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
        {/* Mobile drawer */}
        {isDrawerOpen && (
          <div className="sm:hidden border-t border-primary-foreground/20 px-4 py-3 flex flex-col gap-3">
            <Link
              href="/view"
              className="text-sm hover:opacity-80"
              onClick={() => setDrawerOpen(false)}
            >
              view
            </Link>
            <Link
              href="/builder"
              className="text-sm hover:opacity-80"
              onClick={() => setDrawerOpen(false)}
            >
              builder
            </Link>
            <button
              onClick={() => {
                setDrawerOpen(false);
                setHelpOpen(true);
              }}
              className="flex items-center gap-2 text-sm hover:opacity-80 text-left"
            >
              <HelpCircle className="h-4 w-4" />
              ヘルプ
            </button>
            {children && (
              <div className="pt-2 border-t border-primary-foreground/20">
                {children}
              </div>
            )}
          </div>
        )}
      </header>
      <HelpDialog open={isHelpOpen} setOpen={setHelpOpen} />
    </>
  );
};

export default AppBar;
