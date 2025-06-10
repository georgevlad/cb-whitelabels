import type { Metadata } from "next";
import "@/styles/globals.css";
import ConfigProvider from "../contexts/ConfigContext";

export const metadata: Metadata = {
	title: "Cashback Comparison Platform",
	description:
		"Find the best deals and save money with our comparison platform",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
				<ConfigProvider>{children}</ConfigProvider>
			</body>
		</html>
	);
}
