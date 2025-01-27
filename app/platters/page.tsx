"use client";

import CB_Platters from "../components/platters/CB_Platters";

export default function Platters() {
  return (
    <MainPageContent />
  );
}

// Separate component to keep things organized
function MainPageContent() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-16 p-8 sm:p-20">
      <MainContentArea />
      <footer className="flex flex-wrap items-center justify-center gap-6">
        Tastebuds
      </footer>
    </div>
  );
}

function MainContentArea() {
  return (
    <main className="w-full h-full bg-slate-200">
      <CB_Platters />
    </main>
  );
}