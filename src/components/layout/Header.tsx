// src/components/layout/Header.tsx
import Link from 'next/link';
import Image from 'next/image';
import { HeaderConfig, Branding } from '@/types/config';

interface HeaderProps {
  config: HeaderConfig;
  branding: Branding;
}

export default function Header({ config, branding }: HeaderProps) {
  return (
    <header className="header">
      <div className="flex align-center">
        <Link href="/">
          <Image 
            src={branding.logo} 
            alt={branding.companyName}
            width={120}
            height={30}
            className="header-logo"
          />
        </Link>
        <ul className="header-nav">
          {config.navigation.map((item, index) => (
            <li 
              key={index} 
              className={`header-nav-item ${item.highlight ? 'highlight' : ''}`}
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link href={config.ctaButton.href} className="btn">
          {config.ctaButton.text}
        </Link>
      </div>
    </header>
  );
}