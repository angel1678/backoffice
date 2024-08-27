<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- <link href="https://fonts.googleapis.com/css?family=Ariel" rel="stylesheet" />
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
    </style> --}}

    <style>
        .page {
            height: 100vh;
            width: 100vw;
        }

        .header {
            width: 100%;
        }

        .logo {
            width: 20rem;
            height: 7rem;
            position: absolute;
            top: 0px;
            right: 0px;
        }

        .body {
            position: absolute;
            top: 10rem;
        }

        .footer {
            border-top: 1px solid #000000;
            width: 100%;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding-top: 0.75rem;
            text-align: center;
            position: absolute;
            bottom: 0px;
            font-size: 12px;
        }

        .footer>div {
            margin-bottom: 0.75rem;
        }

        .footer-redes {
            margin-right: 3rem;
        }
    </style>
</head>

<body>
    <div class="page">
        <div id="header">
            <div class="header">
                <img src="D:/workspace/loyalis/backoffice/public/img/logo-black.png" class="logo" />
            </div>
        </div>
        <div id="body" class="body">
            {!! $text !!}
        </div>
        <div id="footer" class="footer">
            <div>Kennedy Norte, Av. Luis Orrantia Cornejo y Calle 13A; Edificio Atlas Bco Pichincha, Torre Atlas, piso
                10 oficina 01.</div>
            <div>
                <span class="footer-redes">Teléfono: {{ $references->phone }}</span>
                <span class="footer-redes">{{ $references->web_page }}</span>
                <span>Email: {{ $references->email }}</span>
            </div>
            <div>Guayaquil – Ecuador</div>
        </div>
    </div>
</body>

</html>
