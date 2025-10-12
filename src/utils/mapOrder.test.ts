import { mapOrder } from "./mapOrder";

describe('Unit Test: mapOrder():', () => {
  it('Should return [] if originalArray is null', ()=> {
    expect(mapOrder(null as any, [1,2,3],  'id')).toEqual([])
  })

  it('Should return [] if orderArray is null', ()=> {
    expect(mapOrder([{id: 1}], null as any,  'id')).toEqual([])
  })

  it('Should return [] if key is falsy', ()=> {
    expect(mapOrder([{id: 1}], [1,2,3], '')).toEqual([])
  })

  it('Should sort array by given order', ()=> {
    const originalArray = [
      { id: 1, name: 'A'},
      { id: 3, name: 'C'},
      { id: 2, name: 'B'},
      { id: 4, name: 'D'}
    ]

    const orderArray = [1, 2, 3, 4]
  
    const result = mapOrder(originalArray, orderArray, 'id')
    expect(result.map(item => item.id)).toEqual([1,2,3,4])
  })

  it('Should push items not in orderArray to the end', ()=> {
    const originalArray = [
      { id: 1, name: 'A'},
      { id: 99, name: 'Y'},
      { id: 3, name: 'C'},
      { id: 2, name: 'B'},
      { id: 100, name: 'Z'},
      { id: 4, name: 'D'}
    ]

    const orderArray = [1, 2, 3, 4]
  
    const result = mapOrder(originalArray, orderArray, 'id')
    // 99 và 100 không có trong orderArray => sẽ bị đẩy về cuối theo thứ tự gốc
    expect(result.map(item => item.id)).toEqual([1, 2, 3, 4, 99, 100])
  })

  it('Should handle when all items are not in orderArray', ()=> {
    const originalArray = [
      { id: 10},
      { id: 20},
      { id: 30}
    ]

    const orderArray: number[] = []
  
    const result = mapOrder(originalArray, orderArray, 'id')
    // Tất cả item trong mảng originalArray không có trong orderArray =>
    // Giữ nguyên thứ tự gốc
    expect(result.map(item => item.id)).toEqual([10, 20, 30])
  })

  it('Should work with custom key', ()=> {
    const originalArray = [
      { code: 'A', name: 'Alpha'},
      { code: 'C', name: 'Charlie'},
      { code: 'D', name: 'Delta'},
      { code: 'B', name: 'Bravo'},
    ]

    const orderArray = ['A', 'B', 'C', 'D']

    const result = mapOrder(originalArray, orderArray, 'code')

    expect(result.map(item => item.code)).toEqual(['A', 'B', 'C', 'D'])
  })
})