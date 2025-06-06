// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { FooterConfig } from '@/types/config';

interface FooterProps {
  config: FooterConfig;
}

export default function Footer({ config }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="flex column">
          <ul className="footer-menu">
            {config.links.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <div className="footer-social">
            {config.social.map((social, index) => (
              <Link key={index} href={social.href}>
                <Image 
                  src={social.icon} 
                  alt={social.platform}
                  width={32}
                  height={32}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex column">
          <p>{config.newsletter.title}</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder={config.newsletter.placeholder}
              className="newsletter-input"
            />
            <button type="submit" className="btn">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          <span>{config.copyright}</span>
        </div>
        <div>
          {config.legal.map((link, index) => (
            <Link key={index} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}