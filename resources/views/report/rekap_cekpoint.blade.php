<!DOCTYPE html>
<html>

<head>
    <title>Rekap Inspeksi Cekpoint Security</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        th,
        td {
            border: 1px solid #999;
            padding: 5px;
            text-align: left;
        }
    </style>
</head>

<body>
    <h2 style="text-align: center;">
        Rekap Inspeksi Cekpoint Security <br>
        @if(request('tipe') === 'minggu' && request('minggu'))
        Minggu ke-{{ request('minggu') }}
        ({{ \Carbon\Carbon::create($tahun, $bulan, 1)->addWeeks(request('minggu') - 1)->startOfWeek()->format('d-m-Y') }}
        s/d
        {{ \Carbon\Carbon::create($tahun, $bulan, 1)->addWeeks(request('minggu') - 1)->endOfWeek()->format('d-m-Y') }})
        @else
        Bulan {{ \Carbon\Carbon::create()->month($bulan)->translatedFormat('F') }} {{ $tahun }}
        @endif
    </h2>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Cekpoint</th>
                <th>Lokasi</th>
                <th>Area</th>
                <th>Regu</th>
                <th>Petugas</th>
                <th>Kondisi</th>
                <th>Bocoran</th>
                <th>Penerangan Lampu</th>
                <th>Kerusakan Fasum</th>
                <th>Potensi Bahaya Api</th>
                <th>Potensi Bahaya Keorang</th>
                <th>Orang Mencurigakan</th>
                <th>Tanggal Patroli</th>
            </tr>
        </thead>
        <tbody>
            @forelse($rekap as $i => $r)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $r->cekPoint->kode_cekpoint ?? '-' }}</td>
                <td>{{ $r->cekPoint->lokasi ?? '-' }}</td>
                <td>{{ $r->cekPoint->area ?? '-' }}</td>
                <td>{{ $r->regu ?? '-' }}</td>
                <td>{{ $r->user->karyawan->nama ?? '-' }}</td>
                <td>{{ $r->kondisi ?? '-' }}</td>
                <td>{{ $r->bocoran ?? '-' }}</td>
                <td>{{ $r->penerangan_lampu ?? '-' }}</td>
                <td>{{ $r->kerusakan_fasum ?? '-' }}</td>
                <td>{{ $r->potensi_bahaya_api ?? '-' }}</td>
                <td>{{ $r->potensi_bahaya_keorang ?? '-' }}</td>
                <td>{{ $r->orang_mencurigakan ?? '-' }}</td>
                <td>{{ \Carbon\Carbon::parse($r->tanggal_patroli)->format('d-m-Y') }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="14" style="text-align: center;">Tidak ada data</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</body>

</html>