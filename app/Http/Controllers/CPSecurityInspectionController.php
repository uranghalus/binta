<?php

namespace App\Http\Controllers;

use App\Models\CPInspection;
use App\Models\CekPointSecurity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Intervention\Image\Laravel\Facades\Image;

class CPSecurityInspectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $inspections = CPInspection::with(['cekPoint', 'user.karyawan'])->latest()->get();
        return Inertia::render('cekpoint/Index', [
            'inspections' => $inspections,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $cekPoints = CekPointSecurity::all();
        return Inertia::render('cekpoint/Create', [
            'cekpoints' => $cekPoints,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        ini_set('max_execution_time', 120); // tambah jadi 2 menit
        ini_set('memory_limit', '256M');   // kalau ada gambar besar
        $fileName = 'patroli_' . time() . '.jpg';

        $validated = $request->validate([
            'kode_cp' => ['required', 'exists:cek_point_security,id'],
            'regu'    => ['required', Rule::in(['PAGI', 'SIANG', 'MALAM', 'MIDDLE'])],
            'kondisi' => ['nullable', 'string', 'max:150'],
            'foto_kondisi' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'bocoran' => ['nullable', 'string', 'max:150'],
            'foto_bocoran' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'penerangan_lampu' => ['nullable', 'string', 'max:150'],
            'foto_penerangan_lampu' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'kerusakan_fasum' => ['nullable', 'string', 'max:150'],
            'foto_kerusakan_fasum' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'potensi_bahaya_api' => ['nullable', 'string', 'max:150'],
            'foto_potensi_bahaya_api' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'potensi_bahaya_keorang' => ['nullable', 'string', 'max:150'],
            'foto_potensi_bahaya_keorang' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'orang_mencurigakan' => ['nullable', 'string', 'max:150'],
            'foto_orang_mencurigakan' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
        ]);

        $validated['user_id'] = Auth::id();

        // Handle base64 images for each foto_* field
        foreach (
            [
                'foto_kondisi',
                'foto_bocoran',
                'foto_penerangan_lampu',
                'foto_kerusakan_fasum',
                'foto_potensi_bahaya_api',
                'foto_potensi_bahaya_keorang',
                'foto_orang_mencurigakan'
            ] as $fotoField
        ) {
            if ($request->filled($fotoField) && Str::startsWith($request->$fotoField, 'data:image/')) {
                $imageData = explode(',', $request->$fotoField)[1];
                $decodedImage = base64_decode($imageData);
                $image = Image::read($decodedImage);
                if ($image->width() > 1200) {
                    $image->resize(1200, null);
                }
                $compressed = $image->toJpeg(75);
                $path = "inspection/cekpoint/{$fotoField}_" . time() . ".jpg";
                Storage::disk('s3')->put($path, (string) $compressed);
                $validated[$fotoField] = $path;
            }
        }

        CPInspection::create($validated);

        return redirect()->route('inspection.cp-security.index')->with('success', 'Inspeksi Cekpoint Security berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $inspection = CPInspection::with(['cekPoint', 'user.karyawan'])->findOrFail($id);
        return Inertia::render('cekpoint/Show', [
            'inspection' => $inspection,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $inspection = CPInspection::with(['cekPoint', 'user.karyawan'])->findOrFail($id);
        $cekPoints = CekPointSecurity::all();
        return Inertia::render('cekpoint/Edit', [
            'inspection' => $inspection,
            'cekPoints' => $cekPoints,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $inspection = CPInspection::findOrFail($id);

        $validated = $request->validate([
            'kode_cp' => ['required', 'exists:cek_point_security,id'],
            'regu'    => ['required', Rule::in(['PAGI', 'SIANG', 'MALAM', 'MIDDLE'])],
            'kondisi' => ['nullable', 'string', 'max:150'],
            'foto_kondisi' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'bocoran' => ['nullable', 'string', 'max:150'],
            'foto_bocoran' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'penerangan_lampu' => ['nullable', 'string', 'max:150'],
            'foto_penerangan_lampu' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'kerusakan_fasum' => ['nullable', 'string', 'max:150'],
            'foto_kerusakan_fasum' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'potensi_bahaya_api' => ['nullable', 'string', 'max:150'],
            'foto_potensi_bahaya_api' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'potensi_bahaya_keorang' => ['nullable', 'string', 'max:150'],
            'foto_potensi_bahaya_keorang' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'orang_mencurigakan' => ['nullable', 'string', 'max:150'],
            'foto_orang_mencurigakan' => ['nullable', function ($attribute, $value, $fail) {
                if ($value && !Str::startsWith($value, 'data:image')) {
                    $fail('The ' . $attribute . ' must be a valid base64 image.');
                }
            }],
            'tanggal_patroli' => ['nullable', 'date'],
        ]);

        $validated['user_id'] = Auth::id();

        // Update images if changed
        foreach (
            [
                'foto_kondisi',
                'foto_bocoran',
                'foto_penerangan_lampu',
                'foto_kerusakan_fasum',
                'foto_potensi_bahaya_api',
                'foto_potensi_bahaya_keorang',
                'foto_orang_mencurigakan'
            ] as $fotoField
        ) {
            if ($request->filled($fotoField) && Str::startsWith($request->$fotoField, 'data:image/')) {
                // Delete old photo if exists
                if ($inspection->$fotoField && Storage::disk('s3')->exists($inspection->$fotoField)) {
                    Storage::disk('s3')->delete($inspection->$fotoField);
                }
                $imageData = explode(',', $request->$fotoField)[1];
                $decodedImage = base64_decode($imageData);
                $image = Image::read($decodedImage);
                if ($image->width() > 1200) {
                    $image->resize(1200, null);
                }
                $compressed = $image->toJpeg(75);
                $path = "inspection/cekpoint/{$fotoField}_" . time() . ".jpg";
                Storage::disk('s3')->put($path, (string) $compressed);
                $validated[$fotoField] = $path;
            }
        }

        $inspection->update($validated);

        return redirect()->route('inspection.cp-security.index')->with('success', 'Inspeksi Cekpoint Security berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $inspection = CPInspection::findOrFail($id);

        // Delete images from S3
        foreach (
            [
                'foto_kondisi',
                'foto_bocoran',
                'foto_penerangan_lampu',
                'foto_kerusakan_fasum',
                'foto_potensi_bahaya_api',
                'foto_potensi_bahaya_keorang',
                'foto_orang_mencurigakan'
            ] as $fotoField
        ) {
            if ($inspection->$fotoField && Storage::disk('s3')->exists($inspection->$fotoField)) {
                Storage::disk('s3')->delete($inspection->$fotoField);
            }
        }

        $inspection->delete();

        return redirect()->route('inspection.cp-security.index')->with('success', 'Inspeksi Cekpoint Security berhasil dihapus.');
    }

    public function rekap(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = CPInspection::with(['cekPoint', 'user.karyawan'])
            ->whereMonth('tanggal_patroli', $bulan)
            ->whereYear('tanggal_patroli', $tahun)
            ->orderByDesc('tanggal_patroli')
            ->get();

        return inertia('Laporan/cekpoint-rekap', [
            'rekap' => $rekap,
            'bulan' => $bulan,
            'tahun' => $tahun,
        ]);
    }

    public function exportPdf(Request $request)
    {
        $bulan = $request->input('bulan', now()->format('m'));
        $tahun = $request->input('tahun', now()->format('Y'));

        $rekap = CPInspection::with(['cekPoint', 'user.karyawan'])
            ->whereMonth('tanggal_patroli', $bulan)
            ->whereYear('tanggal_patroli', $tahun)
            ->orderByDesc('tanggal_patroli')
            ->get();

        $pdf = Pdf::loadView('report.rekap_cekpoint', compact('rekap', 'bulan', 'tahun'));
        return $pdf->download("rekap_cekpoint_{$bulan}_{$tahun}.pdf");
    }
}
