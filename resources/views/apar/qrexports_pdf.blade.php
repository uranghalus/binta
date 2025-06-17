<!DOCTYPE html>
<html>

<head>
    <style>
        body {
            font-family: sans-serif;
        }

        .page-break {
            page-break-after: always;
        }

        .grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .label {
            font-size: 18px;
            margin-top: 20px;
            font-weight: bold;
            text-align: center;
            padding: 10px;
            border: 2px solid #000;
            border-radius: 5px;
        }

        .qr-code {
            border: 10px solid #000;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            background: #000;
            width: 150px;
            height: 150px;
            display: inline-block;
        }

        .qr-code-container {
            display: inline-block;
            text-align: center;
            margin: 20px;
            padding: 15px;
            border: 2px solid #000;
            border-radius: 10px;
        }
    </style>
</head>

<body>
    <div class="grid grid-cols-4">
        @foreach ($qrList as $index => $qr)
        <div class="qr-code-container">
            <img src="{{ $qr['qr_base64'] }}" alt="QR" class="qr-code">
            <div class="label">{{ $qr['kode_apar'] }}</div>
        </div>

        @if (($index + 1) % 6 == 0)
    </div>
    <div class="page-break"></div>
    <div class="grid">
        @endif
        @endforeach
    </div>
</body>

</html>