import { createContext } from 'react';

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

export { CartStateProvider };
