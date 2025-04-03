import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconDeviceGamepad,
  IconDeviceGamepad2,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { Button } from "./ui/button";

// jotai useAtom with local storage
export const urlAtom = atomWithStorage("url", "https://api.lucky88vip.one/");

const data = {
  user: {
    name: "Developer",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Game Log",
      url: "/game-log",
      icon: IconDeviceGamepad,
    },
    {
      title: "Game Launch Log",
      url: "/game-launch-log",
      icon: IconDeviceGamepad2,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    //{
    //  title: "Team",
    //  url: "#",
    //  icon: IconUsers,
    //},
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [url, setUrl] = useAtom(urlAtom);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  Developer Portal
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {
          //  <NavDocuments items={data.documents} />
          //<NavSecondary items={data.navSecondary} className="mt-auto" />
        }
      </SidebarContent>
      <SidebarFooter>
        <div className="flex gap-1">
          <Button
            className="p-2"
            onClick={() => {
              setUrl("https://api.i9myr.com");
            }}
          >
            Production
          </Button>
          <Button
            className="p-2"
            onClick={() => {
              setUrl("https://api.lucky88vip.one");
            }}
          >
            Staging
          </Button>
          <Button
            className="p-2"
            onClick={() => {
              setUrl("http://localhost:3003");
            }}
          >
            Local
          </Button>
        </div>
        <div>
          <Label>URL</Label>
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>

        {
          //<NavUser user={data.user} />
        }
      </SidebarFooter>
    </Sidebar>
  );
}
