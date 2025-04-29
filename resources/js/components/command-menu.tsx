import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { useSearch } from '@/context/search-contex';

import { useTheme } from '@/context/theme-context';
import { sidebarData } from '@/data/sidebar-data';
import { router } from '@inertiajs/react';
import { ArrowRight, Laptop, MoonStar, Sun } from 'lucide-react';
import React from 'react';
import { ScrollArea } from './ui/scroll-area';

export function CommandMenu() {
    const { setTheme } = useTheme();
    const { open, setOpen } = useSearch();

    const runCommand = React.useCallback(
        (command: () => unknown) => {
            setOpen(false);
            command();
        },
        [setOpen],
    );

    return (
        <CommandDialog modal open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <ScrollArea type="hover" className="h-72 pr-1">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {sidebarData.navGroups.map((group) => (
                        <CommandGroup key={group.title} heading={group.title}>
                            {group.items.map((navItem, i) => {
                                if (navItem.url)
                                    return (
                                        <CommandItem
                                            key={`${navItem.url}-${i}`}
                                            value={navItem.title}
                                            onSelect={() => {
                                                runCommand(() => router.visit(navItem.url));
                                            }}
                                        >
                                            <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                                <ArrowRight className="text-muted-foreground/80 size-2" />
                                            </div>
                                            {navItem.title}
                                        </CommandItem>
                                    );

                                return navItem.items?.map((subItem, i) => (
                                    <CommandItem
                                        key={`${subItem.url}-${i}`}
                                        value={subItem.title}
                                        onSelect={() => {
                                            runCommand(() => router.visit(subItem.url));
                                        }}
                                    >
                                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                                            <ArrowRight className="text-muted-foreground/80 size-2" />
                                        </div>
                                        {subItem.title}
                                    </CommandItem>
                                ));
                            })}
                        </CommandGroup>
                    ))}
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
                            <Sun /> <span>Light</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
                            <MoonStar className="scale-90" />
                            <span>Dark</span>
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
                            <Laptop />
                            <span>System</span>
                        </CommandItem>
                    </CommandGroup>
                </ScrollArea>
            </CommandList>
        </CommandDialog>
    );
}
