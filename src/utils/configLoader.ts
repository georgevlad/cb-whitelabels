// src/utils/configLoader.ts
import { SiteConfig } from '@/types/config';

export class ConfigLoader {
  private static cache: Map<string, SiteConfig> = new Map();

  static async loadConfig(domain: string): Promise<SiteConfig> {
    // Check cache first
    if (this.cache.has(domain)) {
      return this.cache.get(domain)!;
    }

    const configName = this.getDomainConfig(domain);
    
    try {
      const response = await fetch(`/api/config/${configName}`);
      if (!response.ok) {
        throw new Error(`Failed to load config: ${response.statusText}`);
      }
      
      const config = await response.json();
      
      // Cache the config
      this.cache.set(domain, config);
      
      return config;
    } catch (error) {
      console.error('Error loading configuration:', error);
      // Fallback to default config
      return this.loadDefaultConfig();
    }
  }

  private static getDomainConfig(domain: string): string {
    const domainMap: { [key: string]: string } = {
      'domain1.com': 'domain1',
      'domain2.com': 'domain2',
      'localhost': process.env.NEXT_PUBLIC_DEFAULT_CONFIG || 'domain1',
      '127.0.0.1': process.env.NEXT_PUBLIC_DEFAULT_CONFIG || 'domain1'
    };
    
    return domainMap[domain] || 'domain1';
  }

  private static async loadDefaultConfig(): Promise<SiteConfig> {
    const response = await fetch('/api/config/domain1');
    return response.json();
  }

  static clearCache(): void {
    this.cache.clear();
  }
}