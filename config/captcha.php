<?php

return [
    'disable' => env('CAPTCHA_DISABLE', false),
    'characters' => ['2', '3', '4', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'm', 'n', 'p', 'q', 'r', 't', 'u', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'X', 'Y', 'Z'],
    'minimal' => [
        'length' => 4,
        'width' => 200,
        'height' => 50,
        'quality' => 100,
        'math' => false,              // nonaktifkan mode matematika
        'bgColor' => '#ffffff',       // background putih
        'fontColors' => ['#000000'],  // teks hitam
        'contrast' => 0,              // tidak terlalu kontras
        'angle' => 0,                 // tidak dimiringkan
        'sharpen' => 0,               // tidak perlu sharp filter
        'blur' => 0,                  // tidak perlu blur
        'lines' => 0,                 // tanpa garis/noise
        'invert' => false,            // tidak dibalik warnanya
    ],
    'default' => [
        'length' => 4,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'math' => false,
        'expire' => 60,
        'encrypt' => false,
        'bgColor' => '#ffffff', // ← ini warna putih
    ],
    'math' => [
        'length' => 4,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'math' => true,
    ],

    'flat' => [
        'length' => 4,
        'width' => 160,
        'height' => 46,
        'quality' => 90,
        'lines' => 0,
        'bgImage' => false,
        'bgColor' => '#ffffff',
        'fontColors' => ['#2c3e50', '#c0392b', '#16a085', '#c0392b', '#8e44ad', '#303f9f', '#f57c00', '#795548'],
        'contrast' => -5,
        'angle' => 0, // tidak terlalu miring
    ],
    'mini' => [
        'length' => 3,
        'width' => 60,
        'height' => 32,
    ],
    'inverse' => [
        'length' => 5,
        'width' => 120,
        'height' => 36,
        'quality' => 90,
        'sensitive' => true,
        'angle' => 12,
        'sharpen' => 10,
        'blur' => 2,
        'invert' => true,
        'contrast' => -5,
    ]
];
