import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Image({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  priority = false
}: ImageProps) {
  return (
    <div className={`relative ${className}`}>
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority={priority}
      />
    </div>
  );
}
