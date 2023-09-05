<!DOCTYPE html>
<html>

<header>
    <style>
        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-justify {
            text-align: justify;
        }
    </style>
</header>

<body>
    <div class="text-center">
        REPUBLICA DEL ECUADOR <br>
        ORGANO EJECUTOR DE COACTIVA DEL GUAYAS <br>
        CORPORACIÓN NACIONAL DE TELECOMUNICACIONES - CNT EP <br>
    </div>
    <br>
    <div class="text-right">
        Guayaquil, 05 de enero de 2023
    </div>
    <br>
    <div class="text-center">
        REQUERIMIENTO DE PAGO VOLUNTARIO
    </div>
    <div>
        <b>PROCESO COACTIVO No. {{ $account->process }}</b>
    </div>

    <p class="text-justify">
        <b>A:</b> {{ $account->name }} con {{ $isRuc ? 'ruc' : 'cédula de ciudadanía' }}: {{ $account->identification }}
    </p>

    <p class="text-justify">
        En mi calidad de Empleado Recaudador de este Órgano Ejecutor de Coactiva tiene como objeto hacerle conocer que a
        la
        presente fecha mantiene una deuda con la CORPORACIÓN NACIONAL DE TELECOMUNICACIONES CNT EP, por lo que, este ha
        recibido la <b>ORDEN DE COBRO</b> de fecha 21 de octubre del 2022, signado con el número 0374-GUA-2022, cuyo
        valor es:
        <b>{{ $amountInLetters }} (USD {{ $account->principal_amount }}) </b>, monto que adeuda más
        los
        intereses generados hasta el pago total de la obligación, gastos judiciales, costas procesales, honorarios y
        otros
        accesorios legales; en virtud de aquello se le hace entrega copia certificada del Título de Crédito. Liquidación
        y
        la Orden de Cobro, donde consta el concepto y los valores de la obligación pendiente de pago.
    </p>
    <p class="text-justify">
        Consecuentemente. de conformidad con el Artículo 271 del Código Orgánico Administrativo, el suscrito Empleado
        Recaudador le requiere el pago voluntario de la obligación, para cuyo efecto se le concede el <b>TÉRMINO DE DIEZ
            DÍAS</b>
        hábiles contados a partir del día siguiente de esta notificación, para que pague o solicite una facilidad de
        pago de
        conformidad a los Arts. 274 al 277 del Código Orgánico Administrativo.
    </p>
    <p class="text-justify">
        Por lo tanto, el incumplimiento o hacer caso omiso a esta notificación en el término antes mencionado, permitirá
        iniciar todas las acciones legales previstas en un Proceso Coactivo, dado que en la orden de cobro y en el
        título de
        crédito o fuente de obligación en que se basa esta notificación, siendo esta liquida, clara, pura, determinada,
        exigible y de plazo vencido; por la tanto está obligado al cumplimiento.
    </p>
    <p class="text-justify">
        En caso de requerir más información en donde debe de recurrir para su cancelación o formulación de facilidad de
        pago, podrá hacerlo en el Órgano Ejecutor de Coactiva del Guayas de la Corporación Nacional de
        Telecomunicaciones
        CNT EP ubicada en Manuel Galecio y Ximena, Edif. Trial de la ciudad de Guayaquil.
    </p>
    <p class="text-justify">
        Particular que comunico para los fines legales correspondientes. -
    </p>

    <br>
    <br>
    <div class="text-center">
        Abg. Ana Cristina Leyton Farfán <br>
        EMPLEADO RECAUDADOR <br>
        ORGANO EJECUTOR DE COACTIVA GUAYAS <br>
        CORPORACIÓN NACIONAL DE TELECOMUNICACIONES - CNT EP
    </div>
</body>

</html>
