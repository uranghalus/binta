<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>QR Code APAR</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 1cm;
            text-align: center;
        }

        h3,
        p {
            margin: 0.5em 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 0 auto;
        }

        td {
            width: 25%;
            height: 200px;
            padding: 10px;
            vertical-align: middle;
        }

        .qr-container {
            padding: 10px;
            border: 3px solid black;
            border-radius: 12px;
            display: inline-block;
        }

        img {
            width: 100px;
            height: 100px;
        }

        .info {
            font-size: 12px;
            margin-top: 6px;
        }
    </style>
</head>

<body>

    <h3>QR Code APAR</h3>

    @if ($lantai)
    <p><strong>Lantai:</strong> {{ $lantai }}</p>
    @endif
    <p><strong>Batch:</strong> {{ $batch }}</p>

    <table>
        @php
        $rows = $apars->chunk(4); // 4 kolom per baris
        $totalRows = 5; // 5 baris maksimal
        @endphp

        @foreach ($rows as $row)
        <tr>
            @foreach ($row as $item)
            <td>
                <div class="qr-container">
                    <img src="{{ $item['qr_base64'] }}" alt="QR">
                </div>
                <div class="info"><strong>{{ $item['kode_apar'] }}</strong></div>
                <div class="info">{{ $item['lokasi'] ?? '-' }}</div>
            </td>
            @endforeach
            @for ($i = $row->count(); $i < 4; $i++)
                <td>
                </td>
                @endfor
        </tr>
        @endforeach

        {{-- Tambahkan baris kosong jika kurang dari 5 --}}
        @for ($i = $rows->count(); $i < $totalRows; $i++)
            <tr>
            @for ($j = 0; $j < 4; $j++)
                <td>
                </td>
                @endfor
                </tr>
                @endfor
    </table>
</body>

</html>