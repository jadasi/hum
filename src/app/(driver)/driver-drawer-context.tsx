import * as React from 'react';

type DriverDrawerContextValue = {
  openDrawer: () => void;
};

const DriverDrawerContext = React.createContext<DriverDrawerContextValue | null>(null);

export function DriverDrawerProvider({
  children,
  openDrawer,
}: React.PropsWithChildren<DriverDrawerContextValue>) {
  return <DriverDrawerContext.Provider value={{ openDrawer }}>{children}</DriverDrawerContext.Provider>;
}

export function useDriverDrawer() {
  const context = React.useContext(DriverDrawerContext);
  if (!context) {
    throw new Error('useDriverDrawer must be used within DriverDrawerProvider');
  }
  return context;
}
