<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>QR Code APAR</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0cm;
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
            text-align: center;
            border: 2px solid black
        }

        /* .qr-container {
            width: 100px;
            height: 100px;
            
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            box-sizing: border-box;
        } */

        .qr-container img {
            width: 100px;
            height: 100px;
            padding: 8px;
            text-align: center;
            border-radius: 6px;
            margin: 0 auto;
            border: 1px solid #000;
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

        @php
        $chunks = $apars->chunk(4);
        $emptyRows = 5 - $chunks->count();
        @endphp

        @foreach ($chunks as $row)
        <tr>
            @foreach ($row as $item)
            <td>
                <div class="qr-container">
                    <img src="{{ $item['qr_base64'] }}" alt="QR">
                </div>
                <div class="info"><strong>{{ $item['kode_apar'] }}</strong></div>
                <div class="info">{{ $item['lokasi'] }}</div>
            </td>
            @endforeach

            {{-- Isi kolom kosong jika kurang dari 4 --}}
            @for ($i = $row->count(); $i < 4; $i++)
                <td>
                </td>
                @endfor
        </tr>
        @endforeach

        {{-- Tambah baris kosong jika kurang dari 5 --}}
        @for ($i = 0; $i < $emptyRows; $i++)
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