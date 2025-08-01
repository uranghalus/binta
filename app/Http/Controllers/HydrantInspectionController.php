<?php

namespace App\Http\Controllers;

use App\Models\Hydrant;
use App\Models\HydrantInspection;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class HydrantInspectionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:permissions index', only: ['index']),
            new Middleware('permission:permissions create', only: ['create', 'store']),
            new Middleware('permission:permissions edit', only: ['edit', 'update']),
            new Middleware('permission:permissions delete', only: ['destroy'])
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $inspections = HydrantInspection::with(['hydrant', 'user.karyawan'])->latest()->get();
        return Inertia::render('fire-safety/inspection/hydrant/Index', [
            'inspections' => $inspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $hydrants = Hydrant::all();
        return Inertia::render('fire-safety/inspection/hydrant/Create', [
            'hydrants' => $hydrants,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $fileName = 'photo_' . time() . '.jpg';
        $validated = $request->validate([
            'hydrant_id' => ['nullable', 'exists:hydrant,id'],
            'user_id' => ['nullable', 'exists:users,id'],
            'regu' => ['required', Rule::in(['PAGI', 'SIANG', 'MALAM', 'MIDDLE'])],
            'valve_machino_coupling' => ['nullable', 'string', 'max:150'],
            'fire_hose_machino_coupling' => ['nullable', 'string', 'max:150'],
            'selang_hydrant' => ['nullable', 'string', 'max:150'],
            'noozle_hydrant' => ['nullable', 'string', 'max:150'],
            'kaca_box_hydrant' => ['nullable', 'string', 'max:150'],
            'kunci_box_hydrant' => ['nullable', 'string', 'max:150'],
            'box_hydrant' => ['nullable', 'string', 'max:150'],
            'alarm' => ['nullable', 'string', 'max:150'],
            'foto_hydrant' => ['nullable', function ($attribute, $value, $fail) {
                if (!Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            },],
            'tanggal_inspeksi' => ['nullable', 'date'],
        ]);
        $user = Auth::user();
        $imageData = $request->foto_hydrant;
        if (Str::startsWith($imageData, 'data:image/')) {
            $imageData = explode(',', $imageData)[1]; // buang header base64
        };
        Storage::put("public/inspection/hydrant{$fileName}", base64_decode($imageData));
        $validated['foto_hydrant'] = "inspection/hydrant{$fileName}";
        $validated['user_id'] = $user->id;
        HydrantInspection::create($validated);

        return redirect()->route('inspection.hydrant.index')->with('success', 'Inspeksi Hydrant berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $inspection = HydrantInspection::with(['hydrant', 'user.karyawan'])->findOrFail($id);
        return Inertia::render('fire-safety/inspection/hydrant/Show', [
            'inspection' => $inspection,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $inspections = HydrantInspection::with(['hydrant', 'user.karyawan'])->findOrFail($id);
        $hydrants = Hydrant::all();
        return Inertia::render('fire-safety/inspection/hydrant/Edit', [
            'inspection' => $inspections,
            'hydrants' => $hydrants,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'hydrant_id' => ['nullable', 'exists:hydrant,id'],
            'user_id' => ['nullable', 'exists:users,id'],
            'regu' => ['required', Rule::in(['Regu A', 'Regu B', 'Regu C', 'MIDDLE'])],
            'valve_machino_coupling' => ['nullable', 'string', 'max:150'],
            'fire_hose_machino_coupling' => ['nullable', 'string', 'max:150'],
            'selang_hydrant' => ['nullable', 'string', 'max:150'],
            'noozle_hydrant' => ['nullable', 'string', 'max:150'],
            'kaca_box_hydrant' => ['nullable', 'string', 'max:150'],
            'kunci_box_hydrant' => ['nullable', 'string', 'max:150'],
            'box_hydrant' => ['nullable', 'string', 'max:150'],
            'alarm' => ['nullable', 'string', 'max:150'],
            'foto_hydrant' => ['nullable', 'image', 'max:500'],
            'tanggal_inspeksi' => ['nullable', 'date'],
        ]);

        $inspection = HydrantInspection::findOrFail($id);
        if ($request->hasFile('foto_hydrant')) {
            // Hapus foto lama jika ada
            if ($inspection->foto_hydrant) {
                Storage::disk('public')->delete($inspection->foto_hydrant);
            }
            $validated['foto_hydrant'] = $request->file('foto_hydrant')->store('hydrant_fotos', 'public');
        }
        $inspection->update($validated);

        return redirect()->route('inspection.hydrant.index')->with('success', 'Inspeksi Hydrant berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $inspection = HydrantInspection::findOrFail($id);
        if ($inspection->foto_hydrant) {
            Storage::disk('public')->delete($inspection->foto_hydrant);
        }
        $inspection->delete();

        return redirect()->route('inspection.hydrant.index')->with('success', 'Data berhasil dihapus!');
    }
    public function rekap(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = HydrantInspection::with(['hydrant', 'user.karyawan'])
            ->whereMonth('tanggal_inspeksi', $bulan)
            ->whereYear('tanggal_inspeksi', $tahun)
            ->orderByDesc('tanggal_inspeksi')
            ->get();

        return inertia('Laporan/hydrant-rekap', [
            'rekap' => $rekap,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ]);
    }
    public function exportPdf(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = HydrantInspection::with(['hydrant', 'user.karyawan'])
            ->whereMonth('tanggal_inspeksi', $bulan)
            ->whereYear('tanggal_inspeksi', $tahun)
            ->orderByDesc('tanggal_inspeksi')
            ->get();

        $pdf = Pdf::loadView('report.rekap_hydrant', compact('rekap', 'bulan', 'tahun'));
        return $pdf->download("rekap_hydrant_{$bulan}_{$tahun}.pdf");
    }
}
