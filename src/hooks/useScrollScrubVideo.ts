import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  scrollDistance?: number;
  disabled?: boolean;
}

export function useScrollScrubVideo({ scrollDistance = 1800, disabled = false }: Options = {}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const drawFrame = () => {
      if (!ctx || !video.videoWidth) return;
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      const vw = video.videoWidth;
      const vh = video.videoHeight;
      const canvasRatio = targetW / targetH;
      const videoRatio = vw / vh;
      let sx = 0, sy = 0, sw = vw, sh = vh;
      if (videoRatio > canvasRatio) {
        sw = vh * canvasRatio;
        sx = (vw - sw) / 2;
      } else {
        sh = vw / canvasRatio;
        sy = (vh - sh) / 2;
      }
      ctx.clearRect(0, 0, targetW, targetH);
      ctx.drawImage(video, sx, sy, sw, sh, 0, 0, targetW, targetH);
    };

    const onLoadedMetadata = () => {
      setReady(true);
      video.currentTime = 0;
      drawFrame();
    };
    const onSeeked = () => drawFrame();

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("seeked", onSeeked);
    if (video.readyState >= 1) onLoadedMetadata();

    const onResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      drawFrame();
    };
    window.addEventListener("resize", onResize, { passive: true });

    let st: ScrollTrigger | undefined;

    if (!disabled) {
      const responsiveDistance = () => {
        const vw = window.innerWidth;
        if (vw < 720) return scrollDistance * 0.55;
        if (vw < 1080) return scrollDistance * 0.75;
        return scrollDistance;
      };

      st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: () => `+=${responsiveDistance()}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.4,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
          if (video.duration) {
            const t = self.progress * video.duration;
            if (Math.abs(video.currentTime - t) > 0.02) {
              try {
                video.currentTime = t;
              } catch {
                /* ignore */
              }
            }
          }
        },
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("seeked", onSeeked);
      window.removeEventListener("resize", onResize);
      st?.kill();
    };
  }, [scrollDistance, disabled]);

  return { wrapperRef, videoRef, canvasRef, progress, ready };
}
