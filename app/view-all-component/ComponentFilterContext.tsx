"use client";

import React, { createContext, useContext } from "react";

type ComponentFilterContextValue = {
  activeComponent: string | null;
};

const ComponentFilterContext = createContext<ComponentFilterContextValue>({
  activeComponent: null,
});

export function ComponentFilterProvider({
  activeComponent,
  children,
}: {
  activeComponent: string | null;
  children: React.ReactNode;
}) {
  return (
    <ComponentFilterContext.Provider value={{ activeComponent }}>
      {children}
    </ComponentFilterContext.Provider>
  );
}

export function useComponentFilter() {
  return useContext(ComponentFilterContext);
}
