xdescribe("math is here", () => {
  let a = 5;

  beforeEach(() => {
    a = 5;
  });

  test("5 plus 5", () => {
    expect(a + 5).toBe(10);
  });

  it("6+5", () => {
    expect(a + 10).toBe(15);
  });
});
