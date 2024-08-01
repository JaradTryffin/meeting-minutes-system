"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LucideIcon, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReusableDialog } from "@/components/ui/ReusableDialog";
import { NewMeeting } from "@/components/meeting/new-meeting";

interface MenuItem {
  name: string;
  icon: React.ReactElement<LucideIcon>;
  href: string;
}

interface SidebarProps {
  companyName: string;
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ companyName, menuItems }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-[700px] flex-col justify-between bg-slate-50 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-[#0e141b] text-base font-medium leading-normal">
          {companyName}
        </h1>
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 ${
                pathname === item.href ? "rounded-xl bg-[#e7edf3]" : ""
              }`}
            >
              <div className="text-[#0e141b]">{item.icon}</div>
              <p className="text-[#0e141b] text-sm font-medium leading-normal">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <ReusableDialog
          buttonText="New Meeting"
          title="Create new meeting."
          description="create meeting for relevant team"
        >
          <NewMeeting />
        </ReusableDialog>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <Building size={24} className="text-[#0e141b]" />
            <p className="text-[#0e141b] text-sm font-medium leading-normal">
              {companyName}
            </p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2">
            <User size={24} className="text-[#0e141b]" />
            <p className="text-[#0e141b] text-sm font-medium leading-normal">
              Personal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
