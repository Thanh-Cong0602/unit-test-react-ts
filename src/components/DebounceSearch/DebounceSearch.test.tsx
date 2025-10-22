import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DebounceSearch } from "~/components/DebounceSearch/DebounceSearch";

describe('< DebounceSearch />', () => {
  it("Should fetch users after debounce", async () => {
    // ✅ Mock call API với query cụ thể hoặc trong trường hợp không có query.
    // ✅ mockImplementation: gán chung một logic mock cho tất cả các lần gọi fetch.
    jest.spyOn(globalThis, "fetch").mockImplementation(
      async (url: any) => {
        if(url.includes('thcongng')) {
          return {
            json: async () => [{id: 1, name: "ThCongNg - Cờ Lâu ì"}]
          }
        }
        return { josn: async () => [] } as any
      }
    )

    // Mount Component
    render(<DebounceSearch />)

    // Lần đầu gọi fetch khi mount componnet với query rỗng
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('users?q=')
    )

    // Tìm ô input có placeholder chứa chữ 'search', sau đó giả lập hành động người dùng
    // gõ từng ký tự thcongng vào ô đó.
    await userEvent.type(screen.getByPlaceholderText(/search/i), 'thcongng')

    // Lúc này debounce chưa xong => fetch chưa được gọi lần 2, vẫn là 1
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)

    // await findByText để đợi debounce chạy và check kết quả render ra UI
    expect(await screen.findByText(/ThCongNg - Cờ Lâu ì/i)).toBeInTheDocument()

    // Kiểm tra fetch được gọi thêm lần nữa (tổng 2 lần) và lúc này query có chứa 'thcongng'
    expect(globalThis.fetch).toHaveBeenCalledTimes(2)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('users?q=thcongng')
    )
  })

  it("Should No result when fetch error:", async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('Network Error'))
    
    render(<DebounceSearch />)
    
    // Kiểm tra chữ loading phải có trên màn hình.
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    
    // Sau khi fetch lỗi xong, chữ No Result phải có trên màn hình
    expect(await screen.findByText(/no result/i)).toBeInTheDocument()
  })
})