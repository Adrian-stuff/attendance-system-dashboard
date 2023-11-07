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
      <body className="grid-cols-2 gap-1">
        <div className="border-b ">
          <div className="flex flex-col w-max h-13">
            <div className="p-3">
              <h1 className="text-lg font-semibold">
                Punturin SHS Guardian Tracker Dashboard
              </h1>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div>{children}</div>
      </body>
    </html>
  );
}
