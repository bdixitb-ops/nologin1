"use client";

export default function SimpleTitlePage({ title }) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700, margin: 0 }}>{title}</h1>
    </main>
  );
}
