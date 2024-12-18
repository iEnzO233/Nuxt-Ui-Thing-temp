const { fontFamily } = require("tailwindcss/defaultTheme");

/**@type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
        }
      },
      fontFamily: {
        sans: [
          `Inter, ${fontFamily.sans.join(", ")}`,
          {
            fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
          },
        ],
        mono: ["'Fira Code'", ...fontFamily.mono],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "collapse-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapse-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        shine: "shine 8s ease-in-out infinite",
        meteor: "meteor 5s linear infinite",
        grid: "grid 15s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-out",
        "collapse-down": "collapse-down 0.2s ease-out",
        "collapse-up": "collapse-up 0.2s ease-out",
      },
      colors: {
        "custom-black": "#1F2937",
        "bg-color": "#FFFFFF",
        "box-color": "#F9FAFB",
        "border-color": "#CBD5E1",
        "tab-bg-color": "#374151",
        "footer-bg": "#F3F4F6",
        "bold-title-color": "#111827",
        "normal-title-color": "#1F2937",
        "thin-title-color": "#374151",
        "bold-text-color": "#4B5563",
        "normal-text-color": "#6B7280",
        "thin-text-color": "#9CA3AF",
        "primary-color": {
          DEFAULT: "#B91C1C",
          50: "#F09D9D",
          100: "#ED8B8B",
          200: "#E86767",
          300: "#E34444",
          400: "#DC2121",
          500: "#B91C1C",
          600: "#881515",
          700: "#580D0D",
          800: "#270606",
          900: "#000000",
          950: "#000000",
        },
        "secondary-color": {
          DEFAULT: "#0D9488",
          50: "#67F2E5",
          100: "#54F0E2",
          200: "#2FEDDC",
          300: "#14DFCD",
          400: "#10BAAA",
          500: "#0D9488",
          600: "#086059",
          700: "#042D29",
          800: "#000000",
          900: "#000000",
          950: "#000000",
        },
        "accent-color": {
          DEFAULT: "#C2410C",
          50: "#F8AD8E",
          100: "#F79F7A",
          200: "#F48354",
          300: "#F2672E",
          400: "#E84E0E",
          500: "#C2410C",
          600: "#8D2F09",
          700: "#581E05",
          800: "#240C02",
          900: "#000000",
          950: "#000000",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary",
          "primary-foreground": "var(--sidebar-primary-foreground",
          accent: "var(--sidebar-accent",
          "accent-foreground": "var(--sidebar-accent-foreground",
          border: "var(--sidebar-border",
          ring: "var(--sidebar-ring",
          input: "var(--sidebar-input",
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
