"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import productImg from "@/assets/images/umboMilk.jpg";
import bannerImg from "@/assets/images/banner.jpg";
import farmImg from "@/assets/images/ỤM BÒ-05.png";
import { useTheme } from "@/components/ThemeProvider";

const defaultTokens = {
  section1Bg: "#fff3f4",
  section2Bg: "white",
  section3Bg: "#fff3f4",
  headingColor: "#F7a3a9",
  subHeadingColor: "#F7a3a9",
  bodyColor: "#374151",
  descColor: "#4b5563",
  playBtnBg: "rgba(255,255,255,0.9)",
  playBtnBorder: "none",
  playIconColor: "#F7a3a9",
  videoOverlay: "rgba(0,0,0,0.2)",
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.aboutPage ?? defaultTokens;

  return (
    <main className="flex-1">
      {/* Section 1 — Giới thiệu */}
      <section className="w-full py-16 px-4" style={{ background: t.section1Bg }}>
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
          <motion.div className="w-full md:w-[45%] flex justify-center"
            variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image src={productImg} alt="Um Bò Milk - Sữa Bò Vàng" fill className="object-cover" priority />
            </div>
          </motion.div>

          <motion.div className="w-full md:w-[55%] flex flex-col gap-5 text-left"
            variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h1 className="text-2xl sm:text-xl font-black uppercase leading-tight"
              style={{ color: t.headingColor }}>
              Giới thiệu về Um Bò Milk
            </h1>
            <p className="leading-relaxed text-base" style={{ color: t.bodyColor }}>
              Um Bò Milk là thương hiệu sữa bò tươi thuần Việt, được tạo ra với tâm huyết mang đến
              nguồn dinh dưỡng sạch, an toàn và thơm ngon cho mọi gia đình Việt Nam.
            </p>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-black uppercase" style={{ color: t.subHeadingColor }}>
                Sữa Bò Vàng Um Bò Milk
              </h2>
              <p className="leading-relaxed text-base" style={{ color: t.bodyColor }}>
                Sản phẩm được chắt lọc từ những con bò khỏe mạnh, nuôi dưỡng trong môi trường tự nhiên.
                Mỗi ly sữa Um Bò Milk đều mang hương vị béo ngậy, thơm mát đặc trưng — đúng chuẩn sữa bò vàng chất lượng cao.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-black uppercase" style={{ color: t.subHeadingColor }}>
                100% Tự Nhiên
              </h2>
              <p className="leading-relaxed text-base" style={{ color: t.bodyColor }}>
                Không chất bảo quản, không phẩm màu nhân tạo. Um Bò Milk cam kết sử dụng 100% nguyên liệu
                tự nhiên, giữ trọn dưỡng chất và hương vị thuần khiết từ thiên nhiên đến bàn ăn của bạn.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2 — Trang trại */}
      <section className="w-full py-16 px-4" style={{ background: t.section2Bg }}>
        <div className="max-w-[1200px] mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl font-black uppercase text-center mb-12"
            style={{ color: t.headingColor }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            Trang Trại Um Bò
          </motion.h2>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-16">
            <motion.div className="w-full md:w-[50%]"
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={farmImg} alt="Trang trại Um Bò" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div className="w-full md:w-[50%] flex flex-col gap-4"
              variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <h3 className="text-xl font-black uppercase" style={{ color: t.subHeadingColor }}>
                Vùng Đất Xanh Tươi
              </h3>
              <p className="leading-relaxed" style={{ color: t.bodyColor }}>
                Trang trại Um Bò tọa lạc trên vùng đất cao nguyên trong lành, nơi những đồng cỏ xanh mướt
                trải dài bất tận. Khí hậu mát mẻ, nguồn nước tinh khiết tạo nên môi trường lý tưởng để đàn bò
                phát triển khỏe mạnh tự nhiên.
              </p>
              <p className="leading-relaxed" style={{ color: t.bodyColor }}>
                Mỗi con bò tại trang trại được chăm sóc theo tiêu chuẩn nghiêm ngặt — ăn cỏ tươi, uống nước
                sạch và được kiểm tra sức khỏe định kỳ bởi đội ngũ thú y chuyên nghiệp.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-14">
            <motion.div className="w-full md:w-[50%]"
              variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden shadow-lg">
                <Image src={productImg} alt="Quy trình sản xuất" fill className="object-cover" />
              </div>
            </motion.div>
            <motion.div className="w-full md:w-[50%] flex flex-col gap-4"
              variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              <h3 className="text-xl font-black uppercase" style={{ color: t.subHeadingColor }}>
                Quy Trình Khép Kín
              </h3>
              <p className="leading-relaxed" style={{ color: t.bodyColor }}>
                Từ trang trại đến tay người tiêu dùng, Um Bò Milk kiểm soát toàn bộ chuỗi sản xuất. Sữa được
                vắt tươi, thanh trùng và đóng gói ngay tại chỗ — đảm bảo độ tươi ngon và an toàn vệ sinh thực
                phẩm tuyệt đối.
              </p>
              <p className="leading-relaxed" style={{ color: t.bodyColor }}>
                Chúng tôi tự hào là một trong những thương hiệu sữa tươi hiếm hoi tại Việt Nam sở hữu quy
                trình sản xuất khép kín từ A đến Z, không qua trung gian.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3 — Video */}
      <section className="w-full py-16 px-4" style={{ background: t.section3Bg }}>
        <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-8">
          <motion.h2
            className="text-2xl sm:text-3xl font-black uppercase text-center"
            style={{ color: t.headingColor }}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            Khám Phá Trang Trại Qua Video
          </motion.h2>
          <p className="text-center max-w-[600px]" style={{ color: t.descColor }}>
            Cùng chúng tôi dạo một vòng quanh trang trại Um Bò — nơi những ly sữa thơm ngon bắt đầu hành trình của mình.
          </p>
          <motion.div
            className="w-full max-w-[800px] rounded-2xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
            <div className="relative w-full h-[240px] sm:h-[420px]">
              <Image src={bannerImg} alt="Video trang trại Um Bò" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: t.videoOverlay }}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  style={{ background: t.playBtnBg, border: t.playBtnBorder }}>
                  <svg className="w-7 h-7 sm:w-9 sm:h-9 ml-1" fill="currentColor" viewBox="0 0 24 24"
                    style={{ color: t.playIconColor }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
