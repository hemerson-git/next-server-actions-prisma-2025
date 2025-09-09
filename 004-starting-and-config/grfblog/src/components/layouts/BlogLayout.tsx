"use client";

import { Layout } from "antd";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import Logo from "@/assets/imgs/logo.svg";
import { LocaleDropdown } from "./LocaleDropdown";
import { ToggleTheme } from "./ToggleTheme";
import { Blog } from "@prisma/client";
import { useBlogStore } from "@/stores/blogStore";

const { Header, Content } = Layout;

type BlogLayoutProps = {
  children: ReactNode;
  blog: Blog;
};

export const BlogLayout = ({ children, blog }: BlogLayoutProps) => {
  const { setBlog } = useBlogStore();

  useEffect(() => {
    setBlog(blog);
  }, [setBlog, blog]);

  return (
    <Layout className="h-screen overflow-hidden">
      <Header
        className="
          flex justify-between bg-white dark:bg-slate-950 border-b 
          border-slate-200 dark:border-b-zinc-800
        "
      >
        <div className="flex items-center justify-between container px-8">
          <Link href={`/${blog.slug}`}>
            <Image
              src={Logo}
              alt="Logo - GRF Blog"
              width={150}
              priority
            ></Image>
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <LocaleDropdown />
          <ToggleTheme />
        </div>
      </Header>
      <Content>
        <div className="size-full flex items-center justify-center overflow-auto container px-8 mx-auto">
          {children}
        </div>
      </Content>
    </Layout>
  );
};
