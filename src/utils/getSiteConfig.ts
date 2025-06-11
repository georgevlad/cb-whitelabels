import { SiteConfig } from "@/types/config";
import path from "path";
import fs from "fs";

const DOMAIN_MAP: Record<string, string> = {
	"domain1.com": "domain1",
	"domain2.com": "domain2",
	localhost: "domain1",
	"127.0.0.1": "domain2",
};

export function getConfigNameForDomain(domain: string): string {
	return DOMAIN_MAP[domain] || "domain1";
}

export function getSiteConfig(domain: string): SiteConfig {
	const configName = getConfigNameForDomain(domain);
	const configPath = path.join(
		process.cwd(),
		"src",
		"config",
		`${configName}.json`
	);
	const configData = fs.readFileSync(configPath, "utf8");
	const config = JSON.parse(configData);
	return config;
}
