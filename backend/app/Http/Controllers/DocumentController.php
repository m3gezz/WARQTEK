<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DocumentController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $data = $request->user()->documents()->orderBy('updated_at', 'desc')->paginate(6);
        return response()->json($data ,200);
    }

    public function adminIndex()
    {
        Gate::authorize('admin', Document::class);

        $data = Document::whereIn('status', ['processing', 'on going'])->orderBy('updated_at', 'asc')->paginate(10);
        
        return response()->json($data ,200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->documents()->count() >= 10) {
            return response()->json([
                'errors' => [
                    'documents' => ['Do not spam please, you have been blocked because you have over 10 requests']
                ]
            ], 422);
        }

        $fields = $request->validate([
            'document_type' => 'string|required',
            'delivery_method' => 'string|required',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'city'=> 'nullable|string',
            'postal_code' => 'nullable|string',
            'reason' => 'required|string|min:20',
            'status' => ''
        ]);

        $document = $request->user()->documents()->create($fields);

        return response()->json($document, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Document $document)
    {
        Gate::authorize('access', $document);

        $data =[
            'user' => $document->user()->get()->first(),
            'document' => $document
        ];

        return response()->json($data ,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Document $document)
    {
        Gate::authorize('access', $document);

        $fields = $request->validate([
            'document_type' => 'string|required',
            'delivery_method' => 'string|required',
            'email' => 'nullable|email',
            'address' => 'nullable|string',
            'city'=> 'nullable|string',
            'postal_code' => 'nullable|string',
            'reason' => 'required|string|min:20',
            'status' => ''
        ]);

        $document->update($fields);
        return response()->json($document ,200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Document $document)
    {
        Gate::authorize('access', $document);

        $document->delete();
        return response()->json('deleted',200);
    }
}
