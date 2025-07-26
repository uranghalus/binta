<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>QR Labels</title>
    <style>
        @page {
            margin: 1cm;
        }

        body {
            font-family: sans-serif;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            text-align: center;
            padding: 8mm 4mm;
            vertical-align: top;
        }

        .qr {
            width: 100px;
            height: 100px;
            border: 4px solid #000;
            border-radius: 8px;
        }

        .label {
            margin-top: 4mm;
            font-size: 11pt;
            font-weight: bold;
        }

        .page-break {
            page-break-after: always;
        }
    </style>
</head>

<body>
    @php
    $columns = 4;
    $perPage = 30;
    $chunks = $qrList->chunk($perPage);
    @endphp

    @foreach ($chunks as $page)
    <table>
        @foreach ($page->chunk($columns) as $row)
        <tr>
            @foreach ($row as $qr)
            <td>
                <img src="{{ $qr['qr_base64'] }}" alt="QR" class="qr"><br>
                <div class="label">{{ $qr['kode_apar'] }}</div>
                <small style="font-weight: bold;">{{ $qr['lokasi'] }}</small>
            </td>
            @endforeach

            {{-- Isi kolom kosong jika kurang dari $columns --}}
            @for ($i = 0; $i < $columns - $row->count(); $i++)
                <td></td>
                @endfor
        </tr>
        @endforeach
    </table>

    @if (!$loop->last)
    <div class="page-break"></div>
    @endif
    @endforeach
</body>

</html>