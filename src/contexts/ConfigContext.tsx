"use client";

import { createContext } from "react";
import { SiteConfig } from "@/types/config";

export const ConfigContext = createContext<SiteConfig | null>(null);

const ConfigProvider = ({
	config,
	children,
}: {
	config: SiteConfig;
	children: React.ReactNode;
}) => {
	return <ConfigContext value={config}>{children}</ConfigContext>;
};

export default ConfigProvider;
