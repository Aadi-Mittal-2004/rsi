import { cn } from '@/lib/utils';

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
};

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  speed = 'normal',
}: MarqueeProps) {
  const speedMap = {
    slow: '40s',
    normal: '25s',
    fast: '15s',
  };

  return (
    <div
      className={cn(
        'group flex gap-12 overflow-hidden',
        className
      )}
    >
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'flex shrink-0 gap-12 animate-marquee',
            pauseOnHover && 'group-hover:[animation-play-state:paused]',
            reverse && '[animation-direction:reverse]'
          )}
          style={{
            animationDuration: speedMap[speed],
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
