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
            border: 1px solid #000;
        }

        .qr {
            width: 100px;
            height: 100px;
            border: 4px solid #000;
            padding: 1.5mm;
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

    @foreach ($qrDataList as $qr)
    <div class="label">
        <div class="info">
            <strong>{{ $qr['kode_apar'] }}</strong><br>
            {{ $qr['lokasi'] }}<br>
            {{ $qr['penempatan'] }}
        </div>
        <img src="{{ $qr['qr_base64'] }}" alt="QR Code" class="qr">
    </div>
    @endforeach
</body>

</html>