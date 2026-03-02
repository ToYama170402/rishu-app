import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Header from "@/components/Header";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Header class="h-[44px]" />
          <main class="h-[calc(100dvh-44px)] w-full">
            <Suspense>{props.children}</Suspense>
          </main>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
