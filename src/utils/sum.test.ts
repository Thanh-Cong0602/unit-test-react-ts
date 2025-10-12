 import { sum } from '~/utils/sum'

// Jest runtime đã cung cấp describe, it, expect dưới dạng global 
// functions rồi nên có thể dùng luôn describe, it, expect...vv nhé
/**
 * describe: gom các test case liên quan lại với nhau
 * it: Tạo một test case đơn lẻ
 * expect: Kiểm tra kết quả có đúng như mong đợi hay không.
 */

 describe('Unit Test: sum():', () => {
  it('should return the sum of two numbers', () => {
    expect(sum(10,7)).toBe(17)
  })
 })
