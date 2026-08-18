import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const repositoryBasePath = "/price-proposal-tuscany";

const nextConfig: NextConfig = githubPages
  ? {
      output: "export",
      basePath: repositoryBasePath,
      assetPrefix: repositoryBasePath,
      trailingSlash: true,
    }
  : {};

export default nextConfig;
