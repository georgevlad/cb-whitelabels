import { useConfig } from "@/hooks/useConfig";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const NonHierarchicalCategory = () => {
	const config = useConfig();
	const categories = config.categoryData?.categories || [];
	const params = useParams();
	const activeSection = params.subcategory;

	return (
		<div className='category'>
			<div id='wrapper'>
				<aside className='sidebar'>
					<div className='sidebar-header'>
						<h2>CATEGORIES</h2>
					</div>
					<nav>
						{Object.entries(categories).map(([key, category]) => (
							<Link
								href={`/category/${category.slug}`}
								key={key}
								className={`nav-item${activeSection === key ? " active" : ""}`}
							>
								{category.title}
							</Link>
						))}
					</nav>
				</aside>

				<main className='main-content'>
					{Object.entries(categories).map(([key, category]) => (
						<section
							key={key}
							className={`content-section ${
								activeSection === key ? "active" : ""
							}`}
						>
							<h1 className='section-title'>{category.title}</h1>
							<div className='cards-grid'>
								{category.cards?.map((card, index) => (
									<div
										key={index}
										className={`feature-card ${card.size || ""}`}
									>
										<div
											className={`card-header ${
												card.size === "small"
													? "flex column reverse text-center"
													: ""
											}`}
										>
											<div className='card-content'>
												<h3>{card.title}</h3>
												<ul className='feature-list'>
													{card.features.map((feature, featureIndex) => (
														<li key={featureIndex}>{feature}</li>
													))}
												</ul>
											</div>
										</div>
									</div>
								))}
							</div>
						</section>
					))}
				</main>
			</div>
		</div>
	);
};

export default NonHierarchicalCategory;
