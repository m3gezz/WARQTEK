<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DocumentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Document $document): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Document $document): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function admin(User $user): Response
    {
       return $user->role === "admin" ? Response::allow() : Response::deny('not allowed');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function access(User $user, Document $document): Response
    {
        return $user->id === $document->user_id || $user->role === "admin" ? Response::allow() : Response::deny('not allowed');
    }
}
