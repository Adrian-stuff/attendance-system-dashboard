import Link from "next/link";
import React from "react";

const SidebarItem = ({ href, text }: { href: string; text: string }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-700"
      >
        <span className="ml-3 flex-1 whitespace-nowrap">{text}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
