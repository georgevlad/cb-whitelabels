import Button from "@/components/common/Button";
import { useConfig } from "@/contexts/ConfigContext";

export default function FillSection() {
	const config = useConfig().homepage.fillSection;

	function getImageId(index: number): string {
		const imageIds = [
			"low-interest",
			"affordable-insurance",
			"third-insurance",
		];
		return imageIds[index] || "";
	}

	return (
		<>
			{config.items.map((item, index) => (
				<div key={index} className='flex align-center justify-between'>
					<div className='content-text flex column align-start'>
						<h5>{item.title}</h5>
						<p>{item.description}</p>
						<Button variant='outline'>{item.buttonText}</Button>
					</div>
					<div
						className={`content-image ${getImageId(index)}`}
						id={getImageId(index)}
					/>
				</div>
			))}
		</>
	);
}
