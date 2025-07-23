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
  // 임시로 AdSense 비활성화 (오류 방지)
  return (
    <div className={`adsense-container ${className}`} style={style}>
      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        <div className="text-center p-8">
          <div className="text-2xl mb-2">📢</div>
          <p>광고 영역</p>
          <p className="text-xs mt-1">(개발 중)</p>
        </div>
      </div>
    </div>
  );
} 