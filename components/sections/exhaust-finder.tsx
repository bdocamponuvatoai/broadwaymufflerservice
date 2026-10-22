"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { buttonClass, cx } from "@/components/ui";
import { exhaustParts, getService } from "@/lib/content";

// Marker x-positions on the drawing, front of the car to the back.
const markerX: Record<string, number> = { manifold: 372, converter: 469, pipes: 558, muffler: 655, tailpipe: 900 };
const leaderTop: Record<string, number> = { manifold: 180, converter: 224, pipes: 218, muffler: 232, tailpipe: 217 };

// Phones get a tighter crop and larger markers so the drawing stays legible.
const variants = {
  wide: { viewBox: "0 0 1000 308", markerRadius: 18, fontSize: 20 },
  compact: { viewBox: "140 60 840 250", markerRadius: 24, fontSize: 28 },
} as const;

function ExhaustDrawing({ active, variant }: { active: string; variant: keyof typeof variants }) {
  const tone = (id: string) => (id === active ? "var(--color-signal)" : "var(--color-ink)");
  const { viewBox, markerRadius, fontSize } = variants[variant];

  return (
    <svg viewBox={viewBox} className="h-auto w-full" aria-hidden="true" focusable="false">
      {/* Ground, car outline and engine */}
      <line x1="20" y1="252" x2="980" y2="252" stroke="var(--color-line)" strokeWidth="3" />
      <path
        d="M60 192 L64 150 Q70 138 90 136 L320 128 L420 80 Q430 74 445 74 L640 72 Q660 72 672 82 L760 128 L920 134 Q936 136 938 150 L942 192 L846 192 A56 56 0 0 0 734 192 L256 192 A56 56 0 0 0 144 192 Z"
        fill="none"
        stroke="var(--color-steel)"
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="232"
        y="116"
        width="112"
        height="56"
        rx="6"
        fill="none"
        stroke="var(--color-steel)"
        strokeOpacity="0.45"
        strokeWidth="2.5"
        strokeDasharray="8 6"
      />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* 1 Manifold and headers */}
        <g stroke={tone("manifold")} strokeWidth="9" className="transition-[stroke] duration-300">
          <path d="M344 130 C 366 138 378 160 392 186" pathLength={1} className="pipe-draw" />
          <path d="M344 145 C 362 152 376 168 392 186" pathLength={1} className="pipe-draw" />
          <path d="M344 160 C 360 166 374 176 392 186" pathLength={1} className="pipe-draw" />
          <path d="M392 186 Q 404 208 424 208" strokeWidth="12" pathLength={1} className="pipe-draw" />
        </g>
        {/* 2 Catalytic converter */}
        <g stroke={tone("converter")} className="transition-[stroke] duration-300">
          <rect x="424" y="192" width="90" height="32" rx="16" strokeWidth="7" fill="var(--color-paper-deep)" />
          <path d="M449 200 V216 M469 200 V216 M489 200 V216" strokeWidth="3" />
        </g>
        {/* 3 Pipes and flex section */}
        <g stroke={tone("pipes")} className="transition-[stroke] duration-300">
          <path d="M514 208 H590" strokeWidth="12" pathLength={1} className="pipe-draw" />
          <rect x="536" y="198" width="44" height="20" rx="4" strokeWidth="5" fill="var(--color-paper-deep)" />
          <path d="M544 200 V216 M552 200 V216 M560 200 V216 M568 200 V216 M576 200 V216" strokeWidth="2.5" />
        </g>
        {/* 4 Muffler */}
        <g stroke={tone("muffler")} className="transition-[stroke] duration-300">
          <rect x="590" y="184" width="130" height="48" rx="16" strokeWidth="7" fill="var(--color-paper-deep)" />
          <path d="M608 192 V224 M702 192 V224" strokeWidth="3" />
        </g>
        {/* 5 Tailpipe and tips */}
        <g stroke={tone("tailpipe")} className="transition-[stroke] duration-300">
          <path d="M720 208 H936" strokeWidth="12" pathLength={1} className="pipe-draw" />
          <rect x="934" y="198" width="30" height="20" rx="4" strokeWidth="5" fill="var(--color-paper-deep)" />
        </g>
      </g>

      {/* Wheels sit in front of the exhaust, as they do from the side. */}
      {[200, 790].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="206" r="46" fill="var(--color-paper-deep)" stroke="var(--color-ink)" strokeWidth="5" />
          <circle cx={cx} cy="206" r="20" fill="none" stroke="var(--color-steel)" strokeOpacity="0.6" strokeWidth="3" />
        </g>
      ))}

      {/* Leader lines and numbered markers */}
      {exhaustParts.map((part, index) => {
        const x = markerX[part.id] ?? 0;
        const isActive = part.id === active;
        return (
          <g key={part.id}>
            <line
              x1={x}
              y1={leaderTop[part.id] ?? 220}
              x2={x}
              y2={282 - markerRadius}
              stroke={isActive ? "var(--color-signal)" : "var(--color-steel)"}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx={x} cy="282" r={markerRadius} fill={isActive ? "var(--color-signal)" : "var(--color-ink)"} />
            <text
              x={x}
              y={282 + fontSize * 0.35}
              textAnchor="middle"
              fill="#fff"
              style={{ font: `700 ${fontSize}px var(--font-barlow-condensed), sans-serif` }}
            >
              {index + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ExhaustFinder({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [active, setActive] = useState(exhaustParts[1]?.id ?? "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const Heading = headingLevel;

  const select = (index: number, focus = false) => {
    const part = exhaustParts[index];
    if (!part) return;
    setActive(part.id);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = exhaustParts.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  const part = exhaustParts.find((item) => item.id === active) ?? exhaustParts[0];
  if (!part) return null;
  const service = getService(part.service);

  return (
    <section aria-labelledby={`${baseId}-title`} className="bg-paper-deep section-y" data-testid="exhaust-finder">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Heading
            id={`${baseId}-title`}
            data-reveal
            className="text-display text-5xl uppercase sm:text-6xl lg:col-span-6 lg:text-7xl"
          >
            Follow the pipe.
          </Heading>
          <p className="max-w-xl text-lg text-steel lg:col-span-5 lg:col-start-8">
            Not sure what to ask for? Start where the trouble seems to be. Each part of the exhaust has its own
            tell-tale signs.
          </p>
        </div>

        <div data-reveal className="mt-10 md:mt-14">
          <div className="sm:hidden">
            <ExhaustDrawing active={part.id} variant="compact" />
          </div>
          <div className="max-sm:hidden">
            <ExhaustDrawing active={part.id} variant="wide" />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Parts of the exhaust system"
            aria-orientation="vertical"
            className="flex flex-col lg:col-span-5"
          >
            {exhaustParts.map((item, index) => {
              const selected = item.id === part.id;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${baseId}-tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cx(
                    "group flex min-h-14 items-center gap-4 border-b border-line text-left transition-colors first:border-t",
                    selected ? "text-ink" : "text-steel hover:text-ink",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      "inline-flex size-8 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold text-white transition-colors",
                      selected ? "bg-signal" : "bg-ink",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="font-display text-2xl font-semibold tracking-[0.02em] uppercase">{item.name}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${part.id}`}
            tabIndex={0}
            className="rounded-[3px] bg-paper p-6 sm:p-8 lg:col-span-6 lg:col-start-7"
          >
            <p className="text-lg">{part.role}</p>
            <h3 className="mt-6 tag-label text-steel">Common signs</h3>
            <ul className="mt-3 space-y-2">
              {part.signs.map((sign) => (
                <li key={sign} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-[3px] w-3 shrink-0 bg-signal" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
            {service && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href={`/services/${service.slug}`} className={buttonClass("dark")}>
                  {service.short}
                  <ArrowRightIcon className="size-[18px]" />
                </Link>
                <Link href={`/request?service=${service.slug}`} className={buttonClass("outline-dark")}>
                  Ask about this
                </Link>
              </div>
            )}
            <p className="mt-6 text-sm text-steel">These are common signs, not a diagnosis. Call to talk it through.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
