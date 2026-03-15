import type { NextConfig } from "next";

/** Конфиг для кастомного домена (bymovie.studio): без basePath, иначе 404 на /repository/... */
const nextConfig: NextConfig = {
  output: "export",
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vfq5uwwui8otjfkn.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
