import { Input } from '@/components/ui/input';

interface Props {
    search: string;
    onSearchChange: (value: string) => void;
}

function CpiToolbar({ search, onSearchChange }: Props) {
    return (
        <div className="-items-center flex justify-between">
            <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
                <Input
                    type="text"
                    placeholder="Cari Cekpoint..."
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    className="w-full rounded border px-2 py-1 sm:w-[250px] md:w-[300px] lg:w-[400px]"
                />
            </div>
        </div>
    );
}

export default CpiToolbar;

