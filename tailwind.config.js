const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        hum: {
          teal: 'var(--color-teal)',
          'teal-darker': 'var(--color-teal-darker)',
          'teal-dark': 'var(--color-teal-dark)',
          'teal-light': 'var(--color-teal-light)',
          'teal-lighter': 'var(--color-teal-lighter)',
          'teal-faint': 'var(--color-teal-faint)',
          pink: 'var(--color-pink)',
          'pink-dark': 'var(--color-pink-dark)',
          'pink-light': 'var(--color-pink-light)',
          'pink-faint': 'var(--color-pink-faint)',
          black: 'var(--color-black)',
          gray: {
            50: 'var(--color-gray-50)',
            100: 'var(--color-gray-100)',
            300: 'var(--color-gray-300)',
            500: 'var(--color-gray-500)',
            700: 'var(--color-gray-700)',
            800: 'var(--color-gray-800)',
            900: 'var(--color-gray-900)',
          },
          white: 'var(--color-white)',
          fg: {
            1: 'var(--fg-1)',
            2: 'var(--fg-2)',
            3: 'var(--fg-3)',
            disabled: 'var(--fg-disabled)',
            link: 'var(--fg-link)',
            'link-hover': 'var(--fg-link-hover)',
          },
          bg: {
            page: 'var(--bg-page)',
            hero: 'var(--bg-hero)',
            alt: 'var(--bg-alt)',
            card: 'var(--bg-card)',
            stats: 'var(--bg-stats)',
            'cta-banner': 'var(--bg-cta-banner)',
            footer: 'var(--bg-footer)',
          },
        },
      },
      fontFamily: {
        sans: 'DM Sans',
        display: 'DM Sans',
        mono: 'Menlo',
      },
      /**
       * Line heights must be explicit lengths for React Native: unitless CSS
       * multipliers (e.g. 1.45) become ~1.45dp and clip glyphs. Values follow
       * design-tokens.css sizes × leading goals, rounded to whole pixels.
       */
      fontSize: {
        'hum-xs': ['var(--text-xs)', { lineHeight: '16px' }],
        'hum-sm': ['var(--text-sm)', { lineHeight: '20px' }],
        'hum-base': ['var(--text-base)', { lineHeight: '25px' }],
        'hum-md': ['var(--text-md)', { lineHeight: '28px' }],
        'hum-lg': ['var(--text-lg)', { lineHeight: '26px' }],
        'hum-xl': ['var(--text-xl)', { lineHeight: '32px' }],
        'hum-2xl': ['var(--text-2xl)', { lineHeight: '40px' }],
        'hum-3xl': ['var(--text-3xl)', { lineHeight: '48px' }],
        'hum-4xl': ['var(--text-4xl)', { lineHeight: '58px' }],
        'hum-5xl': ['var(--text-5xl)', { lineHeight: '72px' }],
      },
      fontWeight: {
        'hum-regular': 'var(--fw-regular)',
        'hum-medium': 'var(--fw-medium)',
        'hum-semibold': 'var(--fw-semibold)',
        'hum-bold': 'var(--fw-bold)',
        'hum-extrabold': 'var(--fw-extrabold)',
        'hum-black': 'var(--fw-black)',
      },
      spacing: {
        'hum-1': 'var(--space-1)',
        'hum-2': 'var(--space-2)',
        'hum-3': 'var(--space-3)',
        'hum-4': 'var(--space-4)',
        'hum-5': 'var(--space-5)',
        'hum-6': 'var(--space-6)',
        'hum-8': 'var(--space-8)',
        'hum-10': 'var(--space-10)',
        'hum-12': 'var(--space-12)',
        'hum-16': 'var(--space-16)',
        'hum-20': 'var(--space-20)',
        'hum-24': 'var(--space-24)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'hum-sm': 'var(--radius-sm)',
        'hum-md': 'var(--radius-md)',
        'hum-lg': 'var(--radius-lg)',
        'hum-xl': 'var(--radius-xl)',
        'hum-2xl': 'var(--radius-2xl)',
        'hum-full': 'var(--radius-full)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      boxShadow: {
        'hum-xs': 'var(--shadow-xs)',
        'hum-sm': 'var(--shadow-sm)',
        'hum-md': 'var(--shadow-md)',
        'hum-lg': 'var(--shadow-lg)',
        'hum-focus': 'var(--shadow-focus)',
        'hum-focus-pink': 'var(--shadow-focus-pink)',
      },
      transitionDuration: {
        'hum-fast': 'var(--duration-fast)',
        'hum-base': 'var(--duration-base)',
        'hum-slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'hum-out': 'var(--ease-out)',
        'hum-in-out': 'var(--ease-in-out)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
