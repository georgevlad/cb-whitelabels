"use client";

import { useConfig } from "@/hooks/useConfig";
import SideMenu from "@/components/category/SideMenu";
import Content from "@/components/category/Content";
import NonHierarchicalCategory from "@/components/category/NonHierarchicalCategory";

export default function CategoryPage() {
	const config = useConfig();

	// Use new hierarchical categories if available, otherwise fall back to old structure
	const categories = config.categoryData?.categories || [];
	const hasHierarchicalCategories = categories.length > 0;

	// Fallback to old category structure if no hierarchical categories
	if (!hasHierarchicalCategories) {
		return <NonHierarchicalCategory />;
	}

	return (
		<div className='category'>
			<div id='wrapper'>
				<SideMenu />
				<main className='main-content'>
					<Content />
				</main>
			</div>
		</div>
	);
}
