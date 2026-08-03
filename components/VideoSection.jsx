"use client";
import { useRef } from "react";
import { useTheme } from "@/components/ThemeProvider";

const videoList = [
  {
    id: 1,
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1755361662124280%2F&show_text=false&width=267&t=0",
  },
  {
    id: 2,
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2582729398844872%2F&show_text=false&width=267&t=0",
  },
  {
    id: 3,
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2582729398844872%2F&show_text=false&width=267&t=0",
  },
];

export default function VideoSection() {
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const sliderRef = useRef(null);

  const sectionBg = isMidAutumn
    ? "linear-gradient(180deg, #7B0000 0%, #8B0000 100%)"
    : "#fff8fb";

  const titleColor = isMidAutumn ? "#FFE4A0" : "#2d3748";
  const subtitleColor = isMidAutumn ? "rgba(255,228,160,0.7)" : "#718096";
  const accentColor = isMidAutumn ? "#FFE4A0" : "#F7a3a9";

  return (
    <section className="py-14 px-4 w-full" style={{ background: sectionBg }}>
      <style>{`
        .video-card {
          transition: transform 300ms ease, box-shadow 300ms ease;
          flex-shrink: 0;
        }
        .video-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.14) !important;
        }
        .video-slider {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .video-slider::-webkit-scrollbar { display: none; }
        .video-slider .video-card {
          scroll-snap-align: center;
        }
        @media (min-width: 768px) {
          .video-slider {
            overflow-x: visible;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            scroll-snap-type: none;
          }
        }
        @media (min-width: 1024px) {
          .video-slider {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className="text-xs font-semibold tracking-[0.3em] uppercase mb-2"
            style={{ color: subtitleColor }}
          >
            Những khoảnh khắc nổi bật từ UmBo Milk
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold"
            style={{ color: titleColor }}
          >
            KHÁM PHÁ UMBO MILK
          </h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <div
              className="h-0.5 w-10 rounded-full"
              style={{ background: accentColor }}
            />
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: accentColor, opacity: 0.5 }}
            />
            <div
              className="h-0.5 w-5 rounded-full"
              style={{ background: accentColor, opacity: 0.4 }}
            />
          </div>
        </div>

        {/* Video Grid / Slider */}
        <div className="video-slider" ref={sliderRef}>
          {videoList.map((video) => (
            <div
              key={video.id}
              className="video-card"
              style={{
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                background: "#000",
                /* mobile: chiếm ~85vw để thấy card kế tiếp */
                minWidth: "min(85vw, 267px)",
                aspectRatio: "9/16",
                position: "relative",
              }}
            >
              <iframe
                src={video.src}
                width="267"
                height="476"
                style={{
                  border: "none",
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          ))}
        </div>

        {/* Dot indicators (mobile only) */}
        <div className="mt-6 flex justify-center gap-2 md:hidden">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="h-2 w-2 rounded-full"
              style={{ background: accentColor, opacity: 0.4 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
