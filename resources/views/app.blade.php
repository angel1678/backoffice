<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <link href="https://fonts.googleapis.com/css?family=Ariel" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Sofia" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
    <style>
        .ql-font-ariel {
            font-family: 'Ariel', sans-serif;
        }

        .ql-font-roboto {
            font-family: 'Roboto', sans-serif;
        }

        .ql-font-sofia {
            font-family: 'Sofia', sans-serif;
        }

        .ql-font-ubuntu {
            font-family: 'Ubuntu', sans-serif;
        }
    </style>

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
