"use client";

import React, { FC, useEffect, useState } from "react";
import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll";
import Link from "next/link";
import { useConfig } from "@/hooks/useConfig";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import CategoryMenu from "./CategoryMenu";

interface IMobileMenu {
	onClose: () => void;
}

const MobileMenu: FC<IMobileMenu> = ({ onClose }) => {
	useDisableBodyScroll();
	const path = usePathname();
	const config = useConfig();
	const headerConfig = config.header;
	const [showCategories, setShowCategories] = useState(false);

	useEffect(() => {
		if (path) {
			setShowCategories(path.startsWith("/category/"));
		}
	}, [path]);

	return (
		<div className={"mobileMenu"}>
			<X onClick={onClose} id={"close"} />
			<div className='mobileMenuLinks'>
				{headerConfig.navigation.map((item) => (
					<>
						<Link
							key={item.href}
							href={item.href}
							id={item.href === "/category" ? "categoryLink" : ""}
							className={
								path === item.href ||
								(item.href === "/category" && path.startsWith("/category/"))
									? "highlight"
									: ""
							}
							onClick={(e) => {
								if (item.href === "/category") {
									e.preventDefault();
									setShowCategories((prev) => !prev);
								}
							}}
						>
							{item.label}
						</Link>
						{item.href === "/category" && showCategories && <CategoryMenu />}
					</>
				))}
			</div>
			<Link className='btn' href={headerConfig.ctaButton.href}>
				{headerConfig.ctaButton.text}
			</Link>
		</div>
	);
};

export default MobileMenu;
