import type { NextConfig } from "next";

// Static export for Cloudflare Pages. `output: "export"` prerenders every route
// to static HTML in `out/` at build time — there is no Node server at runtime,
// which is exactly what Cloudflare Pages serves. `images.unoptimized` is required
// by static export (there is no Image Optimization server). Response security
// headers live in public/_headers (static export can't emit them itself; Pages
// serves _headers from the deployed output).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
