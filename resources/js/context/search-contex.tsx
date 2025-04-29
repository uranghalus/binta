import { CommandMenu } from '@/components/command-menu';
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';

interface SearchContextType {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
    children: ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps) {
    const [open, setOpen] = useState(false);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            setOpen((prev) => !prev);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown, { passive: false });
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return (
        <SearchContext.Provider value={{ open, setOpen }}>
            {children}
            <CommandMenu />
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
