// src/components/homepage/ColoredSection.tsx
import Image from 'next/image';
import { ColoredSectionConfig } from '@/types/config';

interface ColoredSectionProps {
  config: ColoredSectionConfig;
}

export default function ColoredSection({ config }: ColoredSectionProps) {
  return (
    <div 
      className="content-item flex column justify-center align-center"
      style={{
        backgroundColor: config.backgroundColor,
        borderRadius: '32px',
        padding: '80px',
        color: '#fff',
        margin: '160px 0'
      }}
    >
      <div 
        className="content-text"
        style={{
          maxWidth: '80%',
          margin: '0 auto 60px',
          textAlign: 'center'
        }}
      >
        <h2 style={{
          fontSize: '42px',
          lineHeight: '52px',
          color: '#fff'
        }}>
          {config.title}
        </h2>
        <p style={{
          fontSize: '18px',
          lineHeight: '32px',
          color: '#fff'
        }}>
          {config.description}
        </p>
      </div>
      
      <div className="flex align-center justify-center wrap" style={{ gap: '24px' }}>
        {config.items.map((item, index) => (
          <div 
            key={index}
            className="flex column"
            style={{
              textAlign: 'left',
              backgroundColor: '#fff',
              borderRadius: '24px',
              flex: 1
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={299}
              style={{ height: '299px', objectFit: 'contain' }}
            />
            <div style={{
              color: '#3A413E',
              margin: 0,
              padding: '0 28px 32px',
              minHeight: '200px'
            }}>
              <h3 style={{ 
                fontSize: '32px',
                lineHeight: '42px',
                margin: 0,
                color: '#3A413E'
              }}>
                {item.title}
              </h3>
              <p style={{
                color: '#00000060',
                fontSize: '16px',
                lineHeight: '26px'
              }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
