"use client";
import BannerSlider from "@/components/BannerSlider";
import Image from "next/image";
import umboFrame from "@/assets/images/umboFrame.png";
import frameAutumn from "@/assets/images/frameAutumn.png";
import ProductSection from "@/components/ProductSection";
import ComboSection from "@/components/ComboSection";
import CornerSection from "@/components/CornerSection";
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
    src: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1042588934999509%2F&show_text=false&width=267&t=0",
  },
];

function StorySection() {
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";

  const frameSrc = isMidAutumn ? frameAutumn : umboFrame;
  const sectionBg = isMidAutumn
    ? "linear-gradient(180deg, #7B0000 0%, #8B0000 100%)"
    : "#fde2e0";

  return (
    <section className="relative px-4 py-8" style={{ background: sectionBg }}>
      {/* Trang trí nhẹ khi autumn */}
      {isMidAutumn && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,228,160,0.4), transparent)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,228,160,0.4), transparent)",
            }}
          />
          {/* Ngôi sao nhỏ */}
          {[
            [8, 15],
            [92, 20],
            [15, 80],
            [85, 75],
            [50, 8],
          ].map(([x, y], i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#FFE4A0] opacity-30"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10">
        <div className="flex justify-center mb-8">
          <Image
            src={frameSrc}
            alt="Câu chuyện Ụm Bò Milk"
            className="h-auto w-auto max-w-[280px] sm:max-w-[320px]"
            priority
          />
        </div>

        {/* Video Reels */}
        <style>{`
          .reel-card { transition: transform 300ms ease, box-shadow 300ms ease; flex-shrink: 0; }
          .reel-card:hover { transform: translateY(-6px); }
          .reel-slider { display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch; scrollbar-width: none; padding-bottom: 4px; }
          .reel-slider::-webkit-scrollbar { display: none; }
          .reel-slider .reel-card { scroll-snap-align: center; }
          @media (min-width: 768px) { .reel-slider { overflow-x: visible; display: grid; grid-template-columns: repeat(3, 1fr); scroll-snap-type: none; } }
        `}</style>

        <div className="max-w-3xl mx-auto">
          <div className="reel-slider">
            {videoList.map((video) => (
              <div
                key={video.id}
                className="reel-card"
                style={{
                  borderRadius: "22px",
                  background: "#000",
                  minWidth: "min(80vw, 220px)",
                  aspectRatio: "9/16",
                  border: isMidAutumn
                    ? "1px solid rgba(255,228,160,0.2)"
                    : "1px solid rgba(247,163,169,0.25)",
                  boxShadow: isMidAutumn
                    ? "0 8px 32px rgba(0,0,0,0.45)"
                    : "0 6px 24px rgba(247,163,169,0.18)",
                  /* clip bằng clip-path thay vì overflow:hidden để không chặn touch */
                  clipPath: "inset(0 round 22px)",
                }}
              >
                <iframe
                  src={video.src}
                  width="267"
                  height="476"
                  style={{
                    border: "none",
                    width: "100%",
                    height: "100%",
                    display: "block",
                    touchAction: "auto",
                  }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            ))}
          </div>

          {/* Dot indicators — mobile only */}
          <div className="flex justify-center gap-2 mt-5 md:hidden">
            {videoList.map((v) => (
              <div
                key={v.id}
                className="w-2 h-2 rounded-full"
                style={{
                  background: isMidAutumn ? "#FFE4A0" : "#F7a3a9",
                  opacity: 0.45,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <BannerSlider />
      <StorySection />
      <ProductSection />
      <ComboSection />
      <CornerSection />
    </main>
  );
}
