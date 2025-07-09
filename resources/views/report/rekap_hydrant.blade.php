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
    <h2 style="text-align: center;">Rekap Inspeksi Hydrant - Bulan {{ $bulan }}/{{ $tahun }}</h2>
    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Hydrant</th>
                <th>Lokasi</th>
                <th>Regu</th>
                <th>Petugas</th>
                <th>Kondisi Selang</th>
                <th>Kondisi Noozle</th>
                <th>Kondisi Box Kaca</th>
                <th>Tanggal Inspeksi</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rekap as $i => $r)
            <tr>
                <td>{{ $i + 1 }}</td>
                <td>{{ $r->hydrant->kode_hydrant ?? '-' }}</td>
                <td>{{ $r->hydrant->lokasi ?? '-' }}</td>
                <td>{{ $r->regu }}</td>
                <td>{{ $r->user->karyawan->nama ?? '-' }}</td>
                <td>{{ $r->selang_hydrant }}</td>
                <td>{{ $r->noozle_hydrant }}</td>
                <td>{{ $r->kaca_box_hydrant }}</td>
                <td>{{ \Carbon\Carbon::parse($r->tanggal_inspeksi)->format('d-m-Y') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>