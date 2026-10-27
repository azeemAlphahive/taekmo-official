import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TAEKMO Solar",
    short_name: "TAEKMO",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#101217",
    theme_color: "#099c2d",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
