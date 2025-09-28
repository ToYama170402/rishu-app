import { useLocation } from "@solidjs/router";
import { cn } from "@/libs/cn";
import { createContext, JSX } from "solid-js";

export default function Header(props: { class?: string }) {
  const location = useLocation();
  return (
    <header>
      <nav
        class={cn(
          "w-full bg-white border-b border-slate-200 flex items-center px-4",
          props.class
        )}
      >
        <div class="text-lg font-bold">rishu-view</div>
      </nav>
    </header>
  );
}
