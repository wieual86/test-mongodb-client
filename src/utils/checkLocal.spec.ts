import checkLocal from "./checkLocal";

global.window = Object.create(window);

describe("checkLocal", () => {
  test("local", () => {
    const testHost = "localhost";
    expect(checkLocal(testHost)).toEqual(true);
  });

  test("not local", () => {
    const testHost = "momentrpg";
    expect(checkLocal(testHost)).toEqual(false);
  });
});
