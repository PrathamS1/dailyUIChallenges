import BackToHome from "./BackToHome";

export default function IconSet() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-200 gap-8">
        <h2 className="font-[DM_Sans] text-4xl font-medium">Icon Set</h2>
        <div className="grid grid-cols-4 gap-8 text-zinc-700">
          <MonitorIcon />
          <CloudIcon />
          <CheckIcon />
          <FolderIcon />
          <GearIcon />
          <BellIcon />
          <BarChartIcon />
          <UserIcon />
        </div>
      </div>
      <BackToHome challengeDay="55" challengeTitle="Icon Set" />
    </>
  );
}

const iconStyle =
  "w-12 h-12 stroke-[2] hover:scale-110 transition-transform duration-200";

function MonitorIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <line x1="8" y1="20" x2="16" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.3 1.5A4 4 0 0 0 6 19h11.5z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <polyline
        points="8 12 11 15 16 9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      className={`${iconStyle} animate-bounce`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <line x1="4" y1="19" x2="20" y2="19" />
      <rect x="6" y="10" width="3" height="9" rx="1" />
      <rect x="11" y="6" width="3" height="13" rx="1" />
      <rect x="16" y="13" width="3" height="6" rx="1" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className={iconStyle}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
    </svg>
  );
}
