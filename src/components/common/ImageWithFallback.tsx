import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
  fallbackCategory?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackLabel,
  fallbackCategory = 'Kolli Graphics Facility Asset',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`fallback-image-container ${className}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f4f6f8 0%, #e5e7eb 100%)',
          border: '1px dashed #9ca3af',
          borderRadius: '12px',
          padding: '24px',
          textAlign: 'center',
          minHeight: '220px',
          color: '#4b5563'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#dc2626' }} />
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#b45309' }} />
        </div>
        <p style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111827', marginBottom: '4px' }}>
          {fallbackLabel || alt || 'Kolli Graphics Machinery / Production Asset'}
        </p>
        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{fallbackCategory}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};

