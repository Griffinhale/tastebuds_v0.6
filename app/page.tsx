"use client";

import { SelectedPageProvider, useSelectedPage } from "./context/SelectedPageContext";
import Header from "./components/all/Header";
import CB_Homepage from "./components/homepage/CB_Homepage";
import CB_Library from "./components/library/CB_Library";
import CB_Search from "./components/search/CB_Search";
import CB_Detail from "./components/detail/CB_ItemDetail";
import CB_Platters from "./components/platters/CB_Platters";

export default function Home() {
  return (
    <SelectedPageProvider>
      <MainPageContent />
    </SelectedPageProvider>
  );
}

// Separate component to keep things organized
function MainPageContent() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20">
      <Header />
      <MainContentArea />
      <footer className="flex flex-wrap items-center justify-center gap-6">
        Tastebuds
      </footer>
    </div>
  );
}

function MainContentArea() {
  const { selectedPage } = useSelectedPage();

  let RenderedContent;
  switch (selectedPage) {
    case "library":
      RenderedContent = <CB_Library />;
      break;
    case "platters":
      RenderedContent = <CB_Platters />;
      break;
    case "search":
      RenderedContent = <CB_Search />;
      break;
    case "random":
      RenderedContent = <CB_Detail />;
      break;
    default:
      RenderedContent = <CB_Homepage />;
      break;
  }

  return (
    <main className="w-full h-full bg-slate-200">
      {RenderedContent}
    </main>
  );
}