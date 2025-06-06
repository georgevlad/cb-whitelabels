// src/components/homepage/ResourcesSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ResourcesSectionConfig } from '@/types/config';
import Button from '@/components/common/Button';

interface ResourcesSectionProps {
  config: ResourcesSectionConfig;
}

export default function ResourcesSection({ config }: ResourcesSectionProps) {
  return (
    <div className="content-item">
      <div 
        className="banner"
        style={{
          justifyContent: 'center',
          margin: '80px 0',
          maxWidth: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px'
        }}
      >
        <div className="banner-text">
          <h2 style={{
            fontSize: '42px',
            lineHeight: '52px',
            color: '#101828',
            marginBottom: '40px'
          }}>
            {config.title}
          </h2>
        </div>
        
        <div className="banner-cards" style={{ 
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          {config.resources.map((resource, index) => (
            <Link
              key={index}
              href={resource.href}
              className="banner-card"
              style={{
                flexDirection: 'column',
                textAlign: 'left',
                alignItems: 'flex-start',
                flex: 1,
                minWidth: '300px',
                textTransform: 'none',
                letterSpacing: 0,
                fontWeight: 'normal'
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${resource.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  borderRadius: '16px',
                  height: '205px',
                  width: '100%',
                  marginBottom: '16px'
                }}
              />
              
              <span style={{
                fontSize: '24px',
                lineHeight: '32px',
                textTransform: 'none',
                letterSpacing: 0,
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                {resource.title}
              </span>
              
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '22px',
                color: '#3A413E',
                letterSpacing: 0,
                textTransform: 'none',
                marginBottom: '8px'
              }}>
                {resource.date} ⋅ {resource.duration}
              </span>
              
              <span style={{
                fontSize: '16px',
                lineHeight: '26px',
                color: '#787878',
                textTransform: 'none',
                fontWeight: '400',
                letterSpacing: 0,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '16px'
              }}>
                {resource.description}
              </span>
              
            </Link>
          ))}
        </div>
        
        <Button className="mt-30">
          {config.ctaText}
        </Button>

        <div 
          style={{
            maxWidth: '864px',
            height: '200px',
            minHeight: 0,
            backgroundColor: '#5048BE',
            color: '#fff',
            borderRadius: '24px',
            padding: '24px',
            marginTop: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ alignItems: 'flex-start' }}>
            <p style={{
              fontSize: '32px',
              lineHeight: '42px',
              margin: '0 0 10px',
              maxWidth: '300px',
              textAlign: 'left',
              fontWeight: '700',
              color: '#fff'
            }}>
              {config.helpSection.title}
            </p>
            <span style={{
              fontSize: '18px',
              lineHeight: '28px',
              color: '#fff'
            }}>
              {config.helpSection.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
