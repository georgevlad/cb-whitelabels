// src/components/homepage/InfoSection.tsx
import Image from 'next/image';
import { InfoSectionConfig } from '@/types/config';

interface InfoSectionProps {
  config: InfoSectionConfig;
}

export default function InfoSection({ config }: InfoSectionProps) {
  return (
    <div className="content-item" style={{ margin: '160px auto' }}>
      <div className="flex" style={{ gap: '76px' }}>
        <div style={{ flex: '1 1 50%', maxWidth: '50%' }}>
          <div 
            style={{
              backgroundImage: `url(${config.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              height: '400px',
              width: '100%'
            }}
          />
        </div>
        
        <div className="flex column align-start" style={{ flex: '1 1 50%', maxWidth: '50%' }}>
          <h3 style={{ 
            fontSize: '32px', 
            lineHeight: '42px', 
            marginBottom: '0',
            color: '#3A413E'
          }}>
            {config.title}
          </h3>
          <p style={{ 
            fontSize: '18px', 
            lineHeight: '28px', 
            marginBottom: '40px',
            color: '#787878'
          }}>
            {config.description}
          </p>
          
          <div className="flex wrap">
            {config.features.map((feature, index) => (
              <div 
                key={index}
                className="flex column align-start"
                style={{
                  flex: '1 1 50%',
                  maxWidth: '200px',
                  marginBottom: '40px',
                  marginRight: '20px'
                }}
              >
                <span 
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundImage: `url(${feature.icon})`,
                    backgroundRepeat: 'no-repeat',
                    marginBottom: '8px'
                  }}
                />
                <span style={{
                  fontSize: '18px',
                  lineHeight: '28px',
                  fontWeight: '700',
                  color: '#3A413E'
                }}>
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
