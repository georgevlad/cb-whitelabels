"use client";

import { useEffect, useRef, useState } from "react";
import { useConfig } from "@/hooks/useConfig";
import Link from "next/link";
import { CategoryItem } from "@/types/config";

export default function CategoryPage() {
  const config = useConfig();
  const [activeSection, setActiveSection] = useState<string>("");
  const [activePath, setActivePath] = useState<string[]>([]);
  const activeSectionRef = useRef(activeSection);

  // Use new hierarchical categories if available, otherwise fall back to old structure
  const categories = config.categoryData?.categories || [];
  const hasHierarchicalCategories = categories.length > 0;

  useEffect(() => {
    if (categories.length > 0) {
      setActiveSection(categories[0].slug);
      setActivePath([categories[0].slug]);
    }
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const handleSectionClick = (categorySlug: string, path: string[]) => {
    setActiveSection(categorySlug);
    setActivePath(path);
  };

  const findCategoryBySlug = (slug: string, items: CategoryItem[]): CategoryItem | null => {
    for (const item of items) {
      if (item.slug === slug) return item;
      if (item.children) {
        const found = findCategoryBySlug(slug, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const getCurrentCategory = (): CategoryItem | null => {
    return findCategoryBySlug(activeSection, categories);
  };

  const renderSidebarItems = () => {
    return categories.map((mainCategory) => {
      const isActive = activeSection === mainCategory.slug;
      
      return (
        <div
          key={mainCategory.slug}
          className={`nav-item${isActive ? " active" : ""}`}
          onClick={() => handleSectionClick(mainCategory.slug, [mainCategory.slug])}
        >
          {mainCategory.title}
        </div>
      );
    });
  };

  const renderMainContent = () => {
    const currentCategory = getCurrentCategory();
    if (!currentCategory) return null;

    const hasChildren = currentCategory.children && currentCategory.children.length > 0;

    if (hasChildren) {
      return (
        <section className="content-section active">
          <h1 className="section-title">{currentCategory.title}</h1>
          <div className="cards-grid">
            {currentCategory.children!.map((child, index) => (
              <div key={child.slug} className={`feature-card ${getCardSize(child)}`}>
                <div className="card-header">
                  <div className="card-content">
                    {child.embed_code ? (
                      <Link href={`/embed/${child.slug}`} className="card-title-link calculator-link">
                        <h3>{child.title}</h3>
                      </Link>
                    ) : (
                      <h3>{child.title}</h3>
                    )}
                    
                  {child.children && child.children.length > 0 && (
                    <div className="subcategory-items">
                      {child.children.map((subChild) => (
                        <div key={subChild.slug} className="subcategory-item">
                          {subChild.embed_code ? (
                            <Link href={`/embed/${subChild.slug}`} className="embed-link">
                              {subChild.title}
                            </Link>
                          ) : (
                            <span className="subcategory-title">{subChild.title}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  </div>
                  <div className={`card-icon`} />
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    }

    return (
      <section className="content-section active">
        <h1 className="section-title">{currentCategory.title}</h1>
        <p>No content available for this category.</p>
      </section>
    );
  };

  const getCardSize = (child: CategoryItem): string => {
    if (!child.children || child.children.length <= 1) return "small";
    if (child.children.length > 4) return "long";
    return "";
  };

  const getCardTheme = (title: string, index: number): string => {
    const themes = ["accounts-theme", "deposits-theme", "credit-theme", "loans-theme"];
    return themes[index % themes.length];
  };

  // Fallback to old category structure if no hierarchical categories
  if (!hasHierarchicalCategories) {
    return (
      <div className="category">
        <div id="wrapper">
          <div className="flex">
            <aside className="sidebar">
              <div className="sidebar-header">
                <h2>CATEGORIES</h2>
              </div>
              <nav>
                {Object.entries(config.categories).map(([key, category]) => (
                  <div
                    key={key}
                    className={`nav-item${activeSection === key ? " active" : ""}`}
                    onClick={() => setActiveSection(key)}
                  >
                    {category.title}
                  </div>
                ))}
              </nav>
            </aside>

            <main className="main-content">
              {Object.entries(config.categories).map(([key, category]) => (
                <section
                  key={key}
                  className={`content-section ${activeSection === key ? "active" : ""}`}
                >
                  <h1 className="section-title">{category.title}</h1>
                  <div className="cards-grid">
                    {category.cards.map((card, index) => (
                      <div key={index} className={`feature-card ${card.size || ""}`}>
                        <div className={`card-header ${card.size === "small" ? "flex column reverse text-center" : ""}`}>
                          <div className="card-content">
                            <h3>{card.title}</h3>
                            <ul className="feature-list">
                              {card.features.map((feature, featureIndex) => (
                                <li key={featureIndex}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div className={`card-icon`} />
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

  return (
    <div className="category">
      <div id="wrapper">
        <div className="flex">
          <aside className="sidebar">
            <div className="sidebar-header">
              <h2>CATEGORIES</h2>
            </div>
            <nav>
              {renderSidebarItems()}
            </nav>
          </aside>

          <main className="main-content">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </div>
  );
}