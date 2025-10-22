import { useState } from "react";

export function useCounter(initialValue: number = 0) {
  // State data
  const [count, setCount] = useState(initialValue);

  // Tăng
  const increment = () => setCount((val) => val + 1);

  // Giảm (không âm)
  const decrement = () => setCount((val) => Math.max(val - 1, 0));

  // Reset
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
