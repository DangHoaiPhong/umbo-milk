/** @type {import('../types/footer').FooterData} */
export const footerData = {
  description:
    "Um Bò Milk – thương hiệu sữa tươi thuần khiết từ những chú bò được nuôi dưỡng tự nhiên. Chúng tôi cam kết mang đến nguồn dinh dưỡng sạch, an toàn và thơm ngon cho mọi gia đình Việt.",

  contacts: [
    { iconName: "MapPin", text: "CN 1: 111 Tôn Đản, Quận 4" },
    { iconName: "MapPin", text: "CN 2: 120 Hoàng Diệu 2, Quận Thủ Đức" },
    { iconName: "MapPin", text: "CN 3: 261 Tô Hiến Thành, Quận 10" },
    { iconName: "MapPin", text: "CN 4: 130 Vạn Kiếp, Quận Bình Thạnh" },
    {
      iconName: "Mail",
      text: "umbomilk@gmail.com",
      href: "mailto:umbomilk@gmail.com",
    },
    {
      iconName: "Phone",
      text: "0708880404",
      href: "tel:0708880404",
    },
  ],

  intro: [
    { label: "Sản phẩm", href: "/products?filter=sale" },
    { label: "Sản phẩm nổi bật", href: "/products?filter=featured" },
    { label: "Tất cả sản phẩm", href: "/products" },
  ],

  links: [
    { label: "Giới thiệu", href: "/about" },
    { label: "Chính sách đổi trả", href: "/chinh-sach-doi-tra" },
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Điều khoản dịch vụ", href: "/dieu-khoan-dich-vu" },
  ],

  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/suabovang.UmBoMilk",
      iconName: "Facebook",
      hoverClass: "hover:text-[#1877F2]",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/suabovang_umbomilk?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      iconName: "Instagram",
      hoverClass: "hover:text-[#E1306C]",
    },
  ],
};
