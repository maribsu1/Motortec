document.addEventListener('DOMContentLoaded', function () {
    // Obtén una lista de todos los títulos de las tarjetas
    const cardTitles = document.querySelectorAll('.card-title');

    // Convierte la NodeList a un array de títulos
    const titlesArray = Array.from(cardTitles).map(title => normalizeString(title.textContent));

    // Agrega un evento de input al campo de búsqueda
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchValue = normalizeString(this.value);
        filterCards(searchValue);
    });

    // Función para filtrar las tarjetas según el valor de búsqueda
    function filterCards(searchValue) {
        titlesArray.forEach((title, index) => {
            const card = document.querySelector(`.col-md-3:nth-child(${index + 1})`);
            const titleNormalized = normalizeString(title);

            if (titleNormalized.includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Función para normalizar una cadena (quitar acentos y convertir a minúsculas)
    function normalizeString(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    // Resto del código...

    // Obtén una referencia al botón
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // Verifica si el botón se encontró antes de asignar eventos
    if (scrollToTopBtn) {
        // Asigna un evento de clic al botón
        scrollToTopBtn.addEventListener('click', scrollToTop);

        // Asigna un evento de scroll para mostrar u ocultar el botón
        window.addEventListener('scroll', handleScroll);
    }

    // Función para manejar el evento de scroll
    function handleScroll() {
        const scrollY = window.scrollY;
        const isScrolled = scrollY > 300;

        // Verifica si el botón se encontró antes de manipular su estilo
        if (scrollToTopBtn) {
            // Muestra u oculta el botón según la posición de desplazamiento
            scrollToTopBtn.style.display = isScrolled ? 'block' : 'none';

            // Agrega o quita la clase de animación según si el botón está visible
            scrollToTopBtn.classList.toggle('animation', isScrolled);
        }
    }

    // Función para desplazarse suavemente hacia arriba
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    const words = ["Correas de repartición", "Sincronización", "Amortiguadores", "Pastillas", "Embragues"];
    let wordIndex = 0;

    function changeWord() {
        const currentWord = words[wordIndex];
        const targetElement = document.querySelector('.cd-words-wrapper b');

        function animateText(index) {
            if (index < currentWord.length) {
                targetElement.innerText = currentWord.slice(0, index + 1);
                setTimeout(() => animateText(index + 1), 30); // Ajusta la velocidad de escritura aquí
            } else {
                setTimeout(() => eraseText(currentWord.length), 1000); // Mantiene la palabra completa por 1 segundo antes de desaparecer
            }
        }

        function eraseText(index) {
            if (index > 0) {
                targetElement.innerText = currentWord.slice(0, index - 1);
                setTimeout(() => eraseText(index - 1), 50); // Ajusta la velocidad de borrado aquí
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(changeWord, 500); // Espera antes de comenzar la siguiente palabra
            }
        }

        animateText(0);
    }

    // Comienza la animación
    changeWord();
});










document.addEventListener("DOMContentLoaded", function () {
    const marcaSelect = document.getElementById('marcaSelect');
    const modeloSelect = document.getElementById('modeloSelect');
    const anioSelect = document.getElementById('anioSelect');
    const cilindrajeSelect = document.getElementById('cilindrajeSelect');

    // Llena las opciones de modelos al cargar la página
    llenarModelos(['Fiesta', 'Escape']);

    // Agrega un evento de cambio a la selección de marca
    marcaSelect.addEventListener('change', function () {
        // Si se selecciona la marca FORD, llena los modelos correspondientes
        if (marcaSelect.value === 'FORD') {
            llenarModelos(['Fiesta', 'Escape']);
        } else if (marcaSelect.value === 'RENAULT') {
            // Si se selecciona la marca RENAULT, llena los modelos correspondientes
            llenarModelos(['Sandero', 'Logan']);
        } else {
            // Limpiar los modelos si se selecciona otra marca
            limpiarSelect(modeloSelect);
            limpiarSelect(anioSelect);
            limpiarSelect(cilindrajeSelect);
        }
        
        // Actualiza las opciones de año y cilindraje
        actualizarOpcionesAnioCilindraje();
    });

    modeloSelect.addEventListener('change', () => {
        actualizarOpcionesAnioCilindraje();
    });

    const cotizacionForm = document.getElementById('cotizacionForm');

    cotizacionForm.addEventListener('submit', function (event) {
        event.preventDefault();
        calcularCotizacion();
    });

    function llenarAnios(anios) {
        limpiarSelect(anioSelect);
        anios.forEach((anio) => {
            const option = document.createElement('option');
            option.value = anio;
            option.textContent = anio;
            anioSelect.appendChild(option);
        });
    }

    function llenarCilindrajes(cilindrajes) {
        limpiarSelect(cilindrajeSelect);
        cilindrajes.forEach((cilindraje) => {
            const option = document.createElement('option');
            option.value = cilindraje;
            option.textContent = cilindraje;
            cilindrajeSelect.appendChild(option);
        });
    }

    function actualizarOpcionesAnioCilindraje() {
        const marca = marcaSelect.value;
        const modelo = modeloSelect.value;

        if (marca === 'RENAULT') {
            switch (modelo) {
                case 'Sandero':
                    llenarAnios(['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']);
                    llenarCilindrajes(['1.600']);
                    break;
                case 'Logan':
                    llenarAnios(['2017', '2018', '2019', '2020', '2021', '2022', '2023']);
                    llenarCilindrajes(['1.600']);
                    break;
                default:
                    limpiarSelect(anioSelect);
                    limpiarSelect(cilindrajeSelect);
            }
        } else if (marca === 'FORD') {
            switch (modelo) {
                case 'Fiesta':
                    llenarAnios(['2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']);
                    llenarCilindrajes(['1.600']);
                    break;
                case 'Escape':
                    llenarAnios(['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023']);
                    llenarCilindrajes(['2.0', '3.0']);
                    break;
                default:
                    limpiarSelect(anioSelect);
                    limpiarSelect(cilindrajeSelect);
            }
        } else {
            limpiarSelect(anioSelect);
            limpiarSelect(cilindrajeSelect);
        }
    }

    function llenarModelos(modelos) {
        limpiarSelect(modeloSelect);
        modelos.forEach((modelo) => {
            const option = document.createElement('option');
            option.value = modelo;
            option.textContent = modelo;
            modeloSelect.appendChild(option);
        });

        // Luego de llenar los modelos, llamar a la función para actualizar las opciones de año y cilindraje
        actualizarOpcionesAnioCilindraje();
    }

    function limpiarSelect(select) {
        select.innerHTML = '<option value="">Seleccione una opción</option>';
    }

    function calcularCotizacion() {
        const marca = marcaSelect.value;
        const modelo = modeloSelect.value;
        const anio = parseInt(anioSelect.value);
        const cilindraje = parseFloat(cilindrajeSelect.value);

        // Tarifas fijas
        const manoDeObra = 25000;

        // Lógica de cálculos según la marca y modelo seleccionados
        switch (marca) {
            case 'FORD':
                calcularFord(modelo, manoDeObra);
                break;
            case 'RENA':
            case 'FORD':
                calcularFord(modelo, manoDeObra);
                break;
            case 'RENAULT':
                calcularRenault(modelo, manoDeObra);
                break;
            default:
                return {};
        }
    }

    function calcularFord(modelo, manoDeObra) {
        let tarifas = {};
        switch (modelo) {
            case 'Fiesta':
                tarifas = {
                    FiltroAire: 35000,
                    FiltroAceite: 18000,
                    AceiteMotor: 35000 * 5 // Multiplicar por 5 unidades
                };
                break;
            case 'Escape':
                tarifas = {
                    FiltroAire: 45000,
                    FiltroAceite: 35000,
                    AceiteMotor: 35000 * 6 // Multiplicar por 6 unidades
                };
                break;
            default:
                return {};
        }

        mostrarCotizacion(calcularTotal(manoDeObra, tarifas), modelo);
    }

    function calcularRenault(modelo, manoDeObra) {
        let tarifas = {};
        const tarifasComunes = {
            FiltroAire: 30000,
            FiltroAceite: 17000,
            AceiteMotor: 33000
        };

        switch (modelo) {
            case 'Sandero':
            case 'Logan':
                tarifas = tarifasComunes;
                tarifas.AceiteMotor *= (modelo === 'Sandero') ? 5 : 4; // Multiplicar según la cantidad especificada
                break;
            default:
                return {};
        }

        mostrarCotizacion(calcularTotal(manoDeObra, tarifas), modelo);
    }

    function calcularTotal(manoDeObra, tarifas) {
        const subtotales = {
            FiltroAire: tarifas.FiltroAire || 0,
            FiltroAceite: tarifas.FiltroAceite || 0,
            AceiteMotor: tarifas.AceiteMotor || 0,
            ManoDeObra: manoDeObra
        };

        const totalGeneral = Object.values(subtotales).reduce((sum, value) => sum + value, 0);

        return {
            subtotales,
            totalGeneral
        };
    }
r
    function mostrarCotizacion(resultado, modelo) {
        const { subtotales, totalGeneral } = resultado;






// Definir las cantidades y valores unitarios específicos para cada modelo
        let cantidadAceiteMotor, valorUnitarioAceiteMotor;
        switch (modelo) {
            case 'Fiesta':
                cantidadAceiteMotor = 5;
                valorUnitarioAceiteMotor = 35000;
                break;
            case 'Logan':
            case 'Sandero':
                cantidadAceiteMotor = 4;
                valorUnitarioAceiteMotor = 33000;
                break;
            case 'Escape':
                cantidadAceiteMotor = 6;
                valorUnitarioAceiteMotor = 35000;
                break;
            default:
                cantidadAceiteMotor = 0;
                valorUnitarioAceiteMotor = 0;
        }
        
        
        
        
        
        
        
        const cotizacionHTML = `
        <h3>Detalle de la Cotización - MOTORTEC </h3>
        <table>
            <thead>
                <tr>
                    <th>Descripción</th>
                    <th>Cant</th>
                    <th>Valor Unitario</th>
                    <th>Valor Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Filtro de Aire</td>
                    <td>1</td>
                    <td>COP ${formatoDinero(subtotales.FiltroAire)}</td>
                    <td>COP ${formatoDinero(subtotales.FiltroAire)}</td>
                </tr>
                <tr>
                    <td>Filtro de Aceite</td>
                    <td>1</td>
                    <td>COP ${formatoDinero(subtotales.FiltroAceite)}</td>
                    <td>COP ${formatoDinero(subtotales.FiltroAceite)}</td>
                </tr>
                <tr>
                    <td>Aceite de Motor</td>
                    <td>${cantidadAceiteMotor}</td>
                    <td>COP ${formatoDinero(valorUnitarioAceiteMotor)}</td>
                    <td>COP ${formatoDinero(subtotales.AceiteMotor)}</td>
                </tr>
                <tr>
                    <td>Mano de Obra</td>
                    <td>1</td>
                    <td>COP ${formatoDinero(subtotales.ManoDeObra)}</td>
                    <td>COP ${formatoDinero(subtotales.ManoDeObra)}</td>
                </tr>
                <tr>
                    <td colspan="3"><strong>Total General</strong></td>
                    <td><strong>COP ${formatoDinero(totalGeneral)}</strong></td>
                </tr>
            </tbody>
            </table>

            <div style="display: flex; justify-content: center;">
            <button id="btnAgendar" class="btn btn-warning mt-3 animar" style="display: none; background-color: #ffd900; /* Amarillo */
            border: none;
            color: black; /* Texto en negro */
            font-weight: bold; /* Texto en negrita */
            padding: 10px 20px; /* Tamaño reducido */
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 14px; /* Tamaño de fuente reducido */
            margin: 4px 2px;
            transition-duration: 0.4s;
            cursor: pointer;"
            onmouseover="this.style.backgroundColor='#ffea00'; this.style.color='white'; this.style.fontWeight='bold';" /* Cambio de color al pasar el mouse */
            onmouseout="this.style.backgroundColor='#ffd900'; this.style.color='black'; this.style.fontWeight='bold';" /* Restaura el color original al quitar el mouse */
            >Agendar Visita</button>
        </div>
        
        
        `;
        

        const cotizacionModal = document.getElementById('cotizacionResult');
        cotizacionModal.innerHTML = cotizacionHTML;


        




        // Mostrar el botón solo cuando haya detalles de cotización
const btnAgendar = document.getElementById('btnAgendar');
if (resultado.totalGeneral > 0) {
    btnAgendar.style.display = 'block';

    // Manejar clic en el botón de agendar cita
    btnAgendar.addEventListener('click', function () {
        // Obtener los valores actuales de las variables necesarias
        const marca = marcaSelect.value;
        const modelo = modeloSelect.value;
        const anio = parseInt(anioSelect.value);
        const cantidadAceiteMotor = obtenerCantidadAceiteMotor(modelo); // Necesitas implementar esta función
        const valorUnitarioAceiteMotor = obtenerValorUnitarioAceiteMotor(modelo); // Necesitas implementar esta función

        // Construir el mensaje de WhatsApp con detalles de la cotización y del vehículo
        const mensajeWhatsApp = `
        Hola, quiero agendar un cambio de aceite para mi vehículo. La cotización es la siguiente:
    
        Filtro de Aire: COP ${formatoDinero(subtotales.FiltroAire)}
        Filtro de Aceite: COP ${formatoDinero(subtotales.FiltroAceite)}
        Aceite de Motor (Cantidad: ${cantidadAceiteMotor}): COP ${formatoDinero(subtotales.AceiteMotor)}
        Mano de Obra: COP ${formatoDinero(subtotales.ManoDeObra)}
    
        Total General: COP ${formatoDinero(totalGeneral)}
    
        Detalles del Vehículo:
        Marca: ${marca}
        Modelo: ${modelo}
        Año: ${anio}
        Cilindraje: ${cilindrajeSelect.value}
    `;
    

        // Mostrar la información en el chat de WhatsApp
        window.open('https://wa.me/+573132856168?text=' + encodeURIComponent(mensajeWhatsApp), '_blank');
    });
}



// Funciones para obtener cantidad y valor unitario de aceite según el modelo
function obtenerCantidadAceiteMotor(modelo) {
    let cantidadAceiteMotor;

    switch (modelo) {
        case 'Fiesta':
            cantidadAceiteMotor = 5;
            break;
        case 'Logan':
        case 'Sandero':
            cantidadAceiteMotor = 4;
            break;
        case 'Escape':
            cantidadAceiteMotor = 6;
            break;
        default:
            cantidadAceiteMotor = 0;
    }

    return cantidadAceiteMotor;
}

function obtenerValorUnitarioAceiteMotor(modelo) {
    let valorUnitarioAceiteMotor;

    switch (modelo) {
        case 'Fiesta':
            valorUnitarioAceiteMotor = 35000;
            break;
        case 'Logan':
        case 'Sandero':
            valorUnitarioAceiteMotor = 33000;
            break;
        case 'Escape':
            valorUnitarioAceiteMotor = 35000;
            break;
        default:
            valorUnitarioAceiteMotor = 0;
    }

    return valorUnitarioAceiteMotor;
}

// Lógica para calcular el valor total del aceite de motor
function calcularValorTotalAceiteMotor(modelo) {
    const cantidadAceiteMotor = obtenerCantidadAceiteMotor(modelo);
    const valorUnitarioAceiteMotor = obtenerValorUnitarioAceiteMotor(modelo);

    return cantidadAceiteMotor * valorUnitarioAceiteMotor;
}}


















//Formato de dinero en pesos 

    function formatoDinero(valor) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
    }

});

// otones call y contact
function llamar() {
    window.location.href = "tel:+573132856168";
}

function guardarContacto() {
    alert("Contacto guardado: +573132856168 - Motortec - Taller integral multimarca");
}

function toggleChat() {
    var chatContainer = document.getElementById("chatContainer");
    chatContainer.style.display = chatContainer.style.display === "none" ? "block" : "none";
}

function redirectToWhatsApp() {
    window.open('https://wa.me/+573132856168', '_blank');
}














//SCROLL BOTONES CONTACT EN RESPONSIVE 

var lastScrollTop = 0;

window.addEventListener("scroll", function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        // Scrolling down, hide the buttons
        document.querySelector(".contact-buttons").classList.add("hidden");
    } else {
        // Scrolling up, show the buttons
        document.querySelector(".contact-buttons").classList.remove("hidden");
    }
    lastScrollTop = st <= 0 ? 0 : st; // For mobile or negative scrolling
});



// Este script mostrará el footer cuando el usuario llegue al final de la página

document.addEventListener("DOMContentLoaded", function () {
    var footer = document.querySelector(".footer");

    function showFooter() {
        var scrollPosition = window.scrollY + window.innerHeight;
        var pageHeight = document.body.offsetHeight;

        if (scrollPosition >= pageHeight) {
            footer.style.opacity = "1";
            footer.style.visibility = "visible";
        } else {
            footer.style.opacity = "0";
            footer.style.visibility = "hidden";
        }
    }

    window.addEventListener("scroll", showFooter);
});






