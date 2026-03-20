import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import { assetPrefix, basePath } from './site-config.mjs';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: "export",          // static export
  trailingSlash: true,        // improves static hosting navigation (e.g., GH Pages)
  basePath,                  // important for GH Pages
  assetPrefix,               // important for assets
  images: { unoptimized: true }, // required for next/image on export
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withMDX(nextConfig);
