"use client";

import { useConfig } from "@/hooks/useConfig";
import { useResponsiveMarker } from "@/hooks/useResponsiveMobileMarker";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

const SideMenu = () => {
	const config = useConfig();
	const categories = config.categoryData?.categories || [];
	const params = useParams();
	const activeSection = params.subcategory;
	const [ref, isMobile] = useResponsiveMarker<HTMLAnchorElement>();

	useEffect(() => {
		if (ref.current) {
			if (isMobile) {
				ref.current?.scrollIntoView({
					behavior: "smooth",
					inline: "center",
					block: "nearest", // don't scroll vertically
				});
			}
		}
	}, [isMobile, ref.current]);

	return (
		<aside className='sidebar'>
			<div className='sidebar-header'>
				<h2>CATEGORIES</h2>
			</div>
			<nav>
				{categories.map((mainCategory) => {
					const isActive = activeSection === mainCategory.slug;

					return (
						<Link
							key={mainCategory.slug}
							href={`/category/${mainCategory.slug}`}
							className={`nav-item${isActive ? " active" : ""}`}
							ref={isActive ? ref : null}
						>
							{mainCategory.title}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
};

export default SideMenu;
