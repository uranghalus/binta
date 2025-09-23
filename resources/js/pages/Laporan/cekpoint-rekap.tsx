import { usePage } from "@inertiajs/react";
import React, { useState } from "react";


interface CPInspection {
    id: number;
    kode_cp: string;
    nama_petugas: string;
    regu: string;
    kondisi: string;
    tanggal_patroli: string;
}

interface Pagination<T> {
    data: T[];
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
}

interface ReportPageProps {
    items: Pagination<CPInspection>;
    filters: {
        type: "week" | "month";
        date: string;
    };
}

export default function CPIndex() {
    const { items, filters } = usePage<ReportPageProps>().props;

    const [type, setType] = useState<"week" | "month">(filters.type || "week");
    const [date, setDate] = useState<string>(
        filters.date || new Date().toISOString().slice(0, 10)
    );

    const apply = () => {
        Inertia.get(
            route("reports.cp.index"),
            { type, date },
            { preserveState: true, replace: true }
        );
    };

    const exportPdf = () => {
        window.open(route("reports.cp.exportPdf", { type, date }), "_blank");
    };

    const openPrint = () => {
        window.open(route("reports.cp.print", { type, date }), "_blank");
    };

    return (
        <div>
            <h1 className="text-xl font-bold mb-4">Laporan CP Inspection</h1>

            <div className="flex gap-2 mb-4">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "week" | "month")}
                    className="border px-2 py-1"
                >
                    <option value="week">Mingguan</option>
                    <option value="month">Bulanan</option>
                </select>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border px-2 py-1"
                />

                <button onClick={apply} className="px-3 py-1 bg-blue-600 text-white">
                    Terapkan
                </button>
                <button onClick={exportPdf} className="px-3 py-1 bg-green-600 text-white">
                    Export PDF
                </button>
                <button onClick={openPrint} className="px-3 py-1 bg-gray-600 text-white">
                    Print
                </button>
            </div>

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">No</th>
                        <th className="border px-2 py-1">Kode</th>
                        <th className="border px-2 py-1">Petugas</th>
                        <th className="border px-2 py-1">Regu</th>
                        <th className="border px-2 py-1">Kondisi</th>
                        <th className="border px-2 py-1">Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.data.map((r, idx) => (
                        <tr key={r.id}>
                            <td className="border px-2 py-1">{items.from + idx}</td>
                            <td className="border px-2 py-1">{r.kode_cp}</td>
                            <td className="border px-2 py-1">{r.nama_petugas}</td>
                            <td className="border px-2 py-1">{r.regu}</td>
                            <td className="border px-2 py-1 max-w-xs truncate">{r.kondisi}</td>
                            <td className="border px-2 py-1">{r.tanggal_patroli}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
