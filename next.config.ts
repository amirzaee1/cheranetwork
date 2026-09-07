import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  basePath: isGitHubPages ? "/cheranetwork" : "",
  assetPrefix: isGitHubPages ? "/cheranetwork/" : undefined,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: isGitHubPages,
  },
};

export default nextConfig;
