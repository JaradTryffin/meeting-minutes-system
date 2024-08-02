import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import {
  LayoutPanelTop,
  Video,
  UserRound,
  ClipboardPlus,
  ListTodo,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jarad Co. Dashboard",
  description: "Dashboard for Jarad Co.",
  icons: "./01.png",
};

const menuItems = [
  { name: "Overview", icon: <LayoutPanelTop size={24} />, href: "/" },
  { name: "Meeting List", icon: <Video size={24} />, href: "/meeting-list" },
  {
    name: "Meeting Items",
    icon: <ListTodo size={24} />,
    href: "/meeting-items",
  },
  { name: "Member List", icon: <UserRound size={24} />, href: "/members-list" },
  { name: "Reports", icon: <ClipboardPlus size={24} />, href: "/reports" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row min-h-screen">
          <aside className="w-80 flex-shrink-0">
            <Sidebar companyName="Jarad Co." menuItems={menuItems} />
          </aside>
          <main className="flex-grow p-6">{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
