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

export const ITruck = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M2.5 5.5h11.5v11H2.5zM14 9h4l3 3.5V16.5h-7" />
    <circle cx="6.5" cy="17.5" r="1.8" />
    <circle cx="17" cy="17.5" r="1.8" />
    <path d="M8.3 16.5h7" />
  </svg>
);

export const IShield = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 3l7 2.5v5.2c0 4.6-3 8.2-7 9.8-4-1.6-7-5.2-7-9.8V5.5z" />
    <path d="M9 11.8l2.2 2.2L15.4 9.6" />
  </svg>
);

export const IMortar = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 10h16c0 4-2.5 7-6.5 7.5V19a1.5 1.5 0 01-1.5 1.5h-.5A1.5 1.5 0 0110 19v-1.5C6 17 3.5 14 4 10z" />
    <path d="M13.5 10L19 3.5M5.5 10c1-.5 2 .5 3 0" />
  </svg>
);

export const IHand = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M8 12V5.8a1.4 1.4 0 012.8 0V11m0-6.2a1.4 1.4 0 012.8 0V11m0-5.2a1.4 1.4 0 012.8 0v7.7c0 3.9-2.6 6.5-6.3 6.5-3 0-4.6-1.5-6-4.2L2.6 13a1.5 1.5 0 012.5-1.6L6.6 13V7.2A1.4 1.4 0 018 5.8" />
  </svg>
);

export const IWheat = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 21V8" />
    <path d="M12 8c-2.8 0-4.5-1.8-4.5-4.5C10.3 3.5 12 5.3 12 8zM12 8c2.8 0 4.5-1.8 4.5-4.5C13.7 3.5 12 5.3 12 8z" />
    <path d="M12 13c-2.8 0-4.5-1.8-4.5-4.5 2.8 0 4.5 1.8 4.5 4.5zM12 13c2.8 0 4.5-1.8 4.5-4.5-2.8 0-4.5 1.8-4.5 4.5z" />
  </svg>
);

export const ICoin = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v9M9.5 9.8c0-1 1.1-1.8 2.5-1.8s2.5.7 2.5 1.7c0 2.6-5 1.9-5 4.6 0 1 1.1 1.7 2.5 1.7s2.5-.8 2.5-1.8" />
  </svg>
);

export const IChart = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 4v16h16" />
    <path d="M8 16v-5M12 16V7M16 16v-8" />
  </svg>
);

export const IBox = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M3.5 8L12 3.5 20.5 8v8L12 20.5 3.5 16z" />
    <path d="M3.5 8L12 12.5 20.5 8M12 12.5v8" />
  </svg>
);

export const IDoc = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M6 3.5h8l4 4V20.5H6z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
  </svg>
);

export const IBag = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M5 8h14l-1 12.5H6z" />
    <path d="M8.5 10.5V7a3.5 3.5 0 017 0v3.5" />
  </svg>
);

export const IUser = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" />
  </svg>
);

export const ILock = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 018 0v2.5" />
    <circle cx="12" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

export const IEye = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IEdit = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4 20h4l11-11a2.1 2.1 0 00-3-3L5 17z" />
    <path d="M13.5 6.5l3 3" />
  </svg>
);

export const ITrash = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4.5 6.5h15M9.5 6.5V4.5h5v2M6.5 6.5l1 13.5h9l1-13.5" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const ICopy = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5v-3a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h3" />
  </svg>
);

export const IX = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IPlus = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IMinus = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M5 12h14" />
  </svg>
);

export const ICheck = ({ className, strokeWidth = 2.2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M4.5 12.5l5 5L19.5 7" />
  </svg>
);

export const IMenu = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" className={base(className)}>
    <path d="M4 6.5h16M4 12h16M4 17.5h10" />
  </svg>
);

export const IArrowDown = ({ className, strokeWidth = 2 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <path d="M12 4v15M6 13.5l6 6 6-6" />
  </svg>
);

export const IWhats = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M12.04 2a9.9 9.9 0 00-8.5 14.96L2 22l5.18-1.5A9.9 9.9 0 1012.04 2zm0 18.1a8.2 8.2 0 01-4.2-1.16l-.3-.18-3.07.9.92-3-.2-.31a8.2 8.2 0 116.85 3.75zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.78.97-.15.16-.29.18-.53.06a6.7 6.7 0 01-1.97-1.22 7.4 7.4 0 01-1.36-1.7c-.14-.25-.02-.38.1-.5.12-.12.25-.3.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.44.06-.66.3-.23.25-.87.85-.87 2.07s.9 2.4 1.02 2.57c.12.17 1.75 2.67 4.23 3.74.6.26 1.05.41 1.41.53.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.29z" />
  </svg>
);

export const ISpark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)}>
    <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
  </svg>
);

export const IZoom = ({ className, strokeWidth = 1.8 }: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={base(className)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.3 15.3L21 21" />
    <path d="M10.5 7.8v5.4M7.8 10.5h5.4" />
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
