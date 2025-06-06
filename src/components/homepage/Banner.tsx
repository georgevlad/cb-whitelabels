// src/components/homepage/Banner.tsx
import Link from 'next/link';
import Image from 'next/image';
import { BannerConfig } from '@/types/config';

interface BannerProps {
  config: BannerConfig;
}

const iconMap = {
  dsl: '/img/icons/icon-mobile.png',
  credit: '/img/icons/icon-card.png',
  sim: '/img/icons/icon-sim.png',
  fixed: '/img/icons/icon-doc.png'
};

export default function Banner({ config }: BannerProps) {
  return (
    <div className="banner banner-large">
      <div className="banner-text">
        <div style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>
      </div>
      
      {config.backgroundImage && (
        <div 
          style={{
            backgroundImage: `url(${config.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            width: '100%',
            maxWidth: '448px',
            flex: 1
          }}
        />
      )}
      
      <div className="banner-cards">
        {config.cards.map((card, index) => (
          <Link 
            key={index} 
            href={card.href} 
            className="banner-card"
          >
            <span 
              className="banner-card-icon"
              style={{ backgroundImage: `url(${iconMap[card.type]})` }}
            />
            <span className="banner-card-label">{card.label}</span>
            <span className="banner-card-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}