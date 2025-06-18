"use client";

import { useConfig } from "@/hooks/useConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const CategoryMenu = () => {
	const config = useConfig();
	const categories = config.categoryData?.categories || [];
	const path = usePathname();
	const selectedRef = useRef<HTMLAnchorElement | null>(null);

	useEffect(() => {
		if (selectedRef.current) {
			selectedRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "nearest", // don't scroll vertically
			});
		}
	}, []);

	return (
		<div className='headerCategoryMenu'>
			{categories.map((mainCategory) => {
				const active = path === `/category/${mainCategory.slug}`;
				return (
					<Link
						href={`/category/${mainCategory.slug}`}
						key={mainCategory.slug}
						className={`nav-item ${active ? "highlight" : ""}`}
						ref={active ? selectedRef : null}
					>
						{mainCategory.title}
					</Link>
				);
			})}
		</div>
	);
};

export default CategoryMenu;
