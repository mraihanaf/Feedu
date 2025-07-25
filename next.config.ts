import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        domains: ["localhost"],
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "9000",
                pathname: "/notes/**",
            },
        ],
    },
}

export default nextConfig
