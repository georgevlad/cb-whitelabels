'use client'

import { useConfig } from "@/hooks/useConfig";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

export default function Banner() {
	const config = useConfig().homepage.banner;

	return (
		<div className='banner large'>
			<div className='banner-image'></div>
			<div className='banner-text'>
				<div>
					<h1>Unlocking smarter choices and bigger savings for everyone</h1>
					<p>
						Find the most reliable and cost-effective SIM-only deals, energy
						plans, insurance, mobile subscriptions, and fuel savings—free,
						secure, and packed with exclusive offers.
					</p>

					<p style={{ color: 'red' }}>
						TODO: let's see how we can add links to <a href="https://whitelabels.gvs.plus/category/versicherungen">categories </a>  or 
 <a href="https://whitelabels.gvs.plus/embed/kfz-versicherung"> actual services pages </a> 

				</p>
				</div>
			</div>

			<div className='banner-cards'>
				{config.cards.map((card, index) => (
					<Link key={index} href={card.href} className={`card ${card.type}`}>
						<span className='icon'></span>
						<span className='label'>{card.label}</span>
						<span className='arrow' />
					</Link>
				))}
			</div>
		</div>
	);
}
