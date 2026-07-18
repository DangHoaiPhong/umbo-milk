import img11 from "../assets/images/ỤM BÒ-11.png";
import img06 from "../assets/images/ỤM BÒ-06.png";
import img13 from "../assets/images/ỤM BÒ-13.png";
import img01 from "../assets/images/ỤM BÒ-01.png";
import img07 from "../assets/images/ỤM BÒ-07.png";
import img08 from "../assets/images/ỤM BÒ-08.png";
import img16 from "../assets/images/ỤM BÒ-16.png";

export const popularProducts = [
  {
    id: 1,
    name: "Sữa Bò Thanh Trùng Vị Banana",
    description: "Hương chuối ngọt dịu, giàu kali và vitamin B6 từ sữa bò tươi nguyên chất",
    price: 48000,
    image: img11,
    inStock: true,
  },
  {
    id: 2,
    name: "Sữa Bò Tươi Vị Matcha",
    description: "Matcha Nhật Bản thơm dịu kết hợp sữa bò tươi, thanh mát và bổ dưỡng",
    price: 38000,
    image: img06,
    inStock: true,
  },
  {
    id: 3,
    name: "Sữa Bò Thanh Trùng Ít Đường",
    description: "Giữ nguyên dưỡng chất tự nhiên, ít đường phù hợp cho người ăn kiêng",
    price: 32000,
    image: img13,
    inStock: true,
  },
  {
    id: 4,
    name: "Váng Sữa Tươi Nguyên Chất",
    description: "Béo ngậy, giàu canxi và protein, thích hợp cho cả gia đình",
    price: 25000,
    image: img01,
    inStock: true,
  },
  {
    id: 5,
    name: "Sữa Bò Thanh Trùng Vị Cà Phê",
    description: "Hương cà phê đậm đà hoà quyện cùng sữa bò tươi, tỉnh táo cả ngày",
    price: 42000,
    image: img07,
    inStock: false,
  },
  {
    id: 6,
    name: "Sữa Bò Tươi Vị Xoài",
    description: "Xoài nhiệt đới ngọt thanh, bổ sung vitamin C tự nhiên",
    price: 35000,
    image: img08,
    inStock: true,
  },
];

// Ảnh banner nổi bật bên phải
export { img16 as bannerImage };
