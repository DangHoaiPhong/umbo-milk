import umboMilk from "../assets/images/umboMilk.jpg";
import img01 from "../assets/images/ỤM BÒ-01.png";
import img02 from "../assets/images/ỤM BÒ-02.png";
import img03 from "../assets/images/ỤM BÒ-03.png";
import img04 from "../assets/images/ỤM BÒ-04.png";
import img05 from "../assets/images/ỤM BÒ-05.png";
import img06 from "../assets/images/ỤM BÒ-06.png";
import img07 from "../assets/images/ỤM BÒ-07.png";
import img08 from "../assets/images/ỤM BÒ-08.png";
import img09 from "../assets/images/ỤM BÒ-09.png";
import img10 from "../assets/images/ỤM BÒ-10.png";
import img11 from "../assets/images/ỤM BÒ-11.png";
import img12 from "../assets/images/ỤM BÒ-12.png";
import img13 from "../assets/images/ỤM BÒ-13.png";
import img14 from "../assets/images/ỤM BÒ-14.png";
import img15 from "../assets/images/ỤM BÒ-15.png";
import img16 from "../assets/images/ỤM BÒ-16.png";
import img17 from "../assets/images/ỤM BÒ-17.png";
import img18 from "../assets/images/ỤM BÒ-18.png";
import img19 from "../assets/images/ỤM BÒ-19.png";
import img20 from "../assets/images/ỤM BÒ-20.png";
import img21 from "../assets/images/ỤM BÒ-21.png";
import img22 from "../assets/images/ỤM BÒ-22.png";

// stores: ["CN1","CN2","CN3","CN4"] — chi nhánh nào có sản phẩm này
export const products = [
  // ── Sữa ──────────────────────────────────────────────
  {
    id: 1,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Không Đường",
    volume: "Chai 900ml",
    price: 45000,
    oldPrice: 50000,
    discount: 10,
    image: img14,
    description:
      "Sữa bò thanh trùng dịu nhẹ, mang đến cảm giác dễ uống và thanh mát mỗi ngày.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 2,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Ít Đường",
    volume: "Chai 500ml",
    price: 32000,
    isNew: true,
    image: img13,
    description: "Hương vị ngọt vừa đủ, giữ được sự dịu nhẹ và dễ thưởng thức.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 3,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Vị Dâu",
    volume: "Chai 1000ml",
    price: 55000,
    oldPrice: 62000,
    discount: 11,
    image: img12,
    description:
      "Vị dâu chua ngọt dịu dàng, tạo nên cảm giác tươi mới và vui vẻ.",
    stores: ["CN1", "CN3", "CN4"],
  },
  {
    id: 4,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Vị Banana",
    volume: "Chai 750ml",
    price: 48000,
    isNew: true,
    image: img11,
    description: "Hương chuối thơm bùi, mang đến cảm giác ấm áp và dễ thương.",
    stores: ["CN2", "CN3"],
  },
  {
    id: 5,
    category: "Sữa",
    name: "Sữa Bò Tươi Nguyên Chất",
    volume: "Chai 1000ml",
    price: 52000,
    image: img03,
    description:
      "Sữa bò tươi thơm dịu, giữ nguyên cảm giác tự nhiên và mịn màng.",
    stores: ["CN1", "CN2", "CN4"],
  },
  {
    id: 6,
    category: "Sữa",
    name: "Sữa Bò Tươi Có Đường",
    volume: "Chai 500ml",
    price: 30000,
    oldPrice: 35000,
    discount: 14,
    image: img04,
    description:
      "Vị sữa ngọt dịu, phù hợp cho những lần uống thư giãn nhẹ nhàng.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 7,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Vị Socola",
    volume: "Chai 750ml",
    price: 46000,
    isNew: true,
    image: img05,
    description:
      "Hương socola thơm đậm, kết hợp cùng sữa béo dịu để tạo nên trải nghiệm hấp dẫn.",
    stores: ["CN2", "CN4"],
  },
  {
    id: 8,
    category: "Sữa",
    name: "Sữa Bò Tươi Vị Matcha",
    volume: "Chai 500ml",
    price: 38000,
    image: img06,
    description:
      "Hương matcha thanh nhẹ, kết hợp cùng vị sữa mềm mịn và dễ chịu.",
    stores: ["CN1", "CN3"],
  },
  {
    id: 9,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Vị Cà Phê",
    volume: "Chai 750ml",
    price: 42000,
    oldPrice: 48000,
    discount: 13,
    image: img07,
    description:
      "Hương cà phê đậm đà, quyện cùng sữa mềm mịn để uống vừa thư giãn.",
    stores: ["CN3", "CN4"],
  },
  {
    id: 10,
    category: "Sữa",
    name: "Sữa Bò Tươi Vị Xoài",
    volume: "Chai 500ml",
    price: 35000,
    isNew: true,
    image: img08,
    description:
      "Vị xoài ngọt mát và hương thơm tự nhiên, rất phù hợp cho những ngày cần năng lượng.",
    stores: ["CN1", "CN2"],
  },
  {
    id: 11,
    category: "Sữa",
    name: "Sữa Bò Thanh Trùng Vị Dừa",
    volume: "Chai 1000ml",
    price: 58000,
    image: img09,
    description: "Hương dừa thơm dịu, mang lại cảm giác béo mịn và dễ thương.",
    stores: ["CN2", "CN3", "CN4"],
  },
  {
    id: 12,
    category: "Sữa",
    name: "Sữa Bò Tươi Nguyên Kem",
    volume: "Chai 900ml",
    price: 50000,
    oldPrice: 56000,
    discount: 11,
    image: img10,
    description:
      "Sữa thơm béo và mịn, phù hợp cho những ai thích vị sữa đậm đà.",
    stores: ["CN1", "CN4"],
  },

  // ── Váng sữa ─────────────────────────────────────────
  {
    id: 13,
    category: "Váng sữa",
    name: "Váng Sữa Tươi Nguyên Chất",
    volume: "Hũ 100g",
    price: 25000,
    isNew: true,
    image: img01,
    description:
      "Mềm mịn và béo ngậy, mang đến trải nghiệm thưởng thức thư giãn.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 14,
    category: "Váng sữa",
    name: "Váng Sữa Vị Dâu",
    volume: "Hũ 100g",
    price: 28000,
    oldPrice: 32000,
    discount: 13,
    image: img02,
    description:
      "Vị dâu chua ngọt nhẹ, giúp mỗi lần ăn váng sữa trở nên tươi mới hơn.",
    stores: ["CN1", "CN3"],
  },
  {
    id: 15,
    category: "Váng sữa",
    name: "Váng Sữa Vị Vani",
    volume: "Hũ 100g",
    price: 27000,
    image: img17,
    description: "Hương vani thơm dịu, tạo nên cảm giác ngọt nhẹ và dễ chịu.",
    stores: ["CN2", "CN4"],
  },

  // ── Đồ ăn vặt / Bánh kẹo ────────────────────────────
  {
    id: 16,
    category: "Đồ ăn vặt/Bánh kẹo",
    name: "Bánh Kẹo Um Bò",
    volume: "Hộp 200g",
    price: 45000,
    oldPrice: 52000,
    discount: 13,
    image: img15,
    description:
      "Một món ăn vặt tiện lợi với hương vị thơm ngon, phù hợp cho nhiều lúc thưởng thức.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },

  // ── Combo ─────────────────────────────────────────────
  {
    id: 17,
    category: "Combo",
    name: "Combo Tháng Tiết Kiệm",
    volume: "24 chai 500ml",
    price: 690000,
    oldPrice: 768000,
    discount: 10,
    image: img16,
    description:
      "Gói sẵn nhiều lựa chọn tiện lợi, giúp bạn dễ dàng chọn món phù hợp trong tuần.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 18,
    category: "Combo",
    name: "Combo Văn Phòng",
    volume: "12 chai 1000ml",
    price: 580000,
    isNew: true,
    image: img18,
    description:
      "Thích hợp cho những ngày bận rộn, dễ mang theo và thưởng thức nhanh.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 19,
    category: "Combo",
    name: "Combo Váng Sữa Mix",
    volume: "10 hũ 100g",
    price: 240000,
    oldPrice: 280000,
    discount: 14,
    image: img20,
    description: "Sự kết hợp nhiều hương vị giúp trải nghiệm thêm phần thú vị.",
    stores: ["CN2", "CN3", "CN4"],
  },
  {
    id: 20,
    category: "Combo",
    name: "Combo Đặc Biệt Um Bò",
    volume: "Hộp quà tặng",
    price: 350000,
    isNew: true,
    image: img21,
    description: "Một gói quà nhẹ nhàng và tiện lợi cho những dịp cần gửi gắm.",
    stores: ["CN1", "CN3"],
  },
  {
    id: 21,
    category: "Combo",
    name: "Combo Sữa & Váng Sữa",
    volume: "4 chai + 4 hũ",
    price: 290000,
    oldPrice: 320000,
    discount: 9,
    image: img22,
    stores: ["CN1", "CN2", "CN4"],
  },

  // ── Sản phẩm khác ─────────────────────────────────────
  {
    id: 22,
    category: "Sản phẩm khác",
    name: "Túi Giữ Nhiệt",
    price: 20000,
    image: img19,
    description:
      "Một phụ kiện tiện lợi để giữ đồ uống ấm hoặc lạnh lâu hơn trong ngày.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },

  // ── Trung Thu: Hộp Quà Biếu Cao Cấp ──────────────────
  {
    id: 101,
    category: "Hộp Quà Biếu",
    name: "Hộp Quà Trung Thu Cao Cấp Vàng",
    volume: "Hộp 6 sản phẩm",
    price: 450000,
    oldPrice: 520000,
    discount: 13,
    image: img21,
    description: "Một hộp quà sang trọng với cảm giác lễ hội và đầy ý nghĩa.",
    isNew: true,
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 102,
    category: "Hộp Quà Biếu",
    name: "Hộp Quà Trung Thu Đặc Biệt",
    volume: "Hộp 8 sản phẩm",
    price: 680000,
    oldPrice: 780000,
    discount: 13,
    image: img20,
    description:
      "Sự kết hợp tinh tế giữa các món quà, rất phù hợp để biếu tặng dịp trung thu.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 103,
    category: "Hộp Quà Biếu",
    name: "Hộp Quà Sữa Tươi Premium",
    volume: "Hộp 4 chai 1000ml",
    price: 320000,
    oldPrice: 360000,
    discount: 11,
    image: img16,
    stores: ["CN1", "CN3", "CN4"],
  },
  {
    id: 104,
    category: "Hộp Quà Biếu",
    name: "Hộp Quà Váng Sữa Cao Cấp",
    volume: "Hộp 12 hũ 100g",
    price: 290000,
    isNew: true,
    image: img22,
    stores: ["CN1", "CN2", "CN4"],
  },

  // ── Trung Thu: Bánh Truyền Thống / Combo ──────────────
  {
    id: 201,
    category: "Bánh & Combo",
    name: "Bánh Nướng Nhân Thập Cẩm",
    volume: "Hộp 4 cái",
    price: 180000,
    oldPrice: 210000,
    discount: 14,
    image: img15,
    description:
      "Bánh mềm thơm, mang đến cảm giác ngọt ngào và ấm áp trong dịp lễ hội.",
    isNew: true,
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 202,
    category: "Bánh & Combo",
    name: "Bánh Dẻo Nhân Đậu Xanh",
    volume: "Hộp 4 cái",
    price: 160000,
    oldPrice: 185000,
    discount: 14,
    image: img17,
    description:
      "Bánh dẻo thơm nhẹ, phù hợp để cùng gia đình chia sẻ trong những buổi sum vầy.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 203,
    category: "Bánh & Combo",
    name: "Combo Bánh + Sữa Trung Thu",
    volume: "2 bánh + 2 chai 500ml",
    price: 250000,
    oldPrice: 290000,
    discount: 14,
    image: img18,
    description:
      "Combo tiện lợi vừa thơm ngon vừa dễ dàng mang đi trong những ngày lễ.",
    isNew: true,
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 204,
    category: "Bánh & Combo",
    name: "Combo Gia Đình Trung Thu",
    volume: "4 bánh + 4 chai 1000ml",
    price: 520000,
    oldPrice: 600000,
    discount: 13,
    image: img16,
    stores: ["CN1", "CN3", "CN4"],
  },

  // ── Trung Thu: Đồ Chơi / Đèn Lồng Cho Bé ─────────────
  {
    id: 301,
    category: "Đèn Lồng & Đồ Chơi",
    name: "Đèn Lồng Ngôi Sao Phát Sáng",
    volume: "1 cái kèm pin",
    price: 45000,
    oldPrice: 55000,
    discount: 18,
    image: img01,
    description:
      "Đèn lồng phát sáng rực rỡ, tạo nên không khí lễ hội thật đáng yêu.",
    isNew: true,
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 302,
    category: "Đèn Lồng & Đồ Chơi",
    name: "Đèn Lồng Cá Chép Truyền Thống",
    volume: "1 cái",
    price: 35000,
    image: img02,
    description:
      "Thiết kế truyền thống và màu sắc ấm áp, phù hợp cho không gian trung thu.",
    stores: ["CN1", "CN2", "CN3", "CN4"],
  },
  {
    id: 303,
    category: "Đèn Lồng & Đồ Chơi",
    name: "Set Đồ Chơi Trung Thu Cho Bé",
    volume: "Bộ 5 món",
    price: 120000,
    oldPrice: 145000,
    discount: 17,
    image: img03,
    description:
      "Bộ đồ chơi nhỏ xinh giúp bé vừa vui chơi vừa tận hưởng không khí mùa lễ hội.",
    isNew: true,
    stores: ["CN1", "CN2", "CN4"],
  },
  {
    id: 304,
    category: "Đèn Lồng & Đồ Chơi",
    name: "Đèn Lồng Thỏ Ngọc Dễ Thương",
    volume: "1 cái kèm nến",
    price: 55000,
    oldPrice: 65000,
    discount: 15,
    image: img04,
    description:
      "Đèn lồng dễ thương với ánh sáng ấm áp, tạo cảm giác vừa ngọt ngào vừa dịu dàng.",
    stores: ["CN1", "CN3"],
  },
];
