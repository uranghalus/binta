<!DOCTYPE html>
<html>

<head>
    <title>Rekap Inspeksi APAR</title>
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
    <h2>Rekap Inspeksi APAR - Bulan {{ $bulan }}/{{ $tahun }}</h2>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode APAR</th>
                <th>Lokasi</th>
                <th>Petugas</th>
                <th>Kondisi</th>
                <th>Tanggal</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rekap as $i => $r)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $r->apar->kode_apar ?? '-' }}</td>
                <td>{{ $r->apar->lokasi ?? '-' }}</td>
                <td>{{ $r->user->karyawan->nama ?? '-' }}</td>
                <td>{{ $r->kondisi }}</td>
                <td>{{ \Carbon\Carbon::parse($r->tanggal_inspeksi)->format('d-m-Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>