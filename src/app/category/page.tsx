"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { SiteConfig } from "@/types/config";

export default function CategoryPage() {
	const [config, setConfig] = useState<SiteConfig | null>(null);
	const [activeSection, setActiveSection] = useState("banking");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadConfig = async () => {
			try {
				const domain =
					typeof window !== "undefined"
						? window.location.hostname
						: "localhost";
				const configName = getDomainConfig(domain);

				const response = await fetch(`/api/config/${configName}`);
				const siteConfig = await response.json();
				setConfig(siteConfig);
			} catch (err) {
				console.error("Failed to load site config:", err);
			} finally {
				setLoading(false);
			}
		};

		loadConfig();
	}, []);

	useEffect(() => {
		// Add keyboard navigation
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				e.preventDefault();
				const sections = Object.keys(config?.categories || {});
				const currentIndex = sections.indexOf(activeSection);

				let nextIndex;
				if (e.key === "ArrowUp") {
					nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
				} else {
					nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
				}

				setActiveSection(sections[nextIndex]);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [activeSection, config]);

	const getDomainConfig = (domain: string): string => {
		const domainMap: { [key: string]: string } = {
			"domain1.com": "domain1",
			"domain2.com": "domain2",
			localhost: "domain1",
			"127.0.0.1": "domain1",
		};
		return domainMap[domain] || "domain1";
	};

	if (loading || !config) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
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
									className={`nav-item ${
										activeSection === key ? "active" : ""
									}`}
									onClick={() => setActiveSection(key)}
									data-section={key}
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
		</Layout>
	);
}
