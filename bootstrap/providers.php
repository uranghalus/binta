<?php

use EragLaravelPwa\EragLaravelPwaServiceProvider;

return [
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    Mews\Captcha\CaptchaServiceProvider::class,
    EragLaravelPwaServiceProvider::class,
];
