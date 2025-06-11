"use client";

import { useEffect, useRef, useState } from "react";
import { useConfig } from "@/hooks/useConfig";

export default function CategoryPage() {
	const config = useConfig();
	const [activeSection, setActiveSection] = useState(
		Object.keys(config.categories ?? {})[0]
	);
	const activeSectionRef = useRef(activeSection);

	useEffect(() => {
		activeSectionRef.current = activeSection;
	}, [activeSection]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				e.preventDefault();
				const list = Object.keys(config.categories ?? {});
				const activeIndex = list.findIndex(
					(item) => item === activeSectionRef.current
				);

				let nextIndex;
				if (e.key === "ArrowUp") {
					nextIndex = activeIndex > 0 ? activeIndex - 1 : list.length - 1;
				} else {
					nextIndex = activeIndex < list.length - 1 ? activeIndex + 1 : 0;
				}
				setActiveSection(list[nextIndex]);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className='category'>
			<div id='wrapper'>
				<div className='flex'>
					<aside className='sidebar'>
						<div className='sidebar-header'>
							<h2>CATEGORIES</h2>
						</div>
						<nav>
							{Object.entries(config.categories).map(([key, category]) => (
								<div
									key={key}
									className={`nav-item${
										activeSection === key ? " active" : ""
									}`}
									data-section={key}
									onClick={() => setActiveSection(key)}
								>
									{category.title}
								</div>
							))}
						</nav>
					</aside>

					<main className='main-content'>
						{Object.entries(config.categories).map(([key, category]) => (
							<section
								key={key}
								id={key}
								className={`content-section ${
									activeSection === key ? "active" : ""
								}`}
							>
								<h1 className='section-title'>{category.title}</h1>
								<div className='cards-grid'>
									{category.cards.map((card, index) => (
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
												<div className={`card-icon ${card.theme}`} />
											</div>
										</div>
									))}
								</div>
							</section>
						))}
					</main>
				</div>
			</div>
		</div>
	);
}
