"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useConfig } from "@/hooks/useConfig";
import CategoryMenu from "./CategoryMenu";

const DesktopHeader = () => {
	const config = useConfig();
	const path = usePathname();
	const branding = config.branding;
	const headerConfig = config.header;

	return (
		<header className='nav-header'>
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
					{headerConfig.navigation.map((item) => (
						<li
							key={item.href}
							className={
								path === item.href ||
								(item.href === "/category" && path.startsWith("/category/"))
									? "highlight"
									: ""
							}
						>
							<Link
								href={item.href}
								id={item.href === "/category" ? "categoryLink" : ""}
							>
								{item.label}
							</Link>
							{item.href === "/category" && <CategoryMenu />}
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
};

export default DesktopHeader;
