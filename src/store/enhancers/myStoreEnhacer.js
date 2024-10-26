import { fetchFlights } from "./actions/flightsActions";

// Store enhancer to intercept actions
export const myStoreEnhancer =
  (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer);

    // Capture the original dispatch function
    const originalDispatch = store.dispatch;

    // Override dispatch to add custom behavior
    store.dispatch = (action) => {
      const result = originalDispatch(action);

      // After dispatching 'SOME_INITIAL_ACTION', fetch flights
      if (action.type === "SOME_INITIAL_ACTION") {
        store.dispatch(fetchFlights());
      }

      return result;
    };

    return store;
  };
