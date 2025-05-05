import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  images: {
    domains: ['www.trendwisata.com', 'sekolahgurupemimpin.s3.ap-southeast-1.amazonaws.com', 'tottong.desa.id'], 
  },
};

export default withFlowbiteReact(nextConfig);