interface WaveDividerProps {
  color?: string;
}

export function WaveDivider({ color = "#f4f7f5" }: WaveDividerProps) {
  return (
    <div
      className="pointer-events-none absolute -bottom-px left-0 z-10 h-5 w-full sm:h-6 md:h-7"
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className="block h-full w-full"
      >
        <path
          className="wave-back"
          d="M0,45 C260,0 520,-5 760,15 C1000,35 1220,70 1440,35 L1440,110 L0,110 Z"
          fill={color}
          opacity={0.35}
        />
        <path
          d="M0,60 C240,15 480,5 720,25 C960,45 1200,85 1440,55 L1440,110 L0,110 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
