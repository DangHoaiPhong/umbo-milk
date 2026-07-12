"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import productImg from "@/assets/images/umboMilk.jpg";
import FeedbackCarousel from "@/components/FeedbackCarousel";

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <section className="w-full bg-[#fde2e0] py-16 px-4">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14">
          {/* Cột trái - Hình ảnh */}
          <motion.div
            className="w-full md:w-[45%] flex justify-center"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={productImg}
                alt="Um Bò Milk - Sữa Bò Vàng"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Cột phải - Nội dung */}
          <motion.div
            className="w-full md:w-[55%] flex flex-col gap-5 text-left"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-[#e8547a] leading-tight">
              Giới thiệu về Um Bò Milk
            </h1>

            <p className="text-gray-700 leading-relaxed text-base">
              Um Bò Milk là thương hiệu sữa bò tươi thuần Việt, được tạo ra với
              tâm huyết mang đến nguồn dinh dưỡng sạch, an toàn và thơm ngon cho
              mọi gia đình Việt Nam.
            </p>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-black uppercase text-[#e8547a]">
                Sữa Bò Vàng Um Bò Milk
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Sản phẩm được chắt lọc từ những con bò khỏe mạnh, nuôi dưỡng
                trong môi trường tự nhiên. Mỗi ly sữa Um Bò Milk đều mang hương
                vị béo ngậy, thơm mát đặc trưng — đúng chuẩn sữa bò vàng chất
                lượng cao.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-black uppercase text-[#e8547a]">
                100% Tự Nhiên
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                Không chất bảo quản, không phẩm màu nhân tạo. Um Bò Milk cam kết
                sử dụng 100% nguyên liệu tự nhiên, giữ trọn dưỡng chất và hương
                vị thuần khiết từ thiên nhiên đến bàn ăn của bạn.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <FeedbackCarousel />
    </main>
  );
}
