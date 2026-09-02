import { useState, useRef, useEffect, useCallback } from 'react';
import { FiLayers } from 'react-icons/fi';

/**
 * ProjectScreenshotPreview
 * Displays a fixed-height viewport showing the top of a project website screenshot.
 * On desktop hover, smoothly scrolls vertically to reveal the full website down to the footer.
 * On unhover, smoothly returns to the top.
 * Respects prefers-reduced-motion and avoids sticky hover states on touch/mobile devices.
 */
export default function ProjectScreenshotPreview({ src, alt, className = '' }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [duration, setDuration] = useState('4s');
  const [hasError, setHasError] = useState(false);

  const calculateDistance = useCallback(() => {
    if (!containerRef.current || !imgRef.current) return;
    const containerH = containerRef.current.clientHeight;
    const imgH = imgRef.current.clientHeight;
    const diff = imgH - containerH;

    if (diff > 0) {
      setScrollDistance(diff);
      // Adaptive duration: 3s to 5s based on screenshot height
      const calculatedDuration = Math.min(5, Math.max(3, Math.round((diff / 350) * 10) / 10));
      setDuration(`${calculatedDuration}s`);
    } else {
      setScrollDistance(0);
      setDuration('0s');
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const ro = new ResizeObserver(() => {
      calculateDistance();
    });

    ro.observe(container);
    if (imgRef.current) {
      ro.observe(imgRef.current);
    }

    return () => ro.disconnect();
  }, [calculateDistance]);

  // Fallback placeholder when image is not provided or fails to load
  if (!src || hasError) {
    return (
      <div
        className={`project-image-scroll relative w-full h-48 sm:h-52 md:h-60 bg-gradient-to-br from-slate-50 via-slate-100/80 to-slate-200/60 rounded-lg flex flex-col items-center justify-center text-slate-400 select-none border border-slate-200/60 ${className}`}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-2xs border border-slate-200/50 flex items-center justify-center text-slate-400 mb-1.5">
          <FiLayers className="text-lg text-[#0a66c2]/80" />
        </div>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {alt || 'Project Showcase'}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        '--scroll-dist': `-${scrollDistance}px`,
        '--scroll-duration': duration,
      }}
      className={`project-image-scroll relative w-full h-48 sm:h-52 md:h-60 overflow-hidden rounded-lg bg-slate-100 border border-slate-200/60 ${className}`}
    >
      <img
        key={src}
        ref={imgRef}
        src={src}
        alt={alt || 'Project screenshot preview'}
        loading="lazy"
        decoding="async"
        onLoad={calculateDistance}
        onError={() => setHasError(true)}
        className="project-image-scroll-img w-full h-auto block object-top"
      />
    </div>
  );
}
