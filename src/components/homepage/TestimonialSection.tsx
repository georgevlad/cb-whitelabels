"use client";

import Image from "next/image";
import { useConfig } from "@/hooks/useConfig";

export default function TestimonialSection() {
	const config = useConfig().homepage.testimonials;

	return (
		<div className='testimonial-section'>
			<h2>{config.title}</h2>
			<div className='testimonial-grid'>
				{config.testimonials.map((testimonial, index) => (
					<div
						key={index}
						className={`testimonial-card ${testimonial.bgColor} ${
							testimonial.span ? "span-2" : ""
						}`}
					>
						<div className='user'>
							<Image
								src={testimonial.avatar}
								alt={testimonial.name}
								width={150}
								height={150}
							/>
							<h4>{testimonial.name}</h4>
							<small>{testimonial.location}</small>
						</div>

						<div className='quote'>
							<span className='quote-icon'>
								<Image
									src='/img/icons/quotes.png'
									alt='Quote'
									width={24}
									height={24}
								/>
							</span>
							<p>{testimonial.quote}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
