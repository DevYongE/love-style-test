'use client';

import { useEffect } from 'react';

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
  adClient = "ca-pub-YOUR_PUBLISHER_ID", // 실제 사용 시 본인의 Publisher ID로 교체
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ""
}: AdSenseAdProps) {
  useEffect(() => {
    try {
      // AdSense 광고 로드
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
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