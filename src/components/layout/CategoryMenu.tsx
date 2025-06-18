"use client";

import { useConfig } from "@/hooks/useConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const CategoryMenu = () => {
	const config = useConfig();
	const categories = config.categoryData?.categories || [];
	const path = usePathname();

	return (
		<div className='headerCategoryMenu'>
			{categories.map((mainCategory) => (
				<Link
					href={`/category/${mainCategory.slug}`}
					key={mainCategory.slug}
					className={`nav-item ${
						path === `/category/${mainCategory.slug}` ? "highlight" : ""
					}`}
				>
					{mainCategory.title}
				</Link>
			))}
		</div>
	);
};

export default CategoryMenu;
