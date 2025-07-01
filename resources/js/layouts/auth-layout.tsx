import { Flame } from 'lucide-react';
import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
}
export default function AuthLayout({ children, description, title }: AuthLayoutProps) {
    return (
        <div className="relative container grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="magicpattern absolute inset-0 z-20 h-[450px]" />
                <div className="relative z-20 flex items-center gap-3 text-lg font-medium">
                    <div className="rounded bg-zinc-400 p-2.5">
                        <Flame className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-qurova">VeriFire</div>
                        <div className="text-xs text-zinc-600">V.1.1.0</div>
                    </div>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Ilmu tanpa amal seperti pohon tanpa buah. Amal tanpa ikhlas seperti bangunan tanpa pondasi. Dan hati tanpa
                            mengingat seperti malam tanpa bulan.&rdquo;
                        </p>
                        <footer className="text-sm">Uwais Al Qarani</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-left">
                        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
                        <p className="text-muted-foreground text-sm">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
