"use client";

import { ConfigContext } from "@/contexts/ConfigContext";
import { use } from "react";

export const useConfig = () => {
	const config = use(ConfigContext)!;
	if (!config) throw new Error("Config is missing");
	return config;
};
