"use client";

import { ConfigContext } from "@/contexts/ConfigContext";
import { useContext } from "react";

export const useConfig = () => {
	const config = useContext(ConfigContext)!;
	if (!config) throw new Error("Config is missing");
	return config;
};
