import { toast } from 'sonner';

export default function ShowSubmittedData(data: unknown, title: string) {
    toast.message(title, {
        description: (
            <pre className="mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
    });
}
