import { A, useLocation } from "@solidjs/router";
import { cn } from "@/libs/cn";
import { createContext, JSX } from "solid-js";

export default function Header(props: { class?: string }) {
  const location = useLocation();
  return (
    <header>
      <nav
        class={cn(
          "w-full border-b border-slate-200 flex items-center px-4",
          props.class
        )}
      >
        <A href="/" class="text-lg font-bold">
          rishu-app
        </A>
        <div class="ml-auto flex gap-4">
          <A href="/view">view</A>
          <A href="/builder">builder</A>
        </div>
      </nav>
    </header>
  );
}
