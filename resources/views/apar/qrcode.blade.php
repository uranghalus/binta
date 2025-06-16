<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>QR Code APAR</title>
    <style>
        body {
            text-align: center;
            font-family: sans-serif;
        }

        .qrcode {
            margin-top: 50px;
        }

        .label {
            font-size: 18px;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
</head>

<body>
    <div class="qrcode">
        <img src="{{ $qrCodeImage }}" alt="QR Code">
    </div>
    <div class="label">
        {{ $kode_apar }}
    </div>
</body>

</html>