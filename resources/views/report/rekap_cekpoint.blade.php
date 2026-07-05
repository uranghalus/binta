<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>rekap_cp_{{ $bulan }}_{{ $tahun }}</title>
    <style>
        body {
            font-family: sans-serif;
            font-size: 11px;
        }

        h2 {
            text-align: center;
            margin-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
        }

        th,
        td {
            border: 1px solid #999;
            padding: 4px;
            vertical-align: top;
        }

        th {
            background: #eee;
            text-align: center;
        }

        @media print {
            body {
                margin: 1cm;
                color: #000;
                background-color: #fff;
            }
            table {
                page-break-inside: auto;
            }
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
            thead {
                display: table-header-group;
            }
        }
    </style>
</head>

<body>

    <h2>
        Rekap Inspeksi Cekpoint Security <br>
        Bulan {{ \Carbon\Carbon::create()->month((int)$bulan)->translatedFormat('F') }}
        {{ $tahun }}
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
            @forelse ($rekap as $i => $r)
            <tr>
                <td style="text-align:center;">{{ $i + 1 }}</td>
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
                <td style="text-align:center;">
                    {{ \Carbon\Carbon::parse($r->tanggal_patroli)->format('d-m-Y') }}
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="14" style="text-align:center;">
                    Tidak ada data
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
    <script>
        window.onload = function() {
            window.print();
            window.onafterprint = function() {
                window.close();
            };
        }
    </script>
</body>

</html>