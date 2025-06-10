import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ibb.co",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "dl.kraken.io",
				port: "",
				pathname: "/**",
			},
			// Add any other image domains you're using
			{
				protocol: "https",
				hostname: "tools.financeads.net",
				port: "",
				pathname: "/**",
			},
		],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
};

export default nextConfig;
