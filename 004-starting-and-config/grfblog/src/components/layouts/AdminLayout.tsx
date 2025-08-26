"use client";

import { usePathname, useRouter } from "@/lib/navigation";
import { useBlogAdminStore } from "@/stores/blogAdminStore";
import { BlogWithUsers } from "@/types/Blog";
import { Layout, MenuProps } from "antd";
import { User } from "next-auth";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  blog: BlogWithUsers;
  user: User;
};

const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children, blog, user }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRestricted, setIsRestricted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Layout");
  const { blogs, setBlog, setBlogSelected } = useBlogAdminStore();

  const handleCollapse = () => setIsCollapsed(() => !isCollapsed);

  const formattedPathname = `/${pathname.split("/").slice(2).join("/")}`;

  const handleChangeBlog = (slug: string) => {
    router.replace(`/${slug}/${formattedPathname}`);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => router.push(`/${blog.slug}/admin`),
    },
  ];
};
