import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "@/components/Nav";
import "./app.css";
import { SideBarProvider } from "@/components/Nav";

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <header>
            <Nav class="h-[44px]" />
          </header>
          <SideBarProvider>
            <main class="h-[calc(100vh-44px)] w-full">
              <Suspense>{props.children}</Suspense>
            </main>
          </SideBarProvider>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
