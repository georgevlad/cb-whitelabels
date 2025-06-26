"use client";

import Link from "next/link";
import { CategoryItem } from "@/types/config";
import React, { useMemo } from "react";
import { useConfig } from "@/hooks/useConfig";
import { getCardSize } from "@/utils/categories";
import { useParams } from "next/navigation";

const Content = () => {
	const config = useConfig();
	const categories = config.categoryData?.categories || [];
	const params = useParams();
	const activeSection = params.subcategory as string;

	const findCategoryBySlug = (
		slug: string,
		items: CategoryItem[]
	): CategoryItem | null => {
		for (const item of items) {
			if (item.slug === slug) return item;
			if (item.children) {
				const found = findCategoryBySlug(slug, item.children);
				if (found) return found;
			}
		}
		return null;
	};

	const currentCategory = useMemo(
		() => findCategoryBySlug(activeSection, categories),
		[activeSection, categories]
	);

	if (!currentCategory) return null;

	if (currentCategory?.children?.length) {
		return (
			<section className='content-section active'>
				<h1 className='section-title'>{currentCategory.title}</h1>
				<p>
					TODO - add some info text about the category. <br/>
					Schutz für alle Lebenslagen – von Gesundheit bis Eigentum. - Category introduction text
					<br/>
					TODO - style the display of the categories and subategories. 
					<br/> 
					We can have 2 levels or 3 level categories & subcategories - the last level will be a link to the embeded service page
					<br/>
					Because the categories and services are very diverse can we find some generic icons / styles for the categories and subcategories? 
					(and maybe some more specific styling for the featured ones from the homepage)
				</p>
				<div className='cards-grid'>
					{currentCategory.children.map((child) => (
						<div
							key={child.slug}
							className={`feature-card ${getCardSize(child)}`}
						>
							<div className='card-content'>
								{child.embed_code ? (
									<Link
										href={`/embed/${child.slug}`}
										className='card-title-link calculator-link'
									>
										<h3>{child.title}</h3>
									</Link>
								) : (
									<h3>{child.title}</h3>
								)}

								{child.children && child.children.length > 0 && (
									<div className='subcategory-items'>
										{child.children.map((subChild) => (
											<div key={subChild.slug} className='subcategory-item'>
												{subChild.embed_code ? (
													<Link
														href={`/embed/${subChild.slug}`}
														className='embed-link'
													>
														{subChild.title}
													</Link>
												) : (
													<span className='subcategory-title'>
														{subChild.title}
													</span>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className='content-section active'>
			<h1 className='section-title'>{currentCategory.title}</h1>
			<p>No content available for this category.</p>
		</section>
	);
};

export default Content;
