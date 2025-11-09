import { useEffect, useRef } from "react";

export interface ImpressionAreaProps {
  children: React.ReactNode;
  onImpressionStart?: () => void;
  onImpressionEnd?: () => void;
  threshold?: number;
  /**
   * 한 번만 실행할지 여부 (기본값: false)
   */
  once?: boolean;
}

/**
 * 특정 영역이 화면에 보이는지 감지하는 컴포넌트
 *
 * @example
 * ```tsx
 * <ImpressionArea onImpressionStart={() => console.log('보임!')}>
 *   <div>이 영역이 보이면 콜백이 실행됩니다</div>
 * </ImpressionArea>
 * ```
 */
export function ImpressionArea({
  children,
  onImpressionStart,
  onImpressionEnd,
  threshold = 0.5,
  once = false,
}: ImpressionAreaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once && hasTriggeredRef.current) return;
          onImpressionStart?.();
          hasTriggeredRef.current = true;
        } else {
          onImpressionEnd?.();
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [onImpressionStart, onImpressionEnd, threshold, once]);

  return <div ref={ref}>{children}</div>;
}
