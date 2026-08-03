"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Mail, Phone, ChevronDown } from "lucide-react";
import { footerData } from "@/data/footer";
import chungchi from "@/assets/images/chungchi.png";
import { useTheme } from "@/components/ThemeProvider";

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

// ── Trang trí Footer Trung Thu ────────────────────────────────────────────────
function FooterDecor({ accentTop }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes footerFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes footerGlow{0%,100%{opacity:.15}50%{opacity:.35}}
      `}</style>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: accentTop }}
      />
      <div
        className="absolute -top-8 -right-8 h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,228,160,0.12) 0%, transparent 70%)",
        }}
      />
      <svg
        className="absolute left-6 top-6 h-14 w-10 opacity-20"
        style={{ animation: "footerFloat 4s ease-in-out infinite" }}
        viewBox="0 0 40 56"
        fill="none"
      >
        <line
          x1="20"
          y1="0"
          x2="20"
          y2="6"
          stroke="#FFE4A0"
          strokeWidth="1.2"
        />
        <rect x="5" y="6" width="30" height="4" rx="2" fill="#c0392b" />
        <ellipse cx="20" cy="30" rx="15" ry="18" fill="#FFE4A0" opacity=".8" />
        <ellipse cx="20" cy="30" rx="7" ry="9" fill="white" opacity=".1" />
        <rect x="5" y="46" width="30" height="4" rx="2" fill="#c0392b" />
      </svg>
      <svg
        className="absolute right-6 top-6 h-12 w-8 opacity-20"
        style={{ animation: "footerFloat 3.5s ease-in-out .7s infinite" }}
        viewBox="0 0 32 48"
        fill="none"
      >
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="5"
          stroke="#FFE4A0"
          strokeWidth="1.2"
        />
        <rect x="4" y="5" width="24" height="3" rx="1.5" fill="#c0392b" />
        <ellipse cx="16" cy="25" rx="12" ry="15" fill="#ffb347" opacity=".75" />
        <rect x="4" y="38" width="24" height="3" rx="1.5" fill="#c0392b" />
      </svg>
      <svg
        className="absolute -bottom-6 -left-6 h-32 w-32 opacity-10"
        viewBox="0 0 128 128"
        fill="none"
      >
        <circle cx="20" cy="108" r="55" stroke="#FFE4A0" strokeWidth="1" />
        <circle cx="20" cy="108" r="40" stroke="#FFE4A0" strokeWidth=".7" />
        <circle cx="20" cy="108" r="25" stroke="#FFE4A0" strokeWidth=".5" />
      </svg>
      {[
        [20, 30],
        [80, 20],
        [40, 70],
        [70, 60],
        [10, 80],
        [90, 75],
      ].map(([x, y], i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-[#FFE4A0]"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            animation: `footerGlow ${1.8 + i * 0.35}s ease-in-out ${i * 0.25}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ContactRow({ iconName, text, href, ft }) {
  const Icon = ICON_MAP[iconName];
  const content = (
    <span
      className="flex items-start gap-2.5 text-sm leading-relaxed group"
      style={{ color: ft.contactColor }}
    >
      <Icon
        size={15}
        className="mt-0.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ color: ft.iconColor }}
      />
      <span className="transition-colors duration-200 group-hover:text-white">
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

function LinkList({ items, ft }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="text-sm leading-relaxed transition-all duration-200 hover:translate-x-1.5 inline-block"
            style={{ color: ft.linkColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ft.linkHoverColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ft.linkColor;
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Col1Content({ description, contacts, ft }) {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-[1.8]" style={{ color: ft.descColor }}>
        {description}
      </p>
      <div className="space-y-3 pt-1">
        {contacts.map((c, i) => (
          <ContactRow key={i} {...c} ft={ft} />
        ))}
      </div>
      <div className="pt-2">
        <img
          src={chungchi.src ?? chungchi}
          alt="Đã thông báo Bộ Công Thương"
          className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );
}

function Col4Content({ socials, ft }) {
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
              className="flex items-center gap-2.5 text-sm transition-all duration-200 hover:translate-x-1.5 group"
              style={{ color: ft.linkColor }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = ft.linkHoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = ft.linkColor;
              }}
            >
              <Icon
                size={16}
                className="shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ color: ft.iconColor }}
              />
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function AccordionItem({ title, children, isLast, ft }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  return (
    <div
      style={{ borderBottom: isLast ? "none" : `1px solid ${ft.dividerColor}` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 px-5 text-left"
      >
        <span
          className="font-bold uppercase text-sm"
          style={{
            color: ft.sectionTitleColor,
            letterSpacing: ft.sectionTitleTracking,
          }}
        >
          {title}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: ft.chevronColor,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 300ms",
          }}
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

// ── Default footer tokens (pink-classic) ─────────────────────────────────────
const defaultFt = {
  sectionTitleColor: "#F7a3a9",
  sectionTitleTracking: "0.15em",
  linkColor: "#F7a3a9",
  linkHoverColor: "#FFFFFF",
  iconColor: "#F7a3a9",
  descColor: "#F7a3a9",
  contactColor: "#F7a3a9",
  dividerColor: "rgba(255,255,255,0.15)",
  chevronColor: "#F7a3a9",
  copyrightColor: "#F7a3a9",
  copyrightAccent: null,
  copyrightLabel: null,
};

export default function Footer() {
  const ref = useRef(null);
  const { theme } = useTheme();
  const isMidAutumn = theme?.id === "trung-thu";
  const ft = isMidAutumn ? theme?.sectionTheme?.footer : defaultFt;

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

  const footerBg = isMidAutumn
    ? { background: ft?.bg }
    : {
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#111",
      };

  const copyrightStyle = isMidAutumn
    ? {
        background: ft?.copyrightBg,
        borderTop: ft?.copyrightBorder,
        minHeight: "60px",
      }
    : {
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        minHeight: "60px",
      };

  const sectionTitleStyle = {
    color: ft?.sectionTitleColor,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: ft?.sectionTitleTracking,
    fontSize: "13px",
    marginBottom: "20px",
    display: "block",
  };

  return (
    <footer ref={ref} className="w-full">
      <div className="relative w-full" style={footerBg}>
        {!isMidAutumn && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.35)" }}
          />
        )}
        {isMidAutumn && <FooterDecor accentTop={ft?.accentTop} />}

        {/* ── DESKTOP ── */}
        <div className="relative z-10 mx-auto hidden max-w-7xl px-8 py-20 lg:block">
          <div
            className="grid gap-10"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1.5fr" }}
          >
            <div className="space-y-5">
              <span style={sectionTitleStyle}>Về Um Bò Milk</span>
              <Col1Content
                description={description}
                contacts={contacts}
                ft={ft}
              />
            </div>
            <div>
              <span style={sectionTitleStyle}>Giới thiệu</span>
              <LinkList items={intro} ft={ft} />
            </div>
            <div>
              <span style={sectionTitleStyle}>Liên kết</span>
              <LinkList items={links} ft={ft} />
            </div>
            <div>
              <span style={sectionTitleStyle}>Kết nối với Um Bò Milk</span>
              <Col4Content socials={socials} ft={ft} />
            </div>
          </div>
        </div>

        {/* ── MOBILE / TABLET ── */}
        <div className="relative z-10 lg:hidden">
          {[
            "Về Um Bò Milk",
            "Giới thiệu",
            "Liên kết",
            "Kết nối với Um Bò Milk",
          ].map((title, i) => (
            <AccordionItem key={title} title={title} isLast={i === 3} ft={ft}>
              {i === 0 && (
                <Col1Content
                  description={description}
                  contacts={contacts}
                  ft={ft}
                />
              )}
              {i === 1 && <LinkList items={intro} ft={ft} />}
              {i === 2 && <LinkList items={links} ft={ft} />}
              {i === 3 && <Col4Content socials={socials} ft={ft} />}
            </AccordionItem>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full" style={copyrightStyle}>
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-8">
          <p className="text-xs" style={{ color: ft?.copyrightColor }}>
            © Bản quyền thuộc về UMBOMILK.COM
          </p>
          {ft?.copyrightLabel && (
            <p
              className="text-xs opacity-50"
              style={{ color: ft?.copyrightAccent }}
            >
              {ft.copyrightLabel}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
