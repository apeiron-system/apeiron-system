<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Enums\PermissionsEnum;

class CheckPermission
{
    public function handle(Request $request, Closure $next,  $permission)
    {
        $user = Auth::user();

        if ($user->hasRole('admin')) {
            return $next($request);
        }

        if (!$user || !$user->can($permission)) {
            // Redirect or return an error if the user does not have the required permission
            abort(403, 'Unauthorized');
        }

        return $next($request);
    }
}
