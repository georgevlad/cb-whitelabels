'use client'

import { useConfig } from "@/hooks/useConfig";

export default function InfoSection() {
	const config = useConfig().homepage.infoSection;

	function getIconClass(iconPath: string): string {
		if (iconPath.includes("balance")) return "balance";
		if (iconPath.includes("pricetag")) return "pricetag";
		if (iconPath.includes("verified")) return "verified";
		if (iconPath.includes("puzzle")) return "puzzle";
		return "";
	}

	return (
		<div className='flex'>
			<div className='content-image' />
			<div className='content-text flex column align-start'>
				<h3>{config.title}</h3>
				<p>{config.description}</p>
				<div className='flex wrap' id='icon-text-wrapper'>
					{config.features.map((feature, index) => (
						<div key={index} className='icon-text-item flex column align-start'>
							<span className={`icon ${getIconClass(feature.icon)}`} />
							<span>{feature.title}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
