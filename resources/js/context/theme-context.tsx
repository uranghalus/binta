import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export default function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'vite-ui-theme' }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>(defaultTheme);

    useEffect(() => {
        const storedTheme = localStorage.getItem(storageKey) as Theme | null;
        if (storedTheme) {
            setThemeState(storedTheme);
        }
    }, [storageKey]);

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const applyTheme = (theme: Theme) => {
            const systemTheme = mediaQuery.matches ? 'dark' : 'light';
            const effectiveTheme = theme === 'system' ? systemTheme : theme;

            root.classList.remove('light', 'dark');
            root.classList.add(effectiveTheme);
        };

        applyTheme(theme);

        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setTheme = useCallback(
        (newTheme: Theme) => {
            localStorage.setItem(storageKey, newTheme);
            setThemeState(newTheme);
        },
        [storageKey],
    );

    return <ThemeProviderContext.Provider value={{ theme, setTheme }}>{children}</ThemeProviderContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeProviderContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
