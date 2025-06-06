// src/components/homepage/TestimonialSection.tsx
import Image from 'next/image';
import { TestimonialSectionConfig } from '@/types/config';

interface TestimonialSectionProps {
  config: TestimonialSectionConfig;
}

const bgColorMap = {
  yellow: '#FFDE92',
  purple: '#C9BDFF',
  teal: '#91EBE5'
};

export default function TestimonialSection({ config }: TestimonialSectionProps) {
  return (
    <div className="content-item">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 0' }}>
        <h2 style={{
          fontSize: '42px',
          lineHeight: '52px',
          marginBottom: '30px',
          color: '#3A413E'
        }}>
          {config.title}
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {config.testimonials.map((testimonial, index) => (
            <div
              key={index}
              style={{
                backgroundColor: bgColorMap[testimonial.bgColor],
                borderRadius: '24px',
                padding: '20px',
                display: 'flex',
                gap: '32px',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                minHeight: '220px',
                gridRow: testimonial.span ? 'span 2' : 'span 1',
                ...(testimonial.span && {
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: '80px'
                })
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={150}
                  height={150}
                  style={{
                    borderRadius: '50%',
                    marginBottom: '10px',
                    objectFit: 'cover'
                  }}
                />
                <h4 style={{
                  margin: 0,
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontWeight: '700',
                  color: '#3A413E'
                }}>
                  {testimonial.name}
                </h4>
                <small style={{
                  color: '#3A413E',
                  fontSize: '16px',
                  lineHeight: '26px'
                }}>
                  {testimonial.location}
                </small>
              </div>
              
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '0'
                }}>
                  <Image 
                    src="/img/icons/quotes.png" 
                    alt="Quote" 
                    width={24} 
                    height={24}
                  />
                </span>
                <p style={{ color: '#3A413E' }}>
                  {testimonial.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}