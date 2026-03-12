'use client';

import { useEffect, useState } from 'react';
import GallerySlider, { type Slide } from './GallerySlider';
import { TEAM_IMAGES } from './teamImages';

const FALLBACK_IMAGES: Slide[] = TEAM_IMAGES.map((img, i) => ({
  src: img.src,
  alt: `portfolio ${i + 1}`,
}));

function mediaToSlides(media: { media_type: string; media_url: string; thumbnail_url?: string; permalink: string; caption?: string }[]): Slide[] {
  return media.map((m) => ({
    src: m.media_type === "VIDEO" && m.thumbnail_url ? m.thumbnail_url : m.media_url,
    alt: m.caption?.slice(0, 100) ?? "",
    permalink: m.permalink,
    mediaType: m.media_type as Slide["mediaType"],
  }));
}

export default function InstagramGallery() {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_IMAGES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/instagram")
      .then((res) => res.json())
      .then((data) => {
        if (data.media?.length) {
          setSlides(mediaToSlides(data.media));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-transparent py-16 flex items-center justify-center min-h-[520px]">
        <div className="text-white/60">Загрузка галереи...</div>
      </section>
    );
  }

  return <GallerySlider images={slides} />;
}
