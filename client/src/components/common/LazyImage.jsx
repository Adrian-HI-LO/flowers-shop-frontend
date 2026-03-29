import { useState, useEffect } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  fallback = '🌸',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary-50 to-gold-50 text-6xl">
          {fallback}
        </div>
      ) : (
        <>
          {imageSrc && (
            <img
              src={imageSrc}
              alt={alt}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleLoad}
              onError={handleError}
              {...props}
            />
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
