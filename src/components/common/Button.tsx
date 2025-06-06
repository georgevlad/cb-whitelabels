// src/components/common/Button.tsx
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline';
  className?: string;
  children: React.ReactNode;
}

export default function Button({ 
  href, 
  onClick, 
  variant = 'primary', 
  className = '', 
  children 
}: ButtonProps) {
  const baseClasses = variant === 'outline' ? 'btn btn-outline' : 'btn';
  const classes = `${baseClasses} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}