import { DriverHomeScreen as DriverHomePage } from '@/pages/driver-home';

import { useDriverDrawer } from '../driver-drawer-context';

export default function DriverHomeScreen() {
  const { demoDataResetVersion, openDrawer } = useDriverDrawer();

  return <DriverHomePage onOpenMenu={openDrawer} refreshSignal={demoDataResetVersion} />;
}
