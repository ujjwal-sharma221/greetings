"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg";
import { Separator } from "@/components/ui/separator";
import TextHighlighter from "@/components/text-highlighter";
import { DashboardUserButton } from "./dashboard-user-button";
import { AnimatedClapIcon } from "@/components/animated-icons/video-icon";
import { AnimatedSmileIcon } from "@/components/animated-icons/smile-icon";
import { AnimatedArrowBigUpDashIcon } from "@/components/animated-icons/arrow-big-up-dash-icon";

const firstSection = [
  {
    icon: AnimatedClapIcon,
    label: "Meetings",
    href: "/meetings",
  },
  {
    icon: AnimatedSmileIcon,
    label: "Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: AnimatedArrowBigUpDashIcon,
    label: "Upgrade",
    href: "/upgrade",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  // const pathname = "/meetings";

  const transition = { type: "spring", duration: 1, delay: 0.4, bounce: 0 };
  const highlightClass = "rounded-[0.3em] px-px";
  const highlightColor = "#F2AD91";
  const inViewOptions = { once: true, initial: true, amount: 0.1 };

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src={Logo} alt="logo" height={30} width={30} />
          <p className="text-2xl font-semibold">Greetings</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="" />
      </div>

      <SidebarContent className="">
        <SidebarGroup>
          <SidebarMenu>
            {firstSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  className={cn(
                    "h-10 border border-transparent hover:bg-linear-to-r/oklch",
                    pathname === item.href &&
                      "hover:border hover:border-black hover:bg-white",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon size={22} />
                    <span className="text-sm font-medium tracking-tight">
                      {pathname === item.href ? (
                        <TextHighlighter
                          className={highlightClass}
                          transition={transition}
                          highlightColor={highlightColor}
                          useInViewOptions={inViewOptions}
                        >
                          {item.label}
                        </TextHighlighter>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="px-4 py-2">
          <Separator className="" />
        </div>

        <SidebarGroup>
          <SidebarMenu>
            {secondSection.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  className={cn(
                    "h-10 border border-transparent hover:bg-linear-to-r/oklch",
                    pathname === item.href &&
                      "hover:border hover:border-black hover:bg-white",
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon size={22} />
                    <span className="text-sm font-medium tracking-tight">
                      {pathname === item.href ? (
                        <TextHighlighter
                          className={highlightClass}
                          transition={transition}
                          highlightColor={highlightColor}
                          useInViewOptions={inViewOptions}
                        >
                          {item.label}
                        </TextHighlighter>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
