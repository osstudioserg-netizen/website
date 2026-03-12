'use client';

import { useRef, useState, useEffect } from 'react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const withBase = (path: string) => `${basePath}${path}`;

const capabilities = [
  {
    title: "AI-Driven Commercial Production",
    description:
      "We produce next-generation commercial content powered by AI-enhanced production pipelines.",
    powerSentence:
      "From concept development to final delivery, our team combines cinematic direction, real-time environments, and generative technologies to create visually striking campaigns for brands and agencies. Faster production cycles. Unlimited creative possibilities.",
    videoSrc: withBase("/videos/RISE_TOWER_ENG.webm"),
  },
  {
    title: "360° HDRI Environments for Virtual Production",
    description:
      "We create ultra-high-resolution 360° HDRI environments designed specifically for virtual production pipelines.",
    powerSentence:
      "Using advanced Gaussian Splatting technology, we capture and reconstruct real locations as photorealistic lighting environments, allowing filmmakers to place actors and objects into fully immersive digital worlds with physically accurate lighting and reflections. Real locations. Rebuilt for real-time cinema.",
    videoSrc: withBase("/videos/matiasnorway.webm"),
    posterSrc: withBase("/images/001.jpg"),
  },
  {
    title: "AI-Enhanced Music Video Production",
    description:
      "We produce visually bold music videos using AI-assisted creative workflows and real-time production tools.",
    powerSentence:
      "From surreal digital worlds to stylized visual narratives, our team blends cinematic direction, generative imagery, and virtual environments to create music videos that stand out on modern streaming platforms. Where music meets next-generation visuals.",
    videoSrc: withBase("/videos/P_in_P.webm"),
    posterSrc: withBase("/images/002.jpg"),
    posterFit: "contain",
    videoFit: "cover",
  },
  {
    title: "Feature Animation Production",
    description:
      "We develop and produce feature-length animated films using our proprietary AI-assisted production pipeline.",
    powerSentence:
      "Our studio integrates local AI systems, 3D animation, facial capture, and full-body motion capture to accelerate production while maintaining cinematic quality and expressive character performance. This hybrid approach allows us to create large-scale animated stories faster and more efficiently than traditional pipelines. Technology meets storytelling.",
    videoSrc: withBase("/videos/AI.webm"),
  },
];

function VideoOnClick({
  src,
  poster,
  posterFit = "cover",
  videoFit = "contain",
}: {
  src: string;
  poster?: string;
  posterFit?: "cover" | "contain";
  videoFit?: "cover" | "contain";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(15);

  const stopVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.muted = true;
      setIsMuted(true);
    }
    setIsPlaying(false);
  };

  const playVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      void video.play();
    }
    setIsPlaying(true);
  };

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      stopVideo();
    } else {
      playVideo();
    }
  };

  // При уходе блока с экрана — останавливаем воспроизведение
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const video = videoRef.current;
          if (video) {
            video.pause();
            video.muted = true;
          }
          setIsPlaying(false);
          setIsMuted(true);
        }
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      video.volume = volume / 100;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = Number(e.target.value);
    setVolume(value);
    const video = videoRef.current;
    if (video) {
      video.volume = value / 100;
      if (value > 0) {
        video.muted = false;
        setIsMuted(false);
      } else {
        video.muted = true;
        setIsMuted(true);
      }
    }
  };

  const showPoster = poster && !isPlaying;
  const showVolumeControls = isPlaying;

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      className="relative rounded-lg overflow-hidden cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={isPlaying ? "Остановить видео" : "Воспроизвести видео"}
    >
      <video
        ref={videoRef}
        className={
          videoFit === "cover"
            ? "w-full h-full object-cover object-center"
            : "w-full h-full object-contain"
        }
        src={src}
        loop
        muted
        playsInline
        preload="metadata"
      />
      {poster && (
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ opacity: showPoster ? 1 : 0, pointerEvents: "none" }}
          aria-hidden
        >
          <img
            src={poster}
            alt=""
            className={
              posterFit === "contain"
                ? "w-full h-full object-contain object-top"
                : "w-full h-full object-cover"
            }
          />
        </div>
      )}
      {showVolumeControls && (
        <div
          className="absolute left-3 md:left-4 top-[58%] -translate-y-1/2 flex flex-col items-center gap-2 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-8 h-20 flex justify-center items-center">
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              onClick={(e) => e.stopPropagation()}
              className="absolute left-1/2 top-1/2 w-20 h-2 -translate-x-1/2 -translate-y-1/2 -rotate-90 appearance-none cursor-pointer rounded-full bg-white/30 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.9) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.3) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.3) 100%)`,
              }}
              aria-label="Громкость"
            />
          </div>
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center justify-center text-white hover:opacity-80 transition-opacity"
            aria-label={isMuted ? "Включить звук" : "Выключить звук"}
          >
            {isMuted ? (
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function AICapabilitiesSection() {
  return (
    <section className="w-full py-20 px-6 md:px-20 bg-transparent text-white">
      <div className="mx-auto max-w-[1400px]">
        {capabilities.map((item, index) => {
          const videoFirst = index % 2 === 1;
          return (
            <article
              key={index}
              className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16 py-16 lg:py-24 border-b border-white/10 last:border-b-0"
            >
              <div
                className={`flex-1 min-w-0 text-left ${videoFirst ? "lg:order-2" : ""}`}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white">
                  {item.title}
                </h2>
                <p className="mt-6 text-lg md:text-xl text-white/90">
                  {item.description}
                </p>
                <p className="mt-6 text-base md:text-lg leading-relaxed text-white/80">
                  {item.powerSentence}
                </p>
              </div>
              <div
                className={`flex-shrink-0 w-full lg:w-[42%] xl:w-[45%] max-w-2xl aspect-[2/1] rounded-lg overflow-hidden bg-black/40 ${videoFirst ? "lg:order-1" : ""}`}
              >
                <VideoOnClick
                  src={item.videoSrc}
                  poster={item.posterSrc}
                  posterFit={
                    "posterFit" in item
                      ? (item.posterFit as "contain" | "cover")
                      : undefined
                  }
                  videoFit={
                    "videoFit" in item
                      ? (item.videoFit as "contain" | "cover")
                      : undefined
                  }
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
