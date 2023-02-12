import { removeSection } from "../src/functions/sections/removeSec";
import { display } from "../src/types/types";

describe('remove section', ()=>{
  const display: display = [['vows', 2], ['charge', 0], ['kiss', 5]]
  beforeEach(()=>{
    display;
  })

  it('removes the section first element', () =>{
    const newDisplay = removeSection(0, display);
    expect(newDisplay[0]).toEqual(['charge', 0]);
    expect(newDisplay[1]).toEqual(['kiss', 5]);
  })

  it('removes the section second element', () =>{
    const newDisplay = removeSection(1, display);
    expect(newDisplay[0]).toEqual(['vows', 2]);
    expect(newDisplay[1]).toEqual(['kiss', 5]);
  })

  it('removes the section last element', () =>{
    const newDisplay = removeSection(2, display);
    expect(newDisplay[0]).toEqual(['vows', 2]);
    expect(newDisplay[1]).toEqual(['charge', 0]);
    expect(newDisplay[2]).toBe(undefined);
  })

})