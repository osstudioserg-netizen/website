'use client';

import Script from 'next/script';
import { useState } from 'react';
import GallerySlider, { type Slide } from './GallerySlider';
import { TEAM_IMAGES } from './teamImages';

const FALLBACK_IMAGES: Slide[] = TEAM_IMAGES.map((img, i) => ({
  src: img.src,
  alt: `portfolio ${i + 1}`,
}));

/** Виджет ленты Instagram через Elfsight (платная версия — без брендинга).
 * Панель "Panel only seen by widget owner" видна только владельцу, посетителям — нет.
 * В .env.local: NEXT_PUBLIC_INSTAGRAM_WIDGET_APP_ID=ваш-app-id
 */
export default function InstagramWidget() {
  const appId = process.env.NEXT_PUBLIC_INSTAGRAM_WIDGET_APP_ID?.trim();
  const [scriptReady, setScriptReady] = useState(false);

  if (!appId) {
    return (
      <section className="w-full bg-transparent py-16">
        <GallerySlider images={FALLBACK_IMAGES} />
      </section>
    );
  }

  return (
    <section className="w-full bg-transparent py-16 relative overflow-x-hidden">
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
        onLoad={() => setScriptReady(true)}
      />
      <div
        className="relative min-h-[400px] flex items-center justify-center"
        style={{ minHeight: "400px" }}
      >
        {!scriptReady && (
          <div className="text-white/60 absolute">Загрузка ленты Instagram...</div>
        )}
        <div
          className={`elfsight-app-${appId}`}
          style={{ opacity: scriptReady ? 1 : 0, minHeight: "400px" }}
        />
      </div>
    </section>
  );
}
