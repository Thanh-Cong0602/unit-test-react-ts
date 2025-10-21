import { render, screen } from "@testing-library/react";

import { TodoList } from "~/components/TodoList/TodoList";

/**
 * ThCongNg's note: Sau khi chạy test này:
 * - Việc có tồn tại vài dòng Uncovered là bình thường và chấp nhận được. 
 * Vì sẽ có nhiều dòng code không cần phải test hết như log, debug, fallback...vv
 * - Quan trọng là các chức năng chính, logic nghiệp vụ, luồng người dùng quan trọng đều đã được test.
 * - Thực tế trong dự án đa số đều đặt target khoảng 70–90% chứ không yêu cầu 100% hoàn hảo.
 */

const mockTodos = [
  {
    id: 1,
    todo: "Cờ lâu ì 01",
    completed: true,
    userId: 1,
  },
  {
    id: 2,
    todo: "Cờ lâu ì 02",
    completed: false,
    userId: 2,
  },
];

describe("<TodoList />", () => {
  it("Fetch and display Todo List", async () => {
    // globalThis: Biến toàn cục chuẩn từ ES2020, hoạt động trên mọi môi trường như Browser (window),
    // Node.js (global) và Web Worker (self)
    // jest.spyOn: tạo một mock function cho object; ở đây là globalThis.fetch
    // https://jestjs.io/docs/jest-object#jestspyonobject-methodname
    // mockResolvedValueOnce: lần gọi fetch tiếp theo sẽ trả về Promise.resolve với object bên dưới.

    jest.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      json: async () => ({ todos: mockTodos})
    } as any)

    render(<TodoList />)
    
    // getByText: chạy đồng bộ (synchronous) dùng khi chắc chắn element đã có sẵn trong DOM
    // Kiểm tra chữ loading phải có trên màn hình.
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // findByText: chạy bất đồng bộ (asynchronous), trả về Promise,
    // sẽ chờ cho tới khi element xuất hiện trong DOM.
    // Thường dùng khi element sẽ xuất hiện sau một hành động async như call API, setTimeout...vv 
    // ✅ Kiểm tra tất cả các todo của mock được hiển thị trên màn hình.
    for(const t of mockTodos) {
      expect(await screen.findByText(t.todo)).toBeInTheDocument()
    }
  })


  it('Should display No Result when fetch error', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network Error'))

    render(<TodoList />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    // Sau khi fetch lỗi xong, chữ No Result phải có trên màn hình
    expect(await screen.findByText(/no result/i)).toBeInTheDocument()
  })
})
