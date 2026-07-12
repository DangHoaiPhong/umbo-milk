"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, ChevronDown } from "lucide-react";
import { footerData } from "@/data/footer";
import chungchi from "@/assets/images/chungchi.png";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const ICON_MAP = {
  MapPin,
  Mail,
  Phone,
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
};

const SECTION_TITLE =
  "text-[#F7a3a9] font-bold uppercase tracking-widest text-sm mb-5";
const LINK_BASE =
  "text-[#F7a3a9] text-sm leading-relaxed transition-all duration-250 hover:text-white hover:translate-x-1.5 inline-block";

function ContactRow({ iconName, text, href }) {
  const Icon = ICON_MAP[iconName];
  const content = (
    <span className="flex items-start gap-2.5 text-[#F7a3a9] text-sm leading-relaxed group">
      <Icon
        size={15}
        className="mt-0.5 shrink-0 text-[#F7a3a9] transition-transform duration-200 group-hover:scale-115"
      />
      <span className="group-hover:text-white transition-colors duration-250">
        {text}
      </span>
    </span>
  );
  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function LinkList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} className={LINK_BASE}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

// Nội dung từng cột — dùng chung cho desktop & accordion
function Col1Content({ description, contacts }) {
  return (
    <div className="space-y-3">
      <p className="text-[#F7a3a9] text-sm leading-[1.8]">{description}</p>
      <div className="space-y-3 pt-1">
        {contacts.map((c, i) => (
          <ContactRow key={i} {...c} />
        ))}
      </div>
      <div className="pt-2">
        <img
          src={chungchi.src ?? chungchi}
          alt="Đã thông báo Bộ Công Thương"
          className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}

function Col4Content({ socials }) {
  return (
    <ul className="space-y-3">
      {socials.map((s) => {
        const Icon = ICON_MAP[s.iconName];
        return (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 text-[#F7a3a9] text-sm transition-all duration-250 hover:text-white hover:translate-x-1.5 group ${s.hoverClass}`}
            >
              <Icon
                size={16}
                className="shrink-0 transition-transform duration-200 group-hover:scale-115"
              />
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Accordion item tự build
function AccordionItem({ title, children, isLast }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  return (
    <div className={!isLast ? "border-b border-white/15" : ""}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-5 text-left"
      >
        <span className="text-[#F7a3a9] font-bold uppercase tracking-widest text-sm">
          {title}
        </span>
        <ChevronDown
          size={16}
          className="text-[#F7a3a9] shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <div
        ref={bodyRef}
        style={{
          maxHeight: open ? bodyRef.current?.scrollHeight + "px" : "0px",
          opacity: open ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 350ms ease-in-out, opacity 300ms ease-in-out",
        }}
      >
        <div className="px-5 pb-5">{children}</div>
      </div>
    </div>
  );
}

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 700ms ease, transform 700ms ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const { description, contacts, intro, links, socials } = footerData;

  const bgStyle = {
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#111",
  };

  return (
    <footer ref={ref} className="w-full">
      <div className="relative w-full" style={bgStyle}>
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.35)" }}
        />

        {/* ── DESKTOP: 4 cột ── */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 py-20 hidden lg:block">
          <div
            className="grid gap-10"
            style={{ gridTemplateColumns: "3fr 1fr 1fr 1.5fr" }}
          >
            <div className="space-y-5">
              <h3 className={SECTION_TITLE}>Về Um Bò Milk</h3>
              <Col1Content description={description} contacts={contacts} />
            </div>
            <div>
              <h3 className={SECTION_TITLE}>Giới thiệu</h3>
              <LinkList items={intro} />
            </div>
            <div>
              <h3 className={SECTION_TITLE}>Liên kết</h3>
              <LinkList items={links} />
            </div>
            <div>
              <h3 className={SECTION_TITLE}>Kết nối với Um Bò Milk</h3>
              <Col4Content socials={socials} />
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET: Accordion ── */}
        <div className="relative z-10 lg:hidden">
          <AccordionItem title="Về Um Bò Milk">
            <Col1Content description={description} contacts={contacts} />
          </AccordionItem>
          <AccordionItem title="Giới thiệu">
            <LinkList items={intro} />
          </AccordionItem>
          <AccordionItem title="Liên kết">
            <LinkList items={links} />
          </AccordionItem>
          <AccordionItem title="Kết nối với Um Bò Milk" isLast>
            <Col4Content socials={socials} />
          </AccordionItem>
        </div>
      </div>

      {/* Copyright bar */}
      <div
        className="w-full bg-black border-t border-white/10"
        style={{ minHeight: "60px" }}
      >
        <div className="max-w-[1280px] mx-auto px-8 h-[60px] flex items-center">
          <p className="text-[#F7a3a9] text-xs">
            © Bản quyền thuộc về UMBOMILK.COM
          </p>
        </div>
      </div>
    </footer>
  );
}
