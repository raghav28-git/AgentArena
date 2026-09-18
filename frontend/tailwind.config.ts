import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#EDEDED",
        card: "#121212",
        "card-hover": "#171717",
        border: "#262626",
        "border-hover": "#333333",
        muted: "#737373",
        "muted-foreground": "#A1A1AA",
        primary: "#FFFFFF",
        "primary-foreground": "#000000",
        destructive: "#EF4444",
        "destructive-foreground": "#FFFFFF",
        success: "#10B981",
        "success-foreground": "#FFFFFF",
        warning: "#F59E0B",
        accent: "#2563EB",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
