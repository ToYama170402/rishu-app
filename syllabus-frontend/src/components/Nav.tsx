import { useLocation } from "@solidjs/router";
import { cn } from "@/libs/cn";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createContext, createSignal, JSX, useContext } from "solid-js";

type SideBarStore = [
  {
    sideBarContent: () => JSX.Element;
    setSideBarContent: (content: JSX.Element) => void;
  },
  { sideBarTitle: () => string; setSideBarTitle: (title: string) => void }
];

const sideBarContext = createContext<SideBarStore>();

export default function Nav(props: { class?: string }) {
  const location = useLocation();
  const sideBarStore = useContext(sideBarContext);
  return (
    <nav
      class={cn(
        "w-full bg-white border-b border-slate-200 flex items-center px-4",
        props.class
      )}
    >
      <div class="text-lg font-bold">rishu-view</div>
      <Sheet>
        <SheetTrigger class="ml-auto">Open</SheetTrigger>
        <SheetContent class="bg-white">
          <SheetHeader>
            <SheetTitle>{sideBarStore?.[1].sideBarTitle()}</SheetTitle>
            <SheetDescription>
              {sideBarStore?.[0].sideBarContent()}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export function SideBarProvider(props: { children: JSX.Element }) {
  const [sideBarContent, setSideBarContent] = createSignal<JSX.Element>();
  const [sideBarTitle, setSideBarTitle] = createSignal<string>("");
  const store: SideBarStore = [
    { sideBarContent, setSideBarContent },
    { sideBarTitle, setSideBarTitle },
  ];
  return (
    <sideBarContext.Provider value={store}>
      {props.children}
    </sideBarContext.Provider>
  );
}
