// src/components/homepage/ColoredSection.tsx
import Image from 'next/image';
import { ColoredSectionConfig } from '@/types/config';

interface ColoredSectionProps {
  config: ColoredSectionConfig;
}

export default function ColoredSection({ config }: ColoredSectionProps) {
  return (
    <div className="flex column justify-center align-center">
      <div className="content-text">
        <h2>{config.title}</h2>
        <p>{config.description}</p>
      </div>
      <div className="content-image flex align-center justify-center wrap">
        {config.items.map((item, index) => (
          <div key={index} className="content-image-item flex column">
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={299}
            />
            <div className="content-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}