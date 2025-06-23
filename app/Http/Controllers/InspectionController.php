<?php

namespace App\Http\Controllers;

use App\Models\Apar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InspectionController extends Controller
{
    //
    public function aparinspeksi($id)
    {
        $inspection = Apar::findOrFail($id);
        return Inertia::render('inspection/apar', [
            'aparData' => $inspection
        ]);
    }
}
