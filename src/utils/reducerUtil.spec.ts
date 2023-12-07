import reducerUtil from "./reducerUtil";

describe("reducerUtil", () => {
  enum testData {
    _name = "test",
    slice1 = "slice1",
    slice2 = "slice2"
  }
  const testState = { [testData.slice1]: "slice1Init", [testData.slice2]: "slice2Init" };
  const getState = jest.fn().mockImplementation(() => ({ [testData._name]: testState }));
  const slice1Payload = "slice1Payload";
  const slice2Payload = "slice2Payload";

  test("createReducer", () => {
    const testReducer = reducerUtil.createReducer(testData);

    expect(
      testReducer(testState, {
        type: `${testData._name}_${testData.slice1}`,
        payload: slice1Payload
      })
    ).toEqual({ ...testState, [testData.slice1]: slice1Payload });

    expect(
      testReducer(testState, {
        type: `${testData._name}_${testData.slice2}`,
        payload: slice2Payload
      })
    ).toEqual({ ...testState, [testData.slice2]: slice2Payload });
  });

  test("setSlice", () => {
    expect(reducerUtil.setSlice(testData, testData.slice1, slice1Payload)).toEqual({
      type: `${testData._name}_${testData.slice1}`,
      payload: slice1Payload
    });

    expect(reducerUtil.setSlice(testData, testData.slice2, slice2Payload)).toEqual({
      type: `${testData._name}_${testData.slice2}`,
      payload: slice2Payload
    });
  });

  test("getSlice", () => {
    expect(reducerUtil.getSlice(testData, testData.slice1, getState)).toEqual(
      testState[testData.slice1]
    );

    expect(reducerUtil.getSlice(testData, testData.slice2, getState)).toEqual(
      testState[testData.slice2]
    );

    expect(reducerUtil.getSlice(testData, testData.slice1, {})).toEqual(undefined);
  });
});
