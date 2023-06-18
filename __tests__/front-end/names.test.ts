import { enterNames } from "../../src/functions/sections/names";
import {PersonState} from "../../src/types/types"

describe('enterNames Function', () =>{
  let nameState: PersonState = {person1: undefined, person2: undefined}
  let content = 'string'

  beforeEach(() => {
    nameState.person1 = undefined;
    nameState.person2 = undefined;
    // content = 'my name is jacob, courtney, mike, ted, britney, JACOB, COURTNEY, MIKE, TED, BRITNEY.'
    content = 'PERSON_1 loves PERSON_2'
  })


  it('replaces placeholders with names', () => {
    nameState.person1 = 'JACOB';
    nameState.person2 = 'COURTNEY';
    const res = enterNames(nameState, content);
    expect(res).toBe('JACOB loves COURTNEY')
  })

  it('replaces the placeholder only if not undefined', () => {
    nameState.person2 = 'COURTNEY';
    const res = enterNames(nameState, content);
    expect(res).toBe('PERSON_1 loves COURTNEY')
  })

  it('replaces the names even if there is not a space between words', ()=>{
    nameState.person1 = 'JACOB';
    nameState.person2 = 'COURTNEY';
    content = 'PERSON_1PERSON_2';
    const res = enterNames(nameState, content);
    expect(res).toBe('JACOBCOURTNEY')
  })

  it('leaves placeholders unchanged if names are undefined', () => {
    const res = enterNames(nameState, content);
    expect(res).toBe('PERSON_1 loves PERSON_2')
  })

  it('replaces only PERSON_1 if person1 has a value and person2 is undefined', () => {
    nameState.person1 = 'JACOB';
    const res = enterNames(nameState, content);
    expect(res).toBe('JACOB loves PERSON_2')
  })

  it('replaces only PERSON_2 if person2 has a value and person1 is undefined', () => {
    nameState.person2 = 'COURTNEY';
    const res = enterNames(nameState, content);
    expect(res).toBe('PERSON_1 loves COURTNEY')
  })

  it('replaces both PERSON_1 and PERSON_2 if both have values', () => {
    nameState.person1 = 'JACOB';
    nameState.person2 = 'COURTNEY';
    const res = enterNames(nameState, content);
    expect(res).toBe('JACOB loves COURTNEY')
  })

  it('replaces multiple instances of the same placeholder', () => {
    nameState.person1 = 'JACOB';
    nameState.person2 = 'COURTNEY';
    content = 'PERSON_1 loves PERSON_2 and PERSON_1 misses PERSON_2';
    const res = enterNames(nameState, content);
    expect(res).toBe('JACOB loves COURTNEY and JACOB misses COURTNEY')
  })
  
})