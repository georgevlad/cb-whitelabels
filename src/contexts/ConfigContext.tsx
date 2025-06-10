"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SiteConfig } from "@/types/config";

export const ConfigContext = createContext<SiteConfig | null>(null);

const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadConfig = async () => {
			try {
				// Determine config based on domain
				const domain =
					typeof window !== "undefined"
						? window.location.hostname
						: "localhost";
				const configName = getDomainConfig(domain);

				const response = await fetch(`/api/config/${configName}`);
				if (!response.ok) {
					throw new Error("Failed to load configuration");
				}

				const siteConfig = await response.json();
				setConfig(siteConfig);
			} catch (err) {
				console.error("Failed to load site config:", err);
				setError("Failed to load site configuration");
			} finally {
				setLoading(false);
			}
		};

		loadConfig();
	}, []);

	const getDomainConfig = (domain: string): string => {
		// Map domains to config files
		const domainMap: { [key: string]: string } = {
			"domain1.com": "domain1",
			"domain2.com": "domain2",
			localhost: "domain1", // Default for development
			"127.0.0.1": "domain2",
		};
		return domainMap[domain] || "domain1";
	};

	if (loading) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					fontSize: "18px",
				}}
			>
				Loading...
			</div>
		);
	}

	if (error || !config) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					fontSize: "18px",
					color: "red",
				}}
			>
				{error || "Configuration not found"}
			</div>
		);
	}

	return (
		<ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
	);
};

export default ConfigProvider;

export const useConfig = () => {
	const config = useContext(ConfigContext)!;
	return config;
};
