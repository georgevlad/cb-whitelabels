'use client'

import { useConfig } from "@/hooks/useConfig";

export default function ColoredSection() {
	const config = useConfig().homepage.coloredSection;

	return (
		<div className='flex column justify-center align-center'>
			<div className='content-text'>
				<h2>{config.title}</h2>
				<p>{config.description}</p>
			</div>
			<div className='content-image flex align-center justify-center wrap'>
				{config.items.map((item, index) => (
					<div key={index} className='content-image-item flex column'>
						<img src={item.image} alt={item.title} />
						<div className='content-text'>
							<h3>{item.title}</h3>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
