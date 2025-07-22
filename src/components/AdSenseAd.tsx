'use client';

import { useEffect } from 'react';

// Google AdSense 타입 정의
interface AdSenseGoogle {
  push: (config: Record<string, unknown>) => void;
}

declare global {
  interface Window {
    adsbygoogle?: AdSenseGoogle[];
  }
}

interface AdSenseAdProps {
  adSlot: string;
  adClient?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export default function AdSenseAd({
  adSlot,
  adClient = "ca-pub-5297653885125132", // 실제 Publisher ID로 업데이트
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ""
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // AdSense 광고 로드
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
} 