import Link from "next/link";
import { useConfig } from "@/contexts/ConfigContext";
import Button from "../common/Button";

export default function Footer() {
	const config = useConfig().footer;

	return (
		<footer id='footer'>
			<div className='footer-top'>
				<div className='flex column'>
					<ul className='footer-menu'>
						{config.links.map((link, index) => (
							<li key={index}>
								<Link href={link.href}>{link.label}</Link>
							</li>
						))}
					</ul>
					<div className='footer-social'>
						{config.social.map((social, index) => (
							<Link key={index} href={social.href}>
								<img src={social.icon} alt={social.platform} />
							</Link>
						))}
					</div>
				</div>

				<div className='flex column cta-box'>
					<p>{config.newsletter.title}</p>
					<div className='flex'>
						<input
							type='email'
							placeholder={config.newsletter.placeholder}
							className='newsletter-input'
						/>
						<Button type='submit'>Subscribe</Button>
					</div>
				</div>
			</div>

			<div className='footer-bottom'>
				<div>
					<span>{config.copyright}</span>
				</div>
				<div>
					{config.legal.map((link, index) => (
						<Link key={index} href={link.href}>
							{link.label}
						</Link>
					))}
				</div>
			</div>
		</footer>
	);
}
