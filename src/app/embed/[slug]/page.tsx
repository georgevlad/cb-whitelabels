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
      
      // Decode HTML entities
      const decodedEmbedCode = category.embed_code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"');
      
      // Check if embed code contains iframe or div elements (not just scripts)
      const hasNonScriptContent = decodedEmbedCode.includes('<iframe') || 
                                  decodedEmbedCode.includes('<div');
      
      if (hasNonScriptContent) {
        // For iframe or div-based widgets, insert directly into container
        embedRef.current.innerHTML = decodedEmbedCode;
        
        // Execute any scripts that were inserted
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
          
          // Replace the old script with the new one
          script.parentNode?.replaceChild(newScript, script);
        }
      } else {
        // For script-only widgets (like flight search), use the relocation method
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = decodedEmbedCode;
        
        const scripts = tempDiv.getElementsByTagName('script');
        
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
          
          newScript.onload = () => {
            // For script-only widgets, check for content to relocate
            setTimeout(() => {
              relocateWidgetContent();
            }, 2000);
          };
          
          document.head.appendChild(newScript);
        }
      }
    }
  }, [category]);

  const relocateWidgetContent = () => {
    if (!embedRef.current) return;

    // Common selectors for third-party widgets
    const widgetSelectors = [
      '[id*="tp"]',
      '[class*="tp"]',
      '[id*="widget"]',
      '[class*="widget"]',
      '[id*="search"]',
      '[class*="search"]',
      'iframe[src*="tpembd"]',
      '[data-tp]'
    ];
    
    widgetSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        // Only move elements that aren't already in our container
        if (el.closest('.embed-container') === null) {
          embedRef.current?.appendChild(el);
        }
      });
    });
  };

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
          <div 
            className="embed-container" 
            ref={embedRef}
            style={{
              minHeight: '600px',
              width: '100%',
              background: '#ffffff',
              border: '1px solid #e9ecef',
              borderRadius: '20px',
              padding: '20px',
              overflow: 'visible',
              position: 'relative'
            }}
          >
            <div style={{ 
              padding: '20px', 
              textAlign: 'center',
              color: '#666',
              fontSize: '16px'
            }}>
              Loading widget...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}