import { Image, useColorScheme, type ImageSourcePropType } from 'react-native';

const logoDarkMode: ImageSourcePropType = require('../../../assets/images/logo-teal-arc-white.png');
const logoLightMode: ImageSourcePropType = require('../../../assets/images/logo-teal-arc-black.png');

type HumArcLogoProps = {
  /** Max width in CSS pixels (NativeWind). Height scales with aspect ratio. */
  className?: string;
  accessibilityLabel?: string;
};

/** Teal arc mark: black-background asset in dark mode, white-background asset in light mode. */
export function HumArcLogo({
  className = 'h-14 w-40 max-w-full',
  accessibilityLabel = 'HUM',
}: HumArcLogoProps) {
  const scheme = useColorScheme();
  const source = scheme === 'dark' ? logoDarkMode : logoLightMode;

  return (
    <Image
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      className={className}
      resizeMode="contain"
      source={source}
    />
  );
}
