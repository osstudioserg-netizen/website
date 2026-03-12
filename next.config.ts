import type { NextConfig } from "next";

// На GitHub Pages сайт отдаётся из подпапки репозитория (например /website/).
// basePath и assetPrefix задаются в workflow через NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPrefix = basePath ? `${basePath}/` : undefined;

const nextConfig: NextConfig = {
  basePath,
  ...(assetPrefix && { assetPrefix }),
  reactCompiler: true,

  images: {
    unoptimized: true, // для статического экспорта на GitHub Pages
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vfq5uwwui8otjfkn.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
