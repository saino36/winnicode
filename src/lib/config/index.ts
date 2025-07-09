import type { Link } from "../types";

export const SITE = {
  title: "Winnicode News",
  description: "Berita dan artikel terkini seputar teknologi, startup, dan bisnis.",
  url: "https://wnnicode.com", // ✅ Ganti dengan domain aslimu atau sementara pakai http://localhost:4321
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 4,
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/categories/teknologi",
    text: "Teknologi",
  },
  {
    href: "/categories/politik",
    text: "Politik",
  },
  {
    href: "/categories/olahraga",
    text: "Olahraga",
  },
  {
    href: "/categories/seni",
    text: "Seni",
  },
  {
    href: "/categories/otomotif",
    text: "Otomotif",
  },
  {
    href: "/categories/ventures",
    text: "Ventures",
  },
  {
    href: "/categories/startups",
    text: "Startups",
  },
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/authors",
    text: "Authors",
  },
];

export const SOCIAL_LINKS: Link[] = [

  {
    href: "httpe://www.t.me",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://twitter.com",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];
