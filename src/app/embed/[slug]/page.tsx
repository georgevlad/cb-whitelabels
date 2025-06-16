// src/app/embed/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useConfig } from "@/hooks/useConfig";
import { CategoryItem } from "@/types/config";
import { useEffect, useRef } from "react";

export default function EmbedPage() {
  const params = useParams();
  const config = useConfig();
  const embedRef = useRef<HTMLDivElement>(null);
  const slug = params.slug as string;

  const findCategoryBySlug = (slug: string, items: CategoryItem[]): CategoryItem | null => {
    for (const item of items) {
      if (item.slug === slug && item.embed_code) return item;
      if (item.children) {
        const found = findCategoryBySlug(slug, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const categories = config.categoryData?.categories || [];
  const category = findCategoryBySlug(slug, categories);

  useEffect(() => {
    if (category?.embed_code && embedRef.current) {
      // Clear any existing content
      embedRef.current.innerHTML = '';
      
      // Insert the embed code
      embedRef.current.innerHTML = category.embed_code;
      
      // Execute any scripts in the embed code
      const scripts = embedRef.current.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i];
        const newScript = document.createElement('script');
        
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        
        // Copy all attributes
        for (let j = 0; j < script.attributes.length; j++) {
          const attr = script.attributes[j];
          newScript.setAttribute(attr.name, attr.value);
        }
        
        document.head.appendChild(newScript);
      }
    }
  }, [category]);

  if (!category) {
    return (
      <div className="embed-page">
        <div id="wrapper">
          <div className="content-area">
            <h1>Category not found</h1>
            <p>The requested category could not be found or does not contain an embed code.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="embed-page">
      <div id="wrapper">
        <div className="content-area">
          <div className="embed-header">
            <h1>{category.title}</h1>
          </div>
          <div className="embed-container" ref={embedRef}>
            {/* Embed code will be inserted here */}
          </div>
        </div>
      </div>
    </div>
  );
}