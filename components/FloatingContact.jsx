"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, X, MessageCircle } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const CONTACT_INFO = {
  phone: "0708880404",
  zalo: "https://zalo.me/0708880404",
  messenger: "https://m.me/umbomilk",
  email: "mailto:umbomilk@gmail.com",
  maps: "https://maps.google.com/?q=Um+Bo+Milk",
};

const defaultTokens = {
  panelBg: "white",
  panelBorder: "1px solid #f3f4f6",
  headerBg: "#F7a3a9",
  headerBorder: "none",
  itemHoverBg: "#fff0f3",
  itemIconBg: "bg-red-50",
  itemIconColor: "#ef4444",
  labelColor: "#1f2937",
  subColor: "#9ca3af",
  dividerColor: "#f3f4f6",
  fabBg: "#F7a3a9",
  fabShadow: "0 8px 24px rgba(247,163,169,0.4)",
  mobileBarBg: "white",
  mobileBarBorder: "1px solid #f3f4f6",
  mobileLabelColor: "#374151",
  mobileSubColor: "#9ca3af",
  mobileDividerColor: "#f3f4f6",
  mobilePhoneBg: "#ef4444",
  mobilePhoneColor: "white",
};

const ZaloIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size }} className="flex-shrink-0">
    <circle cx="22" cy="22" r="22" fill="url(#zalo-grad)" />
    <g clipPath="url(#zalo-clip)">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M15.274 34.0907C15.7773 34.0856 16.2805 34.0804 16.783 34.0804C16.7806 34.0636 16.7769 34.0479 16.7722 34.0333C16.777 34.0477 16.7808 34.0632 16.7832 34.0798C16.8978 34.0798 17.0124 34.0854 17.127 34.0965H25.4058C26.0934 34.0965 26.7809 34.0977 27.4684 34.0989C28.8434 34.1014 30.2185 34.1039 31.5935 34.0965H31.6222C33.5357 34.0798 35.0712 32.5722 35.0597 30.7209V27.4784C35.0597 27.4582 35.0612 27.4333 35.0628 27.4071C35.0676 27.3257 35.0731 27.2325 35.0368 27.2345C34.9337 27.2401 34.7711 27.2757 34.7138 27.3311C34.2744 27.6145 33.8483 27.924 33.4222 28.2335C32.57 28.8525 31.7179 29.4715 30.7592 29.8817C27.0284 31.0993 23.7287 31.157 20.2265 30.3385C20.0349 30.271 19.9436 30.2786 19.7816 30.292C19.6773 30.3007 19.5436 30.3118 19.3347 30.3068C19.3093 30.3077 19.2829 30.3085 19.2554 30.3093C18.9099 30.3197 18.4083 30.3348 17.8088 30.6877C16.4051 31.1034 14.5013 31.157 13.5175 31.0147C13.522 31.0245 13.5247 31.0329 13.5269 31.0407C13.5236 31.0341 13.5204 31.0275 13.5173 31.0208C13.5036 31.0059 13.4864 30.9927 13.4696 30.98C13.4163 30.9393 13.3684 30.9028 13.46 30.8268C13.4867 30.8102 13.5135 30.7929 13.5402 30.7757C13.5937 30.7412 13.6472 30.7067 13.7006 30.6771C14.4512 30.206 15.1559 29.6905 15.6199 28.9311C16.2508 28.1911 15.9584 27.9025 15.4009 27.3524L15.3799 27.3317C12.6639 24.6504 11.8647 21.8054 12.148 17.9785C12.486 15.8778 13.4829 14.0708 14.921 12.4967C15.7918 11.5433 16.8288 10.7729 17.9632 10.1299C17.9796 10.1198 17.9987 10.1116 18.0182 10.1032C18.0736 10.0793 18.1324 10.0541 18.1408 9.98023C18.1475 9.92191 18.0507 9.90264 18.0163 9.90264C17.3698 9.90264 16.7316 9.89705 16.0964 9.89148C14.8346 9.88043 13.5845 9.86947 12.3041 9.90265C10.465 9.95254 8.78889 11.1779 8.81925 13.3614C8.82689 17.2194 8.82435 21.0749 8.8218 24.9296C8.82053 26.8567 8.81925 28.7835 8.81925 30.7104C8.81925 32.5007 10.2344 34.0028 12.085 34.0749C13.1465 34.1125 14.2107 34.1016 15.274 34.0907Z"
        fill="white"/>
      <path d="M17.6768 21.6754C18.5419 21.6754 19.3555 21.6698 20.1633 21.6754C20.6159 21.6809 20.8623 21.8638 20.9081 22.213C20.9597 22.6509 20.6961 22.9447 20.2034 22.9502C19.2753 22.9613 18.3528 22.9558 17.4247 22.9558C17.1554 22.9558 16.8919 22.9669 16.6226 22.9502C16.2903 22.9336 15.9637 22.8671 15.8033 22.5345C15.6429 22.2019 15.7575 21.9026 15.9752 21.631C16.8575 20.5447 17.7455 19.4527 18.6336 18.3663C18.6851 18.2998 18.7367 18.2333 18.7883 18.1723C18.731 18.0781 18.6508 18.1224 18.582 18.1169C17.9633 18.1114 17.3388 18.1169 16.72 18.1114C16.5768 18.1114 16.4335 18.0947 16.296 18.067C15.9695 17.995 15.7689 17.679 15.8434 17.3686C15.895 17.158 16.0669 16.9862 16.2846 16.9363C16.4221 16.903 16.5653 16.8864 16.7085 16.8864C17.7284 16.8809 18.7539 16.8809 19.7737 16.8864C19.9571 16.8809 20.1347 16.903 20.3123 16.9474C20.7019 17.0749 20.868 17.4241 20.7133 17.7899C20.5758 18.1058 20.3581 18.3774 20.1404 18.649C19.3899 19.5747 18.6393 20.4948 17.8888 21.4093C17.8258 21.4814 17.7685 21.5534 17.6768 21.6754Z" fill="white"/>
      <path d="M24.3229 18.7604C24.4604 18.5886 24.6036 18.4279 24.8385 18.3835C25.2911 18.2948 25.7151 18.5775 25.7208 19.021C25.738 20.1295 25.7323 21.2381 25.7208 22.3467C25.7208 22.6349 25.526 22.8899 25.2453 22.973C24.9588 23.0783 24.6322 22.9952 24.4432 22.7568C24.3458 22.6404 24.3057 22.6183 24.1682 22.7236C23.6468 23.1338 23.0567 23.2058 22.4207 23.0063C21.4009 22.6848 20.9827 21.9143 20.8681 20.9776C20.7478 19.9632 21.0973 19.0986 22.0369 18.5664C22.816 18.1175 23.6067 18.1563 24.3229 18.7604ZM22.2947 20.7836C22.3061 21.0275 22.3863 21.2603 22.5353 21.4543C22.8447 21.8534 23.4348 21.9365 23.8531 21.6372C23.9218 21.5873 23.9848 21.5263 24.0421 21.4543C24.363 21.033 24.363 20.3402 24.0421 19.9189C23.8817 19.7027 23.6296 19.5752 23.3603 19.5697C22.7301 19.5309 22.289 20.002 22.2947 20.7836ZM28.2933 20.8168C28.2474 19.3923 29.2157 18.3281 30.5907 18.2893C32.0517 18.245 33.1174 19.1928 33.1632 20.5785C33.209 21.9808 32.321 22.973 30.9517 23.106C29.4563 23.2502 28.2704 22.2026 28.2933 20.8168ZM29.7313 20.6838C29.7199 20.961 29.8058 21.2326 29.9777 21.4598C30.2928 21.8589 30.8829 21.9365 31.2955 21.6261C31.3585 21.5818 31.41 21.5263 31.4616 21.4709C31.7939 21.0496 31.7939 20.3402 31.4673 19.9189C31.3069 19.7083 31.0548 19.5752 30.7855 19.5697C30.1668 19.5364 29.7313 19.991 29.7313 20.6838ZM27.7891 19.7138C27.7891 20.573 27.7948 21.4321 27.7891 22.2912C27.7948 22.6848 27.474 23.0118 27.0672 23.0229C26.9985 23.0229 26.924 23.0174 26.8552 23.0007C26.5688 22.9287 26.351 22.6349 26.351 22.2857V17.8791C26.351 17.6186 26.3453 17.3636 26.351 17.1031C26.3568 16.6763 26.6375 16.3992 27.0615 16.3992C27.4969 16.3936 27.7891 16.6708 27.7891 17.1142C27.7948 17.9789 27.7891 18.8491 27.7891 19.7138Z" fill="white"/>
      <path d="M22.2947 20.7828C22.289 20.0013 22.7302 19.5302 23.3547 19.5634C23.6239 19.5745 23.876 19.702 24.0364 19.9181C24.3573 20.3339 24.3573 21.0322 24.0364 21.4535C23.7271 21.8526 23.1369 21.9357 22.7187 21.6364C22.65 21.5865 22.5869 21.5255 22.5296 21.4535C22.3864 21.2595 22.3062 21.0267 22.2947 20.7828ZM29.7314 20.683C29.7314 19.9957 30.1668 19.5357 30.7856 19.569C31.0549 19.5745 31.307 19.7075 31.4674 19.9181C31.794 20.3394 31.794 21.0544 31.4617 21.4701C31.1408 21.8636 30.545 21.9302 30.1382 21.6198C30.0752 21.5754 30.0236 21.52 29.9778 21.459C29.8059 21.2318 29.7257 20.9602 29.7314 20.683Z" fill="#0068FF"/>
    </g>
    <defs>
      <linearGradient id="zalo-grad" x1="22" y1="0" x2="22" y2="44" gradientUnits="userSpaceOnUse">
        <stop offset="50%" stopColor="#3985f7"/>
        <stop offset="100%" stopColor="#1272e8"/>
      </linearGradient>
      <clipPath id="zalo-clip">
        <rect width="26.3641" height="24.2" fill="white" transform="translate(8.78906 9.90234)"/>
      </clipPath>
    </defs>
  </svg>
);

const MessengerIcon = ({ size = 20 }) => (
  <svg viewBox="0 0 48 48" fill="none" style={{ width: size, height: size }} className="flex-shrink-0">
    <rect width="48" height="48" rx="24" fill="url(#msg-grad)" />
    <defs>
      <linearGradient id="msg-grad" x1="0" y1="48" x2="48" y2="0">
        <stop offset="0%" stopColor="#0a7cff"/>
        <stop offset="100%" stopColor="#0a7cff"/>
      </linearGradient>
    </defs>
    <path d="M24 8C15.163 8 8 14.71 8 23c0 4.556 1.99 8.636 5.2 11.54V40l4.93-2.71C19.954 37.74 21.94 38 24 38c8.837 0 16-6.71 16-15S32.837 8 24 8zm1.6 20.2l-4.08-4.35-7.96 4.35 8.76-9.3 4.18 4.35 7.86-4.35-8.76 9.3z" fill="white"/>
  </svg>
);

const menuVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
};

function DesktopWidget({ t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const DESKTOP_ITEMS = [
    { id: "phone",     label: "Gọi ngay cho chúng tôi",       sub: CONTACT_INFO.phone,   href: `tel:${CONTACT_INFO.phone}`,      icon: <Phone size={20}/> },
    { id: "zalo",      label: "Chat với chúng tôi qua Zalo",  sub: "Phản hồi nhanh",     href: CONTACT_INFO.zalo,                icon: <ZaloIcon size={20}/> },
    { id: "email",     label: "Đăng ký & để lại lời nhắn",   sub: "hello@umbomilk.com", href: CONTACT_INFO.email,               icon: <Mail size={20}/> },
    { id: "maps",      label: "Xem địa chỉ doanh nghiệp",    sub: "Mở Google Maps",     href: CONTACT_INFO.maps,                icon: <MapPin size={20}/> },
  ];

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="exit"
            className="w-[300px] rounded-3xl shadow-2xl overflow-hidden"
            style={{ background: t.panelBg, border: t.panelBorder }}>
            {/* Header */}
            <div className="px-5 py-4" style={{ background: t.headerBg, border: t.headerBorder }}>
              <p className="text-white font-black text-sm uppercase tracking-wide">Liên hệ Um Bò Milk</p>
              <p className="text-white/80 text-xs mt-0.5">Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
            </div>
            {/* Items */}
            <div>
              {DESKTOP_ITEMS.map((item, i) => (
                <div key={item.id}>
                  <a href={item.href}
                    target={item.id !== "phone" && item.id !== "email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 px-4 py-3.5 transition-colors duration-200 cursor-pointer group"
                    onMouseEnter={(e) => { e.currentTarget.style.background = t.itemHoverBg; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    onClick={() => item.id === "phone" && setOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: t.itemIconBg, color: t.itemIconColor }}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-tight truncate" style={{ color: t.labelColor }}>{item.label}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: t.subColor }}>{item.sub}</p>
                    </div>
                  </a>
                  {i < DESKTOP_ITEMS.length - 1 && (
                    <div className="mx-4 h-px" style={{ background: t.dividerColor }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Đóng liên hệ" : "Mở liên hệ"}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}
        className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-shadow duration-300"
        style={{ background: t.fabBg, boxShadow: t.fabShadow }}
      >
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </motion.div>
      </motion.button>
    </div>
  );
}

function MobileBar({ t }) {
  const MOBILE_BAR_ITEMS = [
    { id: "zalo",      label: "Zalo",    href: CONTACT_INFO.zalo,              icon: <ZaloIcon size={26}/> },
    { id: "phone",     label: "Hotline", sub: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}`,
      icon: (
        <div className="w-[26px] h-[26px] rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: t.mobilePhoneBg }}>
          <Phone size={14} style={{ color: t.mobilePhoneColor }} />
        </div>
      )},
    { id: "messenger", label: "Messenger", href: CONTACT_INFO.messenger, icon: <MessengerIcon size={26}/> },
  ];

  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.12)]"
      style={{ background: t.mobileBarBg, borderTop: t.mobileBarBorder, paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex items-stretch px-2 py-2 gap-1">
        {MOBILE_BAR_ITEMS.map((item, i) => (
          <React.Fragment key={item.id}>
            <a href={item.href}
              target={item.id !== "phone" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 py-1.5 rounded-xl active:scale-95 transition-all duration-150">
              {item.icon}
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-bold" style={{ color: t.mobileLabelColor }}>{item.label}</span>
                {item.sub && <span className="text-[10px] font-medium" style={{ color: t.mobileSubColor }}>{item.sub}</span>}
              </div>
            </a>
            {i < MOBILE_BAR_ITEMS.length - 1 && (
              <div className="w-px my-1" style={{ background: t.mobileDividerColor }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}

export default function FloatingContact() {
  const { theme } = useTheme();
  const t = theme?.sectionTheme?.floatingContact ?? defaultTokens;
  return (
    <>
      <div className="hidden md:block"><DesktopWidget t={t} /></div>
      <div className="block md:hidden"><MobileBar t={t} /></div>
    </>
  );
}
