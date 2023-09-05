<!DOCTYPE html>
<html>

<header>
    <style>
        .page-break {
            page-break-after: always;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .text-justify {
            text-align: justify;
        }

        .footer {
            width: 100%;
        }

        .left,
        .right {
            display: inline-block;
            vertical-align: top;
            width: 49%;
        }

        ol {
            counter-reset: item;
        }

        ol li {
            display: block;
            position: relative;
        }

        ol li:before {
            content: counters(item, ".")".";
            counter-increment: item;
            position: absolute;
            margin-right: 100%;
            right: 0.5rem;
        }
    </style>
</header>

<body>
    <div class="text-center">PROCESO DE EJECUCION COACTIVA No. {{ $account->process }}</div>
    <br>
    <br>
    <div class="text-center"><b>XXXXXXXXX</b></div>
    <div class="text-center"><b>EJECUTORA</b></div>

    <p class="text-justify">
        Emite la siguiente orden de pago en su calidad de Órgano Ejecutor de la Potestad de Ejecución Coactiva de la
        Corporación Nacional de Telecomunicaciones, de conformidad a la Acción de Personal No.
        <b>GTHR5-RN-NSP-094-2022</b>, emitida por la Gerencia Nacional de Desarrollo Organizacional del <b>23 de enero
            de 2022</b>, en uso de las facultades que me confiere los artículos 4,5 y 6 del Reglamento para el Ejercicio
        de la Potestad de Ejecución Coactiva de la Corporación Nacional de Telecomunicaciones CNT EP.
    </p>
    <p>
        Guayaquil, {{ $date }}, a las {{ $hour }}.
    </p>

    <p>
    <div><b>ANTECEDENTES:</b></div>
    <p>
    <ol>
        <li class="text-justify">
            El día <b>XXXXXXXXX</b> se emitió el Título de Crédito No. <b>XXXXXXXXX</b> en contra del/a señor/a
            {{ $account->name }} con {{ $identificationType }}: {{ $account->identification }}.
        </li>
        <br>
        <li class="text-justify">
            Conforme lo dispuesto por la Disposición General Cuarta de la Ley Orgánica de Empresas Públicas, publicado
            en
            el Registro Oficial el 16 de octubre de 2009, y el procedimiento regulado por el Título Segundo del Libro
            Tercero del Código Orgánico Administrativo, se notificó a la deudora con el Título de Crédito y se le
            requirió
            que dentro del término de diez días para que pague voluntariamente los valores adeudados a la Corporación
            Nacional de Telecomunicaciones.
        </li>
        <br>
        <li class="text-justify">
            El Título de Crédito al que se ha hecho referencia contiene una obligación determinada y actualmente
            exigible, tal como lo establece el artículo 267 del Código Orgánico Administrativo.
        </li>
    </ol>
    </p>
    <br>
    <br>

    <div><b>SOBRE LA BASE DE LOS ANTECEDENTES EXPUESTOS, SE EMITE LA SIGUIENTE ORDEN DE PAGO:</b></div>
    <p>
    <ol>
        <li class="text-justify">
            Dentro del término de tres días, contados a partir de la notificación con esta orden de pago, a
            {{ $account->name }} con {{ $identificationType }}: {{ $account->identification }} deberá pagar o dimitir a
            favor de la Corporación Nacional de Telecomunicaciones bienes equivalentes a la cantidad de
            {{ $account->principal_amount }} ({{ $amountInLetters }}) más los intereses de mora que se hayan generado
            hasta
            la fecha y que lleguen a generarse hasta la cancelación total de la deuda; así como gastos judiciales,
            costas
            del procedimiento, honorarios profesionales y cualquier otro valor que se genere como consecuencia de este
            procedimiento de ejecución coactiva.
        </li>
        <br>
        <li class="text-justify">
            Se apercibe a la persona coactivada que, en caso de no cumplir con el pago de lo adeudado, se le embargarán
            bienes equivalentes a la deuda, intereses y costas según lo establecido por el artículo 282 del Código
            Orgánico
            Administrativo.
        </li>
        <br>
        <li class="text-justify">
            A fin de garantizar el pago de las obligaciones se disponen las siguientes medidas cautelares:
            <br>
            <br>
            <ol>
                <li class="text-justify">
                    Que, a través del Secretario designado se obtengan certificados de gravámenes, linderos y medidas e
                    historia de dominio de los inmuebles que el coactivado tenga a su nombre en el Registro de la
                    Propiedad
                    del
                    Cantón de domicilio de la parte coactivada y sus cantones aledaños. En caso de tenerlos, se deberá
                    inscribir la
                    prohibición de gravarlos y enajenarlos.
                </li>
                <br>
                <li class="text-justify">
                    Que, a través del Secretario designado se obtengan certificados de vehículos y gravámenes que el
                    coactivado
                    tenga registrado a su nombre en la ANT ATM O Comisión de Transito del Ecuador (CTE) y/o en la
                    Institución de
                    tránsito competente en el lugar del domicilio del/la coactivado/a. En caso de tenerlos, se deberá
                    inscribir la
                    prohibición de gravarlos y enajenarlos.
                </li>
                <br>
                <li class="text-justify">
                    Oficiar a la Superintendencia de Bancos para que comunique a los bancos e instituciones financieras
                    bajo su
                    control, a fin de que informen al Ejecutor si el/la coactivado/a {{ $account->name }} con
                    {{ $identificationType }}: {{ $account->identification }}, mantiene cuentas corrientes, de
                    ahorros,
                    inversiones, depósitos a plazo, pólizas de acumulación o cualquier otra inversión en sus
                    instituciones y
                    de
                    tenerlo ordenar su retención hasta por la suma de {{ $account->principal_amount }}
                    ({{ $amountInLetters }}).
                </li>
                <br>
                <li class="text-justify">
                    Oficiar a la Superintendencia de Economía Popular y Solidaria, para que informen al Ejecutor, si
                    el/la
                    coactivado/a {{ $account->name }} con {{ $identificationType }}: {{ $account->identification }},
                    en
                    las
                    Cooperativas de Ahorro y Crédito a su cargo, mantiene cuentas corrientes, de ahorro, inversiones,
                    depósitos a
                    plazo, pólizas de acumulación o cualquier otra inversión en sus instituciones y de tenerlo ordenar
                    su
                    retención
                    hasta por la suma de {{ $account->principal_amount }} ({{ $amountInLetters }}).
                </li>
                <br>
                <li class="text-justify">
                    Oficiar al Servicio de Rentas Internas (SRI), a fin de que retenga la devolución de valores
                    concernientes
                    al IVA, así como del Impuesto a la Renta, que se hayan generados a favor de el/la coactivado/da
                    {{ $account->name }} con {{ $identificationType }}: {{ $account->identification }} hasta por la
                    suma
                    de
                    {{ $account->principal_amount }} ({{ $amountInLetters }}).
                </li>
            </ol>
        </li>
        <br>
        <li class="text-justify">
            Dejando fotocopias debidamente certificadas en el expediente, procédase al desglose del Título de Crédito en
            el que se sustenta este procedimiento de ejecución coactiva y la delegación conferida al Ejecutor.
        </li>
        <br>
        <li class="text-justify">
            Nombro al Ab. Xavier Iván Orlando Bonilla Representante Legal de la Compañía Law Enforcement S.A., para que
            actúe en este procedimiento en calidad de abogada secretario, quien, estando presente, aceptó desempeñar el
            cargo fiel y legalmente, firmando para constancia con el Ejecutor.
        </li>
    </ol>
    </p>
    </p>
    <!-- <div class="page-break"></div> -->

    <p>
    <div><b>NOTIFÍQUESE.-</b></div>
    <div class="text-right">
        p. Law Enforcement S.A
    </div>
    </p>
    <br>
    <br>
    <br>
    <br>
    <div class="footer">
        <div class="left">
            <div>
                <b>Ab. XXXXXXXXX</b>
            </div>
            <div>
                <b>Jefe de Coactiva R5 Guayas</b>
            </div>
        </div>
        <div class="right">
            <div>
                <b>Ab. Xavier Iván Orlando Bonilla</b>
            </div>
            <div>
                <b>Representante Legal</b>
            </div>
        </div>
    </div>
</body>

</html>
