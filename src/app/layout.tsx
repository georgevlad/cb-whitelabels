import type { Metadata } from "next";
import "@/styles/globals.css";
import ConfigProvider from "../contexts/ConfigContext";
import Layout from "@/components/layout/Layout";
import { headers } from "next/headers";
import { getSiteConfig } from "@/utils/getSiteConfig";

export const metadata: Metadata = {
	title: "Cashback Comparison Platform",
	description:
		"Find the best deals and save money with our comparison platform",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const host = (await headers()).get("host") ?? "localhost";
	const config = getSiteConfig(host.split(":")[0]);

	return (
		<html lang='en'>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin='anonymous'
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap'
					rel='stylesheet'
				/>

				<script
					src='https://js.financeads.net/iframeResizeMe.min.js.gz'
					async
				/>
			</head>
			<body>
				<ConfigProvider config={config}>
					<Layout>{children}</Layout>
				</ConfigProvider>
			</body>
		</html>
	);
}
