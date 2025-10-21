import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SignUpForm } from "~/components/SignUpForm/SignUpForm";

describe('< SignUpForm />', () => {
  it("Should fill inputs with default values initially", () => {
    const mockOnSubmit = jest.fn()
    
    render(
    <SignUpForm 
      onSubmit={mockOnSubmit} 
      defaultValues={{
      email: "thanhcongnguyen@gmail.com",
      password: "123456"
    }} 
    />
  )

  //Kiểm tra defaultValue của email đã được đặt ở input
  expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue('thanhcongnguyen@gmail.com')

  //Kiểm tra defaultValue của email đã được đặt ở input
  expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('123456')
  })

  it('Should show required errors if fields are empty', async () => {
    const mockOnSubmit = jest.fn()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    // User nhấn click vào button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error email đang hiển thị trên màn hình
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()

    // Kiểm tra error password đang hiển thị trên màn hình
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument()

    // Kiểm tra mockSubmit chưa được gọi và đang gặp lỗi validate
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("Should show error if email is invalid", async () => {
    const mockOnSubmit = jest.fn()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    // Hành động user gõ nội dung không hợp lệ vào input email
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'This is invalid email'
    )

    // Hành động user gõ nội dung hợp lệ vào input password
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '123456'
    )

    // User nhấn click vào button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error email đang hiển thị trên màn hình
    expect(await screen.findByText(/email is not valid/i)).toBeInTheDocument()
    
    // Kiểm tra mockSubmit chưa được gọi vì đang gặp lỗi validate
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("Should show error if password is too short", async () => {
    const mockOnSubmit = jest.fn()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    // Hành động user gõ nội dung hợp lệ vào input email
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'thanhcongnguyen@gmail.com'
    )

    // Hành động user gõ nội dung không hợp lệ vào input password
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '123' // Mật khẩu quá ngắn, không đủ 6 kí tự
    )

    // User nhấn click vào button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra error password đang hiển thị trên màn hình
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument()
    
    // Kiểm tra mockSubmit chưa được gọi vì đang gặp lỗi validate
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it("Should call onSubmit and reset form when valid", async () => {

    const mockOnSubmit = jest.fn()

    render(<SignUpForm onSubmit={mockOnSubmit} />)

    // Hành động user gõ nội dung hợp lệ vào input email
    await userEvent.type(
      screen.getByPlaceholderText(/enter email/i),
      'thanhcongnguyen@gmail.com'
    )

    // Hành động user gõ nội dung hợp lệ vào input password
    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '123456'
    )

    // User nhấn click vào button submit
    await userEvent.click(screen.getByText(/submit/i))

    // Kiểm tra mockSubmit được gọi 1 lần
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)

    // Kiểm tra mockSubmit được gọi với email và password input như trên
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'thanhcongnguyen@gmail.com',
      password: '123456'
    })

    // Reset form sau khi submit được gọi
    expect(screen.getByPlaceholderText(/enter email/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/enter password/i)).toHaveValue('')
  })
})
