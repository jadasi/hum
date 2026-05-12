import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/shared/lib/ui-tokens';
import { useTheme } from '@/shared/lib/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  const colorKey: ThemeColor =
    themeColor ?? (type === 'linkPrimary' || type === 'link' ? 'link' : 'text');

  return (
    <Text
      style={[
        { color: theme[colorKey] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    fontFamily: Fonts.sans,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: Fonts.sans,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 52,
    fontFamily: Fonts.sans,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '700',
    fontFamily: Fonts.sans,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
    fontFamily: Fonts.sans,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    fontFamily: Fonts.sans,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});
