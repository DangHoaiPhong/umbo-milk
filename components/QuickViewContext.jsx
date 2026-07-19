"use client";
import { createContext, useContext, useState } from "react";

const QuickViewContext = createContext(null);

export function QuickViewProvider({ children }) {
  const [product, setProduct] = useState(null);
  return (
    <QuickViewContext.Provider value={{ product, open: setProduct, close: () => setProduct(null) }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  return useContext(QuickViewContext);
}
