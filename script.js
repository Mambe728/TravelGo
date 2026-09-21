```javascript
// ========================================
// TRAVELGO - JAVASCRIPT
// ========================================


// ========================================
// PRECIOS DE LOS DESTINOS
// ========================================

const destinos = {

    Cancun: 6500,

    Bali: 18900,

    Paris: 22500,

    NuevaYork: 16800,

    Italia: 24500,

    Japon: 27900

};


// ========================================
// LEER DESTINO DE LA URL
// ========================================

function cargarDestino() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const destino =
        parametros.get("destino");


    const select =
        document.getElementById("destination");


    if (!select || !destino) {
        return;
    }


    if (destinos[destino]) {

        select.value =
            destinos[destino];

    }

}


// ========================================
// RESERVACIÓN
// ========================================

const formulario =
    document.getElementById("reservationForm");


if (formulario) {

    cargarDestino();


    formulario.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const nombre =
                document
                    .getElementById("name")
                    .value;


            const correo =
                document
                    .getElementById("email")
                    .value;


            const selectDestino =
                document
                    .getElementById("destination");


            const destino =
                selectDestino
                    .options[
                        selectDestino.selectedIndex
                    ].text;


            const precio =
                parseFloat(
                    selectDestino.value
                );


            const viajeros =
                parseInt(
                    document
                        .getElementById("travelers")
                        .value
                );


            const tipo =
                parseFloat(
                    document
                        .getElementById("type")
                        .value
                );


            const salida =
                document
                    .getElementById("departure")
                    .value;


            const regreso =
                document
                    .getElementById("return")
                    .value;


            const pago =
                document
                    .getElementById("payment")
                    .value;


            // ==============================
            // VALIDACIÓN
            // ==============================

            if (!precio) {

                alert(
                    "Selecciona un destino."
                );

                return;

            }


            if (viajeros < 1) {

                alert(
                    "Debes indicar al menos un viajero."
                );

                return;

            }


            if (
                new Date(regreso) <
                new Date(salida)
            ) {

                alert(
                    "La fecha de regreso debe ser posterior a la salida."
                );

                return;

            }


            // ==============================
            // CALCULAR PRECIO
            // ==============================

            const total =
                precio *
                viajeros *
                tipo;


            // ==============================
            // NÚMERO DE RESERVA
            // ==============================

            const numeroReserva =
                "TG-" +
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );


            // ==============================
            // GUARDAR
            // ==============================

            const reserva = {

                numero:
                    numeroReserva,

                nombre:
                    nombre,

                correo:
                    correo,

                destino:
                    destino,

                viajeros:
                    viajeros,

                salida:
                    salida,

                regreso:
                    regreso,

                pago:
                    pago,

                total:
                    total

            };


            let reservas =
                JSON.parse(
                    localStorage.getItem(
                        "travelGoReservas"
                    )
                ) || [];


            reservas.push(reserva);


            localStorage.setItem(
                "travelGoReservas",
                JSON.stringify(reservas)
            );


            // ==============================
            // MOSTRAR RESULTADO
            // ==============================

            const resultado =
                document.getElementById(
                    "reservationResult"
                );


            const texto =
                document.getElementById(
                    "resultText"
                );


            texto.innerHTML = `

                <strong>Número de reserva:</strong>
                ${numeroReserva}

                <br>

                <strong>Cliente:</strong>
                ${nombre}

                <br>

                <strong>Destino:</strong>
                ${destino}

                <br>

                <strong>Viajeros:</strong>
                ${viajeros}

                <br>

                <strong>Salida:</strong>
                ${salida}

                <br>

                <strong>Regreso:</strong>
                ${regreso}

                <br>

                <strong>Forma de pago:</strong>
                ${pago}

                <br><br>

                <strong>
                    Precio estimado:
                    $${total.toLocaleString("es-MX")}
                    MXN
                </strong>

                <br><br>

                Gracias por reservar con TravelGo.
            `;


            resultado.style.display =
                "block";


            resultado.scrollIntoView({
                behavior: "smooth"
            });


            formulario.reset();

        });

}


// ========================================
// FECHAS MÍNIMAS
// ========================================

const fechaSalida =
    document.getElementById("departure");


const fechaRegreso =
    document.getElementById("return");


if (fechaSalida && fechaRegreso) {

    const hoy =
        new Date()
            .toISOString()
            .split("T")[0];


    fechaSalida.min = hoy;

    fechaRegreso.min = hoy;


    fechaSalida.addEventListener(
        "change",
        function() {

            fechaRegreso.min =
                fechaSalida.value;

        }
    );

}
```
