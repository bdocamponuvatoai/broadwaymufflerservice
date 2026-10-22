"use client";

import { site } from "@/lib/site";

// Replaces the root layout when it fails, so it can't rely on the global stylesheet or fonts.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-US">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#15171a",
          color: "#f4f2ed",
          fontFamily: "system-ui, sans-serif",
          padding: "1rem",
        }}
      >
        <main style={{ maxWidth: "32rem" }}>
          <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Something went wrong.</h1>
          <p style={{ lineHeight: 1.6 }}>
            The website hit a problem. Try again, or call {site.name} on{" "}
            <a href={site.phone.href} style={{ color: "#f2b631" }}>
              {site.phone.display}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              minHeight: 44,
              padding: "0 1.25rem",
              border: 0,
              borderRadius: 3,
              background: "#b8261b",
              color: "#fff",
              font: "inherit",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
