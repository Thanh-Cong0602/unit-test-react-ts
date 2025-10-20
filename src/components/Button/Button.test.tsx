import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "~/components/Button/Button";

describe("<Button />", () => {
  it("Should render button and click to button:", async () => {
    // Tạo một cái user instance
    const user = userEvent.setup()
    // Tạo mock function onClick bằng Jest
    const onClick = jest.fn()
    // Mount component <Button /> vào DOM ảo trong môi trường test
    render(<Button content="Click Me" onClick={onClick} />)

  // Sử dụng object `screen` để truy vấn DOM ở phạm vi toàn cục nhằm tìm phần tử button.
  // Hàm `getByRole` sẽ tìm button có role="button" và name khớp với biểu thức /click me/i
  // (regular expression - không phân biệt hoa thường).
  // Tham số `name` chính là nội dung hiển thị của button.
    const button = screen.getByRole("button", { name: /click me/i })

    // Mô phỏng 1 click của người dùng vào button
    await user.click(button)
    await user.click(button)

    // Kiểm tra button vẫn đang nằm trong document (không bị unmount)
    expect(button).toBeInTheDocument()
    // Kiểm tra mock onClick đã được gọi đúng 1 lần khi click vào
    expect(onClick).toHaveBeenCalledTimes(2)
  })
})