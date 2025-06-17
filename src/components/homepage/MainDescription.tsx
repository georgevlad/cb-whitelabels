'use client'

import { useConfig } from "@/hooks/useConfig";

export default function MainDescription() {
	const config = useConfig().homepage.mainDescription;

	return (
		<div className='flex column justify-center align-center'>
			<div className='content-text'>
				<h2>{config.title}</h2>
				<p>{config.description}</p>
			</div>
		</div>
	);
}