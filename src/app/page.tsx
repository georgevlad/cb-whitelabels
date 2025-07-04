import Banner from "@/components/homepage/Banner";
import InfoSection from "@/components/homepage/InfoSection";
import ColoredSection from "@/components/homepage/ColoredSection";
import FillSection from "@/components/homepage/FillSection";
import TestimonialSection from "@/components/homepage/TestimonialSection";
import ResourcesSection from "@/components/homepage/ResourcesSection";
import MainDescription from "@/components/homepage/MainDescription";

export default function HomePage() {
	return (
		<div id='wrapper' className='homepage'>
			<Banner />

			<section className='content-area'>
				<div className='content-item' id='item-main-description'>
					<MainDescription />
				</div>

				<div className='content-item' id='item-info'>
					<InfoSection />
				</div>

				<div className='content-item' id='item-colored'>
					<ColoredSection />
				</div>

				<div className='content-item' id='item-fill'>
					<FillSection />
				</div>

				<div className='content-item' id='item-masonry'>
					<TestimonialSection />
				</div>

				<div className='content-item' id='item-banner'>
					<ResourcesSection />
				</div>
			</section>
		</div>
	);
}
