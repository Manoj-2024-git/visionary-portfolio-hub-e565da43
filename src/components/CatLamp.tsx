import { useState } from 'react';

interface CatLampProps {
  onToggleTheme: () => void;
  isDark: boolean;
}

const CatLamp = ({ onToggleTheme, isDark }: CatLampProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed left-4 top-1/4 z-50 cursor-pointer transition-transform duration-300 hover:scale-110"
      onClick={onToggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={isDark ? 'Turn on the light!' : 'Turn off the light!'}
    >
      <div className="relative w-20 h-32">
        {/* Lamp Post */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2 h-20 bg-gradient-to-b from-muted-foreground/60 to-muted-foreground/30 rounded-full" />

        {/* Lamp Base */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-8 h-2 bg-muted-foreground/50 rounded-full" />

        {/* Lamp Head */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 w-12 h-8 overflow-hidden">
          <div
            className={`w-full h-full rounded-t-full transition-all duration-500 ${
              !isDark
                ? 'bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.8)]'
                : 'bg-gradient-to-b from-muted-foreground/40 to-muted-foreground/20'
            }`}
          />
        </div>

        {/* Light Glow */}
        {!isDark && (
          <div className="absolute left-1/2 -translate-x-1/2 top-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl animate-pulse-slow" />
        )}

        {/* Cat */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 64 64"
            className={`transition-all duration-500 ${isHovered ? 'animate-wiggle' : ''}`}
          >
            {/* Cat Body */}
            <ellipse cx="32" cy="48" rx="14" ry="10" className="fill-muted-foreground/80" />

            {/* Cat Head */}
            <circle cx="32" cy="32" r="12" className="fill-muted-foreground/80" />

            {/* Cat Ears */}
            <polygon points="22,24 18,12 26,20" className="fill-muted-foreground/80" />
            <polygon points="42,24 46,12 38,20" className="fill-muted-foreground/80" />

            {/* Inner Ears */}
            <polygon points="22,22 20,16 24,20" className="fill-primary/50" />
            <polygon points="42,22 44,16 40,20" className="fill-primary/50" />

            {/* Eyes */}
            <ellipse
              cx="27" cy="32" rx="3" ry={isDark ? 4 : 2}
              className={`transition-all duration-300 ${isDark ? 'fill-primary' : 'fill-yellow-400'}`}
            />
            <ellipse
              cx="37" cy="32" rx="3" ry={isDark ? 4 : 2}
              className={`transition-all duration-300 ${isDark ? 'fill-primary' : 'fill-yellow-400'}`}
            />

            {/* Eye Pupils */}
            <ellipse
              cx="27" cy="32" rx="1" ry={isDark ? 3 : 1}
              className="fill-background"
            />
            <ellipse
              cx="37" cy="32" rx="1" ry={isDark ? 3 : 1}
              className="fill-background"
            />

            {/* Nose */}
            <polygon points="32,36 30,38 34,38" className="fill-primary/60" />

            {/* Mouth */}
            <path d="M30,39 Q32,42 34,39" stroke="currentColor" strokeWidth="1" fill="none" className="stroke-muted-foreground" />

            {/* Whiskers */}
            <line x1="22" y1="36" x2="12" y2="34" className="stroke-muted-foreground" strokeWidth="1" />
            <line x1="22" y1="38" x2="12" y2="38" className="stroke-muted-foreground" strokeWidth="1" />
            <line x1="22" y1="40" x2="12" y2="42" className="stroke-muted-foreground" strokeWidth="1" />
            <line x1="42" y1="36" x2="52" y2="34" className="stroke-muted-foreground" strokeWidth="1" />
            <line x1="42" y1="38" x2="52" y2="38" className="stroke-muted-foreground" strokeWidth="1" />
            <line x1="42" y1="40" x2="52" y2="42" className="stroke-muted-foreground" strokeWidth="1" />

            {/* Tail */}
            <path
              d="M46,48 Q58,44 54,36"
              className="stroke-muted-foreground/80"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs whitespace-nowrap animate-fade-in text-foreground shadow-lg">
          {isDark ? '💡 Turn on light' : '🌙 Turn off light'}
        </div>
      )}
    </div>
  );
};

export default CatLamp;
