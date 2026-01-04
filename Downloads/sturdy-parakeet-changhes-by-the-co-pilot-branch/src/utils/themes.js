export const themes = {
    // 1. DARK THEME — Premium Dev Tool
    dark: {
        name: "Premium Dark",
        colors: {
            background: "222.2 84% 4.9%",
            foreground: "210 40% 98%",
            card: "222.2 84% 4.9%",
            primary: "217.2 91.2% 59.8%",
            secondary: "217.2 32.6% 17.5%",
            border: "217.2 32.6% 17.5%",
            accent: "217.2 32.6% 17.5%",
        },
        styles: {
            radius: "0.5rem",
            glass: true,
            font: "Inter, sans-serif",
        }
    },
    // 2. LIGHT THEME — Clean & Professional
    light: {
        name: "Professional Light",
        colors: {
            background: "0 0% 100%",
            foreground: "222.2 84% 4.9%",
            card: "0 0% 100%",
            primary: "221.2 83.2% 53.3%",
            secondary: "210 40% 96.1%",
            border: "214.3 31.8% 91.4%",
            accent: "210 40% 96.1%",
        },
        styles: {
            radius: "0.5rem",
            glass: false,
            font: "Inter, sans-serif",
        }
    },
    // 3. CYBERPUNK / NEON
    cyberpunk: {
        name: "Cyberpunk Neon",
        colors: {
            background: "280 60% 5%",
            foreground: "180 100% 50%",
            card: "280 60% 8%",
            primary: "320 100% 50%", // Magenta
            secondary: "180 100% 50%", // Cyan
            border: "320 100% 50%",
            accent: "60 100% 50%", // Yellow
        },
        styles: {
            radius: "0px",
            glass: true,
            font: "'Orbitron', sans-serif",
        }
    },
    // 4. GLASSMORPHISM + NEUMORPHISM
    glass: {
        name: "Glassmorphism",
        colors: {
            background: "220 50% 10%",
            foreground: "0 0% 100%",
            card: "220 50% 10%", // Handled by glass class
            primary: "200 100% 50%",
            secondary: "220 30% 20%",
            border: "0 0% 100%", // Transparent white
            accent: "300 100% 50%",
        },
        styles: {
            radius: "1rem",
            glass: true,
            font: "Outfit, sans-serif",
        }
    },
    // 6. MINIMAL CLEAN
    minimal: {
        name: "Minimal Clean",
        colors: {
            background: "0 0% 98%",
            foreground: "0 0% 20%",
            card: "0 0% 100%",
            primary: "0 0% 20%",
            secondary: "0 0% 90%",
            border: "0 0% 90%",
            accent: "0 0% 60%",
        },
        styles: {
            radius: "0px",
            glass: false,
            font: "'Roboto Mono', monospace",
        }
    },
    // 7. ANIME / ANIME-TECH UI
    anime: {
        name: "Anime Tech",
        colors: {
            background: "260 40% 15%",
            foreground: "300 100% 90%",
            card: "260 40% 20%",
            primary: "340 100% 70%", // Pink
            secondary: "200 100% 70%", // Blue
            border: "340 100% 70%",
            accent: "60 100% 70%",
        },
        styles: {
            radius: "1rem",
            glass: true,
            font: "'Exo 2', sans-serif",
        }
    },
    // 11. Vibrant Gradient UI
    gradient: {
        name: "Vibrant Gradient",
        colors: {
            background: "240 50% 10%",
            foreground: "0 0% 100%",
            card: "240 50% 15%",
            primary: "280 80% 60%",
            secondary: "200 80% 60%",
            border: "280 80% 60%",
            accent: "320 80% 60%",
        },
        styles: {
            radius: "1.5rem",
            glass: true,
            font: "Outfit, sans-serif",
        }
    },
    // 14. Retro Pixel-Art Theme
    retro: {
        name: "Retro Pixel",
        colors: {
            background: "220 20% 10%",
            foreground: "120 100% 50%", // Green terminal
            card: "220 20% 15%",
            primary: "120 100% 50%",
            secondary: "0 0% 20%",
            border: "120 100% 50%",
            accent: "60 100% 50%",
        },
        styles: {
            radius: "0px",
            glass: false,
            font: "'Press Start 2P', cursive",
        }
    },
    // 27. Minimal Black-and-White Ink Style
    ink: {
        name: "Ink Black & White",
        colors: {
            background: "0 0% 100%",
            foreground: "0 0% 0%",
            card: "0 0% 100%",
            primary: "0 0% 0%",
            secondary: "0 0% 90%",
            border: "0 0% 0%",
            accent: "0 0% 50%",
        },
        styles: {
            radius: "0.2rem",
            glass: false,
            font: "'Courier New', monospace",
        }
    },
    // 29. Cyber-Office Enterprise
    fluent: {
        name: "Fluent Enterprise",
        colors: {
            background: "210 20% 98%",
            foreground: "210 20% 20%",
            card: "0 0% 100%",
            primary: "200 100% 40%", // Office Blue
            secondary: "210 10% 90%",
            border: "210 10% 85%",
            accent: "200 100% 40%",
        },
        styles: {
            radius: "0.5rem",
            glass: true,
            font: "'Segoe UI', sans-serif",
        }
    }
};
