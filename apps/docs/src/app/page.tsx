import { greet } from "@fe-base/utils";

export default function Home() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Fe Engineering Base</h1>
      <p>{greet("hi!")}</p>
    </main>
  );
}
