"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Sidebar from "@/components/ui/sidebar";
import SidebarItem from "@/components/ui/sidebarItem";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="border-b ">
          <div className="flex flex-col w-max h-13">
            <div className="px-3 py-4">
              <h1 className="text-lg text-center font-semibold sm:text-md">
                Punturin SHS Guardian Tracker Dashboard
              </h1>
            </div>
          </div>
        </div>

        <div>{children}</div>
      </body>
    </html>
  );
}
