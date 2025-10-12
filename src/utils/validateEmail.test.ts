import { validateEmail } from "./validateEmail"

describe('Unit Test: validateEmail()', () => {
  const cases: any[] = [
    ['thanhcongnguyen@gmail.com', true],
    ['thanhcongnguyen@', false],
    ['@thanhcongng.com', false],
    // [{email: 'thanhcongnguyen@gmail.com'}, true]
  ] 

  // Dùng each để lặp qua các case và test cho từng case, giúp chúng ta viết test ngắn gọn 
  // khi có nhiều bộ dữ liệu test lặp đi lặp lại cùng một logic.
  // %p mà chúng ta sử dụng nó là dạng placeholder kiểu pretty-format in ra log giá trị gốc 
  // khi test được thực thi. Giúp dễ debug test case bị fail.
  // https://jestjs.io/docs/api#1-testeachtablename-fn-timeout
  it.each(cases)('%p => %p', (email, expected) => {
    expect(validateEmail(email)).toBe(expected)
  })
})