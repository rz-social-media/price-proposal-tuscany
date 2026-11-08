"use client";

import { useEffect, useRef, useState } from "react";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${publicBasePath}${path}`;

const STORIES = [
  "/videos/story-1.mp4",
  "/videos/story-2.mp4",
  "/videos/story-3.mp4",
  "/videos/story-4.mp4",
];

export default function StoriesSection() {
  const [current, setCurrent] = useState(0);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => setInView(entry.isIntersecting)),
      { threshold: 0.45 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, current]);

  const goTo = (index: number) => {
    setCurrent((index + STORIES.length) % STORIES.length);
    setProgress(0);
  };

  const onTime = () => {
    const video = videoRef.current;
    if (video && video.duration) setProgress(video.currentTime / video.duration);
  };

  return (
    <section className="stories-section" ref={sectionRef} aria-label="Stories">
      <div className="stories-backdrop" />
      <div className="stories-frame">
        <div className="stories-progress" aria-hidden="true">
          {STORIES.map((src, i) => (
            <span key={src} className="stories-progress-track">
              <span
                className="stories-progress-fill"
                style={{ width: i < current ? "100%" : i === current ? `${progress * 100}%` : "0%" }}
              />
            </span>
          ))}
        </div>
        <video
          ref={videoRef}
          key={STORIES[current]}
          className="stories-video"
          src={asset(STORIES[current])}
          muted={muted}
          playsInline
          preload="metadata"
          onTimeUpdate={onTime}
          onEnded={() => goTo(current + 1)}
        />
        <button
          type="button"
          className="stories-tap stories-tap-prev"
          aria-label="Previous story"
          onClick={() => goTo(current - 1)}
        />
        <button
          type="button"
          className="stories-tap stories-tap-next"
          aria-label="Next story"
          onClick={() => goTo(current + 1)}
        />
        <button
          type="button"
          className="stories-sound"
          aria-label={muted ? "Unmute" : "Mute"}
          aria-pressed={!muted}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="22" y1="9" x2="16" y2="15" /><line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9.5 9.5 0 0 1 0 13" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
