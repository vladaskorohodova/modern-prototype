import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const repo = "modern-prototype";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: "export",          // static export
  basePath: `/${repo}`,      // important for GH Pages
  assetPrefix: `/${repo}/`,  // important for assets
  images: { unoptimized: true }, // required for next/image on export
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
