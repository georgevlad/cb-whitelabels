// src/hooks/useConfig.ts
"use client";

import { useState, useEffect } from "react";
import { SiteConfig } from "@/types/config";
import { ConfigLoader } from "@/utils/configLoader";

export function useConfig2() {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadConfig = async () => {
			try {
				setLoading(true);
				const domain =
					typeof window !== "undefined"
						? window.location.hostname
						: "localhost";
				const siteConfig = await ConfigLoader.loadConfig(domain);
				setConfig(siteConfig);
				setError(null);
			} catch (err) {
				console.error("Failed to load site config:", err);
				setError("Failed to load site configuration");
			} finally {
				setLoading(false);
			}
		};

		loadConfig();
	}, []);

	return { config, loading, error };
}
