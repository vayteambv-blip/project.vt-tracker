import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          padding: "28px",
          border: "1px solid var(--line)",
          borderRadius: "24px",
          background: "var(--bg-panel-strong)",
          boxShadow: "var(--shadow)",
        }}
      >
        <p className="eyebrow">Not found</p>
        <h1 style={{ margin: "12px 0" }}>This page does not exist yet.</h1>
        <p style={{ color: "var(--text-soft)", lineHeight: 1.6 }}>
          Go back to the main dashboard and continue building the project
          sections from there.
        </p>
        <div style={{ marginTop: "18px" }}>
          <Link className="ghost-link" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
