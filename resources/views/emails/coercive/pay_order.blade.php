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
        DENTRO DEL PROCESO COACTIVO {{ $account->process }} QUE SIGUE LA CORPORACIÓN NACIONAL DE TELECOMUNICACIONES EN
        SU CONTRA, SE LE HACE SABER LO SIGUIENTE:
    </p>
    <p>
        De acuerdo a lo dispuesto en los Art. 280 y 165 inciso segundo del Código Orgánico Administrativo, se procede
        con la notificación de la orden de pago que se adjunta para que pague la deuda o dimita bienes dentro de tres
        días contados desde el siguiente al de esta notificación, apercibiéndole que, de no hacerlo, se embargarán
        bienes equivalentes al total de la deuda por el capital, intereses y costas.
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
