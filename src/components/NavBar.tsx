"use client";
import {
  GitPullRequestArrow,
  User2,
  LucideIcon,
  FolderCode,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

type links = {
  title: string;
  url: string;
  icon: LucideIcon;
};

import avatar from "@/assets/image.png";
import Image from "next/image";

function NavBar() {
  const links: links[] = [
    {
      title: "About",
      url: "/",
      icon: User2,
    },

    {
      title: "Skills",
      url: "/skills",
      icon: GitPullRequestArrow,
    },
    {
      title: "Projects",
      url: "/projects",
      icon: FolderCode,
    },

    {
      title: "Message",
      url: "/message",
      icon: MessageCircle,
    },
  ];

  return (
    <nav>
      <div>
        <Image
          src={avatar}
          alt="avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
      <div className="flex justify-center items-center gap-10">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.url}
              className="flex items-center justify-center gap-1 text-white"
              href={item.url}
            >
              <Icon />
              {item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default NavBar;
