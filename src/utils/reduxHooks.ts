import {
  useDispatch as baseUseDispatch,
  useSelector as baseUseSelector,
  Selector,
  shallowEqual
} from "react-redux";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useDispatch = () => baseUseDispatch<dispatch>();
const useSelector = <T>(selector: Selector<State, T>) => baseUseSelector(selector, shallowEqual);

export { useDispatch, useSelector };
