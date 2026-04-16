import React from "react";

export function Caption({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`caption ${className}`}>{children}</div>
  );
}

export function SectionMasthead({
  bulletinNo,
  label,
  date,
  className = "",
}: {
  bulletinNo: string;
  label: string;
  date?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="caption caption-green">BULLETIN {bulletinNo}</span>
      <span className="h-px flex-1 bg-[var(--rule)]" />
      <span className="caption">{label}</span>
      {date && (
        <>
          <span className="h-px w-8 bg-[var(--rule)]" />
          <span className="caption">{date}</span>
        </>
      )}
    </div>
  );
}

export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution: string;
}) {
  return (
    <figure className="max-w-3xl mx-auto py-10 px-4 relative">
      <div
        aria-hidden
        className="absolute -top-4 left-0 text-[8rem] leading-none font-display text-green/20 select-none pointer-events-none"
      >
        &ldquo;
      </div>
      <blockquote className="font-display text-3xl sm:text-5xl leading-[1.05] text-ink tracking-tight italic relative z-10">
        {children}
      </blockquote>
      <figcaption className="caption mt-6 text-right">
        &mdash; {attribution}
      </figcaption>
    </figure>
  );
}

export function HorizontalRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-[var(--rule)]" />
      <span className="w-1.5 h-1.5 rounded-full bg-green" />
      <span className="h-px flex-1 bg-[var(--rule)]" />
    </div>
  );
}

export function Masthead() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="border-b border-[var(--rule)] py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] sm:text-[11px]">
        <span className="caption hidden sm:block">
          VOL. I &middot; ISSUE 01
        </span>
        <span className="caption">{today.toUpperCase()}</span>
        <span className="caption hidden sm:block">
          PUBLISHED IN ATLANTA, GA
        </span>
      </div>
    </div>
  );
}
