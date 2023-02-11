import { updateCardIndex } from "../src/functions/sections/updateSec";
import { display } from "../src/types/types";

describe('update card index', ()=>{
  const display: display = [['vows', 2], ['charge', 0], ['kiss', 5]]
  beforeEach(()=>{
    display;
  })

  it('increase the number from 2 to 3', ()=>{
    const newDisplay = updateCardIndex(display, 3, 4, 0)
    expect(newDisplay[0][1]).toBe(3);
  })

  it('decreases the number from 2 to 1', ()=>{
    const newDisplay = updateCardIndex(display, 1, 4, 0)
    expect(newDisplay[0][1]).toBe(1);
  })

  it('goes to last card if index is -1', ()=>{
    const newDisplay = updateCardIndex(display, -1, 4, 1)
    expect(newDisplay[1][1]).toBe(4);
  })

  it('goes to first index (0) if index is greater than number of cards', ()=>{
    const newDisplay = updateCardIndex(display, 6, 5, 2)
    expect(newDisplay[2][1]).toBe(0);
  })


})