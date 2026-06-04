"use client";

import {
  GitPullRequestArrow,
  LucideIcon,
  FolderCode,
  MessageCircle,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import avatar from "@/assets/image.png";
import { usePathname } from "next/navigation";

type links = {
  title: string;
  url: string;
  icon: LucideIcon;
};

function NavBar() {
  const links: links[] = [
    { title: "Skills", url: "/skills", icon: GitPullRequestArrow },
    { title: "Projects", url: "/projects", icon: FolderCode },
    { title: "Message", url: "/messages", icon: MessageCircle },
  ];

  const pathname = usePathname();

  return (
    <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
      {/* DOCK */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg ">
        {/* Avatar */}
        <Link href={"/"} className="mr-2">
          <Image
            src={avatar}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full border border-white/20"
          />
          <span
            className={`
                    absolute -top-5
                    text-xs text-white
                    opacity-0 group-hover:opacity-100
                    transition
                    whitespace-nowrap
                      ${pathname === "/" ? "opacity-100" : ""}
                  `}
          >
            {"About"}
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-2">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.url}
                href={item.url}
                className={`
                  group relative
                  flex items-center justify-center
                  w-10 h-10
                  rounded-xl
                  transition
                  hover:scale-110
                  ${pathname === item.url ? "bg-white/20 scale-90" : ""}
                `}
              >
                <Icon className="text-white" size={20} />

                {/* tooltip */}
                <span
                  className={`
                    absolute -top-7
                    text-xs text-white
                    opacity-0 group-hover:opacity-100
                    transition
                    whitespace-nowrap
                      ${pathname === item.url ? "opacity-100" : ""}
                  `}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
