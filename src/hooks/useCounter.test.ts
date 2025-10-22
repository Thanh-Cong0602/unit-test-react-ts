import { renderHook, act } from "@testing-library/react";
import { useCounter } from "~/hooks/useCounter";

/**
 * Buổi này có thêm 2 nhân vật chính:
 * - renderHook: render một custom hook trong môi trường test mà không cần phải tạo component thật
 * - act: Đảm bảo mọi cập nhật state và side effect trong scope của nó dù là sync hay async đều được xử lý
 *   xong hết trước khi chúng ta test kiểm tra kết quả.
 */

describe("useCounter hook", () => {
  it("Khởi tạo với giá trị mặc định", () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it("Khởi tạo với giá trị custom", () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it("Tăng giá trị khi gọi increment()", () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment()
      result.current.increment()
    })
    expect(result.current.count).toBe(2);
  })

  it("Giảm giá trị đảm bảo không bị âm", () => {
    const { result } = renderHook(() => useCounter(1));
    act(() => {
      result.current.decrement() // Giarm lần thứ nhất: 1 - 1 = 0
      result.current.decrement() // Giảm lần thứ hai: 0 - 1 = -1
    })
    expect(result.current.count).toBe(0);
  })

  it("Reset về giá trị ban đầu", () => {
    const { result } = renderHook(() => useCounter(3));
    act(() => {
      result.current.increment() 
      result.current.increment()
      result.current.decrement() 
      result.current.reset()
    })
    expect(result.current.count).toBe(3);
  })
});
