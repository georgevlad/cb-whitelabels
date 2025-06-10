// src/components/common/IframeEmbed.tsx
"use client";

import { useEffect, useRef } from "react";
import { useConfig } from "@/contexts/ConfigContext";

export default function IframeEmbed() {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const config = useConfig().iframes;

	useEffect(() => {
		const handleLoad = () => {
			// Initialize iframe resizing if the script is loaded
			if (
				typeof window !== "undefined" &&
				(window as any).fa_iframeresize &&
				iframeRef.current
			) {
				(window as any).fa_iframeresize.do(iframeRef.current);
			}
		};

		const iframe = iframeRef.current;
		if (iframe) {
			iframe.addEventListener("load", handleLoad);
			return () => iframe.removeEventListener("load", handleLoad);
		}
	}, []);

	return (
		<iframe
			ref={iframeRef}
			src={config.src}
			scrolling={config.scrolling || "no"}
			width={config.width || "650"}
			height={config.height || "890"}
			style={{
				width: "100%",
				padding: 0,
				margin: 0,
				border: 0,
			}}
			frameBorder='0'
		/>
	);
}
