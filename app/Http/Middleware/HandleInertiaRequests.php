<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $notifications = $request->user()?->unreadNotifications
            ->where('type', 'App\Notifications\CommentNotification');

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'isAdmin' => $request->user()?->isAn('admin'),
                'notifications' => $notifications?->map(fn ($item) => [
                    ...$item->data,
                    'type' => $item->type,
                    'id' => $item->id
                ]),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
            'urlPrev' => function () {
                $urlPrev = url()->previous();
                return ($urlPrev !== route('login') && $urlPrev !== '' && $urlPrev !== url()->current()) ? $urlPrev : null;
            }
        ]);
    }
}
