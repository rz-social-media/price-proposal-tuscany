"use client";

import { useEffect, useState } from "react";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${publicBasePath}${path}`;

export default function SiteEffects({ preload }: { preload: readonly string[] }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const urls = preload.map((p) => asset(p));
    const started = Date.now();
    let loaded = 0;

    const finish = () => {
      if (cancelled) return;
      setProgress(100);
      const minShow = 700;
      const wait = Math.max(0, minShow - (Date.now() - started));
      window.setTimeout(() => {
        if (cancelled) return;
        setDone(true);
        window.setTimeout(() => !cancelled && setGone(true), 950);
      }, wait);
    };

    if (urls.length === 0) {
      finish();
    } else {
      urls.forEach((url) => {
        const img = new Image();
        const step = () => {
          loaded += 1;
          if (cancelled) return;
          setProgress(Math.round((loaded / urls.length) * 100));
          if (loaded === urls.length) finish();
        };
        img.onload = step;
        img.onerror = step;
        img.src = url;
      });
    }

    return () => {
      cancelled = true;
    };
  }, [preload]);

  useEffect(() => {
    const nav = document.querySelector(".nav");
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!done) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    const watch = () =>
      document.querySelectorAll(".reveal:not(.in)").forEach((el) => observer.observe(el));
    watch();
    const mutations = new MutationObserver(watch);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [done]);

  if (gone) return null;

  return (
    <div className={`hero-loader${done ? " done" : ""}`} aria-hidden="true">
      <img className="lk" src={asset("/images/key-cream.png")} alt="" />
      <div className="bar"><span style={{ width: `${progress}%` }} /></div>
      <div className="pct">{progress}%</div>
    </div>
  );
}
