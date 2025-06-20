<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:roles index', only: ['index']),
            new Middleware('permission:roles create', only: ['create', 'store']),
            new Middleware('permission:roles edit', only: ['edit', 'update']),
            new Middleware('permission:roles delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roles = Role::select('id', 'name')->with('permissions:id,name')->get();
        return Inertia::render('master/roles/index', [
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $data = Permission::orderBy('name')->pluck(
            'name',
            'id'
        );
        $collection = collect($data);
        $permissions = $collection->groupBy(function ($item, $key) {
            // Memecah string menjadi array kata-kata
            $words = explode(' ', $item);

            // Mengambil kata pertama
            return $words[0];
        });
        return Inertia::render('master/roles/Create', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // validate request
        $request->validate([
            'name' => 'required|min:3|max:255|unique:roles',
            'selectedPermissions' => 'required|array|min:1',
        ]);

        // create new role data
        $role = Role::create(['name' => $request->name]);

        // give permissions to role
        $role->givePermissionTo($request->selectedPermissions);

        // render view
        return to_route('role.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
