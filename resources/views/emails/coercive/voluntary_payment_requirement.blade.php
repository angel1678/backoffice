<!DOCTYPE html>
<html>

<body>
    <p>
        <b>PROCESO COACTIVO No. {{ $account->process }}</b>
    </p>
    <p>
        <b>A:</b> {{ $account->name }} con {{ $isRuc ? 'ruc' : 'cédula de ciudadanía' }}:
        {{ $account->identification }}.
    </p>
    <p>
        La Corporación Nacional de Telecomunicaciones, fundamentado en el artículo 154 de la Resolución CD. 625; y,
        artículo 2 de la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos, notifica a usted que
        mantiene obligaciones patronales pendientes de pago.
    </p>
    <p>
        En virtud de los valores impagos y de conformidad a lo establecido en el artículo 271 del Código Orgánico
        Administrativo (COA) <b>dispongo que el deudor pague voluntariamente dicha obligación dentro de 10 días contados
            desde la fecha de su notificación</b>, previniendo que, de no hacerlo se procederá con la ejecución
        coactiva,
        conforme lo dispuesto en el Art. 279.- Orden de pago inmediato, Capítulo Tercero, Fase de Apremio, Sección
        Primera, Orden de pago del Código Orgánico Administrativo (COA).
    </p>
    <br>
    <p>
    <div>Ab. Xavier Orlando Bonilla</div>
    <div>REPRESENTANTE LEGAL - LAW ENFORCEMENT S.A</div>
    <div>Kennedy Norte, Av. Luis Orrantia Cornejo y Calle 13A; Edificio Atlas Bco Pichincha, Torre Atlas, piso 10
        oficina 01.</div>
    <div>Teléfono: (593) 98 731 2527</div>
    <div>email: coactivacntgye@loyalis.ec</div>
    <div>Guayaquil - Ecuador</div>
    <div>
        <img src="{{ $message->embed('img/loyalis.png') }}">
    </div>
    </p>
</body>

</html>
