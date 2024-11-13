export const testReduxStore = (store) => {
  console.log('Initial State:', store.getState());
  
  // Subscribe to changes
  store.subscribe(() => {
    console.log('State Changed:', store.getState());
  });
}; 