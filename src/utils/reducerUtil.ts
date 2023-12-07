type reducerData = { _name: string } & Record<string, string>;
type subState<T> = Record<string, T>;
type slices<T> = Record<string, (state: subState<T>, payload: T) => subState<T>>;

/**
 * This creates a simple reducer to store a state using a reducer data object.
 */
const createReducer = <T>(reducerData: reducerData) => {
  const { _name, ...sliceNames } = reducerData;
  const slices: slices<T> = Object.keys(sliceNames).reduce((accumulator, sliceName) => {
    accumulator[`${_name}_${sliceName}`] = (state: subState<T>, payload: T) => ({
      ...state,
      [sliceName]: payload
    });
    return accumulator;
  }, {});
  return (state: subState<T> = {}, action: Action<T>) => {
    return slices[action.type] ? slices[action.type](state, action.payload) : state;
  };
};

/**
 * This sets a slice by calling store.dispatch(setSlice()).
 */
const setSlice = <T>({ _name }: reducerData, sliceName: string, payload: T) => ({
  type: `${_name}_${sliceName}`,
  payload
});

/**
 * This gets a slice by passing in the reducerData, desired slice, and current state
 */
const getSlice = <T>({ _name }: reducerData, sliceName: string, state: State | getState) => {
  if (typeof state === "function") state = state();
  const { [_name]: subState } = state || {};
  const { [sliceName]: slice } = subState || {};
  return slice as T;
};

export default { createReducer, setSlice, getSlice };
