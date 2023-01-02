import { createContext, useContext } from 'react';

// Create the Provider
const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our own custom provider! We will store data (state, functionality) in here and anyone can access it via the consumer.

  const cartOpen = true;

  return (
    <LocalStateProvider value={{ cartOpen }}>{children}</LocalStateProvider>
  );
}

// make a custom hook for accessing the cart local state
function useCart() {
  // We use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
