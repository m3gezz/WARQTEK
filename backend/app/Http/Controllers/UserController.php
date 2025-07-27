<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Gate::authorize('admin', User::class);

        $search = $request->query('search');

        $query = User::where('role', 'user')->orderBy('created_at', 'desc');

        if($search) {
            $query->where('email', 'like', "%{$search}%");
        }

        $data = $query->paginate(10);

        return response()->json($data ,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        Gate::authorize('admin', User::class);
        return response()->json($user ,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        Gate::authorize('admin', User::class);
        $fields = $request->validate([
            'first_name'=> 'required|min:5,max:50',
            'last_name'=> 'required|min:5,max:50',
            'email' => 'required|email',
            'password' => 'required|string',
            "role" => ""
        ]);

        $user->update($fields);

        return response()->json($user, 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('admin', User::class);
        $user->delete();
        return response()->json('deleted',200);
    }
}
