"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useConfig } from "@/hooks/useConfig";

const MobileHeader = () => {
	const config = useConfig();
	const branding = config.branding;
	const [openMenu, setOpenMenu] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setOpenMenu(false);
	}, [pathname]);

	return (
		<header className='nav-header' id='mobileHeader'>
			<Link href='/'>
				<Image
					src={branding.logo}
					alt={branding.companyName}
					width={120}
					height={30}
					className='header-logo'
				/>
			</Link>
			<Menu onClick={() => setOpenMenu(true)} />

			{openMenu && <MobileMenu onClose={() => setOpenMenu(false)} />}
		</header>
	);
};

export default MobileHeader;
