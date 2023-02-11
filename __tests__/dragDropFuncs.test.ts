import { updateSectionOrder } from "../src/functions/dragdropFuncs";
import { display } from "../src/types/types";

describe('Drag Drop Section Order', () =>{
  const currState: display = [['first', 1], ['second', 2], ['third', 3]]
  const destIndex: number = 0
  const sourceIndex: number = 1

  beforeEach(()=>{
    currState;
    destIndex;
    sourceIndex;
  })

  it('returns undefined if destination and source index are equal', ()=>{
    const res = updateSectionOrder(2, 2, currState);
    expect(res).toBe(undefined);
  })

  it('returns the correct order when source is less than destination', ()=>{
    const res = updateSectionOrder(0, 1, currState);
    expect(res).toEqual([['second', 2], ['first', 1], ['third', 3]])
  })

  it('returns the correct order when source is more than destination', ()=>{
    const res = updateSectionOrder(1, 0, currState);
    expect(res).toEqual([['second', 2], ['first', 1], ['third', 3]])
  })

  it('returns an array of the same length', () => {
    const res = updateSectionOrder(1, 0, currState);
    expect(res?.length).toBe(3);
  })
})