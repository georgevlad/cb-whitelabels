import Link from "next/link";
import Image from "next/image";
import { useConfig } from "@/contexts/ConfigContext";
import { usePathname } from "next/navigation";

export default function Header() {
	const config = useConfig();
	const branding = config.branding;
	const headerConfig = config.header;
	const path = usePathname();

	return (
		<header id='header'>
			<div className='flex'>
				<Link href='/'>
					<Image
						src={branding.logo}
						alt={branding.companyName}
						width={120}
						height={30}
						className='header-logo'
					/>
				</Link>
				<ul className='flex'>
					{headerConfig.navigation.map((item, index) => (
						<li key={index} className={path === item.href ? "highlight" : ""}>
							<Link href={item.href}>{item.label}</Link>
						</li>
					))}
				</ul>
			</div>
			<div>
				<Link className='btn' href={headerConfig.ctaButton.href}>
					{headerConfig.ctaButton.text}
				</Link>
			</div>
		</header>
	);
}
