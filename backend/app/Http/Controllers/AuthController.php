<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    public function register(Request $request) {
        $fields = $request->validate([
            'first_name'=> 'required|min:5,max:50',
            'last_name'=> 'required|min:5,max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed',
            "role" => ""
        ]);

        $user = User::create($fields);
        $token = $user->createToken($user->first_name)->plainTextToken;

        $data = [
            'user'=> $user,
            'token'=> $token
        ];

        return response()->json($data, 200);
    }

    public function login(Request $request) {

        $fields = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        $user = User::where('email', $fields['email'])->first();

        if (!$user || !Hash::check($fields['password'], $user->password)) {
            $data = [
                    'message' => 'The given data was invalid.',
                    'errors' => ['password' => ['The password is incorrect.']]
                ];

            return response()->json($data, 422);
        }

        $token = $user->createToken($user->first_name)->plainTextToken;

        $data = [
            'user'=> $user,
            'token'=> $token
        ];

        return response()->json($data, 200);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(200);
    }
}
