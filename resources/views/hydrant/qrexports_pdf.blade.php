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
            /* padding: 0; */
        }

        .label-wrapper {
            width: 20%;
            display: inline-block;
            box-sizing: border-box;
            padding: 6mm 0;
            text-align: center;
        }

        .qr {
            width: 80%;
            border: 4px solid #000;
            border-radius: 8px;
        }

        .label {
            margin-top: 4mm;
            font-size: 11pt;
            font-weight: bold;
            word-wrap: break-word;
        }

        .page-break {
            page-break-after: always;
            clear: both;
        }
    </style>
</head>

<body>
    @foreach ($qrList as $index => $qr)
    <div class="label-wrapper">
        <img src="{{ $qr['qr_base64'] }}" alt="QR" class="qr">
        <div class="label">{{ $qr['kode_hydrant'] }}</div>
    </div>

    @if (($index + 1) % 30 === 0)
    <div class="page-break"></div>
    @endif
    @endforeach
</body>

</html>