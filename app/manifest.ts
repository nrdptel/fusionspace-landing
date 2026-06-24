import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Web app manifest — lets the site be installed / "added to home screen" with a
// proper name, icon, and themed splash instead of a bare screenshot.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fusion Space",
    short_name: "Fusion Space",
    description:
      "Free, polished tools for the high-power rocketry community.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
