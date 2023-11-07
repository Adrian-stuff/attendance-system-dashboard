import React from "react";

function Sidebar({ children }: { children: any }) {
  return (
    <div className=" bg-white dark:bg-slate-900">
      <aside
        id="sidebar"
        className="fixed left-0 top-0 z-0 h-screen w-64 transition-transform"
        aria-label="Sidebar"
      >
        <div className="flex h-full flex-col overflow-y-auto border-r border-slate-200 bg-white px-3 py-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-10 flex items-center rounded-lg px-3 py-2 text-slate-900 dark:text-white">
            <span className="ml-3 text-base font-semibold">
              Guardian Tracker
            </span>
          </div>
          <ul className="space-y-2 text-sm font-medium">{children}</ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
