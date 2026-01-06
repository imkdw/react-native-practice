import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>🚀 Electron + React</h1>
      <p>카운트: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: "8px" }}>
        -1
      </button>
    </div>
  );
}

export default App;
