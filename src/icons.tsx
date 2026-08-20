import React from "react";

type P = { className?: string; strokeWidth?: number };
const base = (className?: string) => className ?? "w-6 h-6";

export const IPom = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 21c-4.4 0-7.5-3-7.5-7 0-3.4 2.3-6.3 5.5-7l.7-2.5L12 5l1.3-.5.7 2.5c3.2.7 5.5 3.6 5.5 7 0 4-3.1 7-7.5 7z" />
    <path d="M10 4.5L9 2.5M14 4.5l1-2M12 5V2.8" />
    <circle cx="9.6" cy="12.4" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="14.4" cy="12.4" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="12" cy="15.6" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IOlive = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 20C8 12 14 6 21 4" />
    <path d="M9 13c-1.8-1-2.6-2.8-2.4-5 2.2-.2 4 .6 5 2.4M14 8.5c-1.8-1-2.6-2.8-2.4-5 2.2-.2 4 .6 5 2.4" />
    <circle cx="8" cy="17" r="2.2" />
    <circle cx="13.5" cy="15.5" r="2.2" />
  </svg>
);

export const IJar = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M8 3.5h8M7.5 6.5h9" />
    <path d="M8 6.5c-1.6 1.3-2.5 3-2.5 5V18a2.5 2.5 0 002.5 2.5h8A2.5 2.5 0 0018.5 18v-6.5c0-2-.9-3.7-2.5-5" />
    <path d="M6 13.5c2-1 4 1 6 0s4-1 6 0" />
  </svg>
);

export const ICheese = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M3 17.5V13c0-1 .6-1.8 1.6-2L19 7.5c1.2-.3 2 .6 2 1.8v8.2a1.5 1.5 0 01-1.5 1.5H4.5A1.5 1.5 0 013 17.5z" />
    <circle cx="8" cy="14.5" r="1.1" />
    <circle cx="13" cy="16" r="0.9" />
    <circle cx="16.5" cy="12.5" r="1.2" />
  </svg>
);

export const ILeaf = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15z" />
    <path d="M5 19c3-5.5 7-9.5 11-11.5" />
  </svg>
);

export const IDrop = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 3s6 6.6 6 11a6 6 0 01-12 0c0-4.4 6-11 6-11z" />
    <path d="M9.5 14a2.5 2.5 0 002.5 2.5" />
  </svg>
);

export const ICherry = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="8" cy="16.5" r="3.5" />
    <circle cx="17" cy="15" r="3" />
    <path d="M8 13c0-4 2-7.5 6-9M17 12c-.5-3-1.5-5.5-3-8M14 4c1.5 0 3.5.5 5 2" />
  </svg>
);

export const IWheat = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 21V8" />
    <path d="M12 8c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 8c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 13c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 13c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4zM12 18c-2.5 0-4-1.5-4-4 2.5 0 4 1.5 4 4zM12 18c2.5 0 4-1.5 4-4-2.5 0-4 1.5-4 4z" />
  </svg>
);

export const ITruck = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M1.5 6h12v11h-12zM13.5 9.5h4.6l3 3.5v4h-7.6" />
    <circle cx="6" cy="17.5" r="1.9" />
    <circle cx="17" cy="17.5" r="1.9" />
    <path d="M4 9.5h5" />
  </svg>
);

export const IShield = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 3l7.5 2.6v5.2c0 5-3.2 8.6-7.5 10.2-4.3-1.6-7.5-5.2-7.5-10.2V5.6z" />
    <path d="M8.8 12l2.2 2.2 4.2-4.4" />
  </svg>
);

export const IHand = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M7 11V5.5a1.5 1.5 0 013 0V10m0-4.5v-1a1.5 1.5 0 013 0V10m0-3.5a1.5 1.5 0 013 0V12" />
    <path d="M16 12V8.5a1.5 1.5 0 013 0V14c0 4-2.5 7-6.5 7S6 18.5 5.5 15L4 11.5a1.6 1.6 0 012.8-1.5L7 11" />
  </svg>
);

export const IPhone = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M5 4h4l1.5 4.5L8 10.5a12 12 0 005.5 5.5l2-2.5L20 15v4a2 2 0 01-2.2 2A16.8 16.8 0 013 6.2 2 2 0 015 4z" />
  </svg>
);

export const IWhats = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M12 2.2A9.7 9.7 0 002.3 12c0 1.7.4 3.3 1.2 4.8L2.2 21.8l5.1-1.3a9.7 9.7 0 004.7 1.2 9.7 9.7 0 009.7-9.7A9.7 9.7 0 0012 2.2zm0 17.7c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.3-2.9c-.2-.4.2-.4.5-1 .1-.2 0-.4 0-.5l-.7-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2.2-.2 3.9a13 13 0 005 4.6c1.9.8 2.7.9 3.6.7.6-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.5-.2z" />
  </svg>
);

export const IBag = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M5.5 8h13l-1 12.5h-11z" />
    <path d="M8.5 8V6.5a3.5 3.5 0 017 0V8" />
  </svg>
);

export const IMenu = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IX = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IPlus = ({ className, strokeWidth = 2.2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IMinus = ({ className, strokeWidth = 2.2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M5 12h14" />
  </svg>
);

export const ITrash = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4.5 6.5h15M9 6.5V4.8A1.3 1.3 0 0110.3 3.5h3.4A1.3 1.3 0 0115 4.8v1.7M6.5 6.5l.8 13A1.5 1.5 0 008.8 21h6.4a1.5 1.5 0 001.5-1.5l.8-13M10 10.5v6M14 10.5v6" />
  </svg>
);

export const IEdit = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 20h4.5L19.5 9a2.1 2.1 0 00-3-3L5.5 17z" />
    <path d="M13.5 6.5l3 3M4 20l1.5-4.5" />
  </svg>
);

export const ICheck = ({ className, strokeWidth = 2.4 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const ICopy = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5v-3a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h3" />
  </svg>
);

export const ILock = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5M12 14.5v2" />
  </svg>
);

export const IChart = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 4v16h16" />
    <path d="M8 16v-5M12 16V7M16 16v-8M20 16V10" />
  </svg>
);

export const ICoin = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <ellipse cx="12" cy="7" rx="7.5" ry="3.5" />
    <path d="M4.5 7v10c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5V7" />
    <path d="M4.5 12c0 1.9 3.4 3.5 7.5 3.5s7.5-1.6 7.5-3.5" />
  </svg>
);

export const IBox = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 3l8 4v10l-8 4-8-4V7z" />
    <path d="M4 7l8 4 8-4M12 11v10" />
  </svg>
);

export const IDoc = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M6 3h8l4 4v14H6z" />
    <path d="M14 3v4h4M9 12h6M9 15.5h6M9 8.5h2" />
  </svg>
);

export const IUser = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="12" cy="8" r="3.6" />
    <path d="M5 20.5c.8-3.7 3.6-5.7 7-5.7s6.2 2 7 5.7" />
  </svg>
);

export const IEye = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.8" />
  </svg>
);

export const IArrowDown = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
  </svg>
);

export const ISpark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
  </svg>
);

export const IMortar = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 10h16c0 4-2 6.5-5 7.3V19a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 19v-1.7C6 16.5 4 14 4 10z" />
    <path d="M13 10L19.5 3.5" />
  </svg>
);

export const IZoom = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M20.5 20.5L15.2 15.2" />
    <path d="M10.5 8v5M8 10.5h5" />
  </svg>
);

/* شعار البيت السوري: رمان داخل قوس */
export const Logo = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className ?? "w-11 h-11"}>
    <path d="M24 4C15 4 9 11 9 20v17a5 5 0 005 5h20a5 5 0 005-5V20c0-9-6-16-15-16z" fill="#B3272D" />
    <path d="M24 4C15 4 9 11 9 20v17a5 5 0 005 5h20a5 5 0 005-5V20c0-9-6-16-15-16z" fill="none" stroke="#F3DDB0" strokeWidth="1.6" opacity="0.7" />
    <circle cx="19" cy="23" r="2.6" fill="#7E181C" />
    <circle cx="29" cy="23" r="2.6" fill="#7E181C" />
    <circle cx="24" cy="30.5" r="2.6" fill="#7E181C" />
    <path d="M21 9l3-5 3 5-3 2.5z" fill="#55663C" />
    <path d="M24 11.5V8" stroke="#3D4C2B" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
