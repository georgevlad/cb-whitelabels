import Link from "next/link";
import Button from "@/components/common/Button";
import { useConfig } from "@/contexts/ConfigContext";

export default function ResourcesSection() {
	const config = useConfig().homepage.resources;

	return (
		<div className='banner large'>
			<div className='banner-text'>
				<h2>{config.title}</h2>
			</div>

			<div className='banner-cards'>
				{config.resources.map((resource, index) => (
					<Link key={index} href={resource.href} className='card'>
						<span className='content-image' id={getImageId(index)} />
						<span className='label'>{resource.title}</span>
						<span className='info'>
							<span className='date'>{resource.date}</span>⋅
							<span className='duration'>{resource.duration}</span>
						</span>
						<span className='detail-text'>{resource.description}</span>
						<Button className='button icon'>
							<span>Read full article</span>
							<span className='arrow' />
						</Button>
					</Link>
				))}
			</div>

			<Button className='mt-30'>{config.ctaText}</Button>

			<div className='banner small blue'>
				<div className='flex align-center justify-between'>
					<div className='banner-text'>
						<p>{config.helpSection.title}</p>
						<span>{config.helpSection.description}</span>
					</div>
					<div>
						<button className='banner-button'>
							{config.helpSection.buttonText}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

function getImageId(index: number): string {
	const imageIds = ["money-image", "clock-image", "euro-image"];
	return imageIds[index] || "";
}
