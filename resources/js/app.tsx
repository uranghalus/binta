import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import ToastProvider from './components/toast-providers';
import ThemeProvider from './context/theme-context';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <ToastProvider />
                <App {...props} />
            </ThemeProvider>,
        );
    },
    progress: {
        color: '#3b82f6',
    },
});

// This will set light / dark mode on load...
initializeTheme();
