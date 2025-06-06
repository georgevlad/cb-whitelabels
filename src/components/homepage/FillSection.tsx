// src/components/homepage/FillSection.tsx
import { FillSectionConfig } from '@/types/config';
import Button from '@/components/common/Button';

interface FillSectionProps {
  config: FillSectionConfig;
}

export default function FillSection({ config }: FillSectionProps) {
  return (
    <div className="content-item">
      {config.items.map((item, index) => (
        <div 
          key={index}
          className="flex align-center justify-between"
          style={{ marginBottom: '32px' }}
        >
          <div 
            className="flex column align-start"
            style={{ maxWidth: '420px' }}
          >
            <h5 style={{
              fontSize: '24px',
              lineHeight: '32px',
              color: '#3A413E',
              marginBottom: '16px'
            }}>
              {item.title}
            </h5>
            <p style={{
              fontSize: '16px',
              lineHeight: '26px',
              color: '#787878',
              marginBottom: '24px'
            }}>
              {item.description}
            </p>
            <Button variant="outline">
              {item.buttonText}
            </Button>
          </div>
          <div
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right',
              backgroundSize: 'cover',
              borderRadius: '24px',
              minHeight: '350px',
              flex: '1 1 50%',
              marginLeft: '40px'
            }}
          />
        </div>
      ))}
    </div>
  );
}