<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Karyawan;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nik' => 'required|exists:tbl_karyawans,nik',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $karyawan = Karyawan::with('jabatan')->where('nik', $request->nik)->firstOrFail();

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'karyawan_id' => $karyawan->id_karyawan,
        ]);

        // ✅ Sinkronisasi Role dari Jabatan Karyawan
        if (
            $karyawan->jabatan &&
            is_array($karyawan->jabatan->roles)
        ) {
            $user->syncRoles($karyawan->jabatan->roles);
        }

        event(new Registered($user));
        Auth::login($user);

        return to_route('dashboard');
    }
}
