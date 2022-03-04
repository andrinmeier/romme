import { Link } from "remix";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Play Rommé!</h1>
      <Link to="/game/new">Start new game</Link>
    </div>
  );
}
