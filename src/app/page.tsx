// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import Banner from '@/components/homepage/Banner';
import InfoSection from '@/components/homepage/InfoSection';
import ColoredSection from '@/components/homepage/ColoredSection';
import FillSection from '@/components/homepage/FillSection';
import TestimonialSection from '@/components/homepage/TestimonialSection';
import ResourcesSection from '@/components/homepage/ResourcesSection';
import { SiteConfig } from '@/types/config';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        // Determine config based on domain
        const domain = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        const configName = getDomainConfig(domain);
        
        const response = await fetch(`/api/config/${configName}`);
        if (!response.ok) {
          throw new Error('Failed to load configuration');
        }
        
        const siteConfig = await response.json();
        setConfig(siteConfig);
      } catch (err) {
        console.error('Failed to load site config:', err);
        setError('Failed to load site configuration');
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  const getDomainConfig = (domain: string): string => {
    // Map domains to config files
    const domainMap: { [key: string]: string } = {
      'domain1.com': 'domain1',
      'domain2.com': 'domain2',
      'localhost': 'domain1', // Default for development
      '127.0.0.1': 'domain1'
    };
    return domainMap[domain] || 'domain1';
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  if (error || !config) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: 'red'
      }}>
        {error || 'Configuration not found'}
      </div>
    );
  }

  return (
    <Layout config={config}>
      <div id="wrapper" className="homepage">
        <Banner config={config.homepage.banner} />
        
        <section className="content-area">
          <div className="content-item" id="item-info">
            <InfoSection config={config.homepage.infoSection} />
          </div>
          
          <div className="content-item" id="item-colored">
            <ColoredSection config={config.homepage.coloredSection} />
          </div>
          
          <div className="content-item" id="item-fill">
            <FillSection config={config.homepage.fillSection} />
          </div>
          
          <div className="content-item" id="item-masonry">
            <TestimonialSection config={config.homepage.testimonials} />
          </div>
          
          <div className="content-item" id="item-banner">
            <ResourcesSection config={config.homepage.resources} />
          </div>
        </section>
      </div>
    </Layout>
  );
}