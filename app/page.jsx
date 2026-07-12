import BannerSlider from "@/components/BannerSlider";
import Image from "next/image";
import banner from "@/assets/images/banner.jpg";
import umboFrame from "@/assets/images/umboFrame.png";
import ProductSection from "@/components/ProductSection";
import ComboSection from "@/components/ComboSection";
import FeedbackCarousel from "@/components/FeedbackCarousel";
import CornerSection from "@/components/CornerSection";

export default function Home() {
  return (
    <main className="flex-1">
      <BannerSlider />
      {/* <div className="bg-[#fde2e0]"></div> */}
      {/* Câu chuyện Ụm Bò Milk */}
      <section className="py-8 px-4 bg-[#fde2e0]">
        <div className="flex justify-center mb-8">
          <Image
            src={umboFrame}
            alt="Câu chuyện Ụm Bò Milk"
            className="h-auto w-auto max-w-[280px] sm:max-w-[320px]"
            priority
          />
        </div>

        {/* Video placeholder - responsive */}
        <div className="max-w-4xl mx-auto w-full aspect-video relative rounded-xl overflow-hidden">
          <Image
            src={banner}
            alt="Video placeholder"
            fill
            className="object-cover"
          />
        </div>
      </section>
      <ProductSection />
      <ComboSection />
      <CornerSection />
    </main>
  );
}
