document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECTORES DEL DOM
    const formulario = document.getElementById('formulario-registro');
    const inputNombre = document.getElementById('input-nombre');
    const inputCategoria = document.getElementById('input-categoria');
    const inputDescripcion = document.getElementById('input-descripcion');
    const listaRegistros = document.getElementById('lista-registros');
    const totalRegistrosSpan = document.getElementById('total-registros');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    // 2. ESTRUCTURA DE DATOS (Arreglo de Objetos) - Requisito de la rúbrica
    // Iniciamos con datos de ejemplo para que la página no se vea vacía al cargar
    let registros = [
        {
            nombre: "E-Commerce Platform",
            categoria: "Fullstack",
            descripcion: "Tienda virtual con pasarela de pagos integrada."
        },
        {
            nombre: "Landing Page Corporativa",
            categoria: "Frontend",
            descripcion: "Sitio web responsivo con animaciones modernas en CSS."
        }
    ];

    // 3. --- RENDERIZADO DINÁMICO (Estructuras Repetitivas y Condicionales) ---
    function renderizarRegistros() {
        // Limpiamos la lista para evitar duplicar elementos
        listaRegistros.innerHTML = '';
        
        // CONDICIONAL: Evalúa el estado de los datos si la lista se vacía
        if (registros.length === 0) {
            listaRegistros.innerHTML = `
                <li class="list-group-item text-center text-muted py-3">
                    No hay elementos registrados en el sistema.
                </li>`;
            totalRegistrosSpan.textContent = 0;
            return;
        }

        // ESTRUCTURA REPETITIVA: Recorre el arreglo para pintar las tarjetas/filas
        registros.forEach((registro, index) => {
            const nuevoLi = document.createElement('li');
            nuevoLi.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2';

            // Inyección dinámica limpia basada en el objeto actual
            nuevoLi.innerHTML = `
                <div>
                    <strong>${registro.nombre}</strong> 
                    <span class="badge bg-primary ms-2">${registro.categoria}</span>
                    <br>
                    <small class="text-muted">${registro.descripcion}</small>
                </div>
                <button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${index})">Eliminar</button>
            `;
            
            listaRegistros.appendChild(nuevoLi);
        });

        // Actualizamos el contador dinámicamente con la longitud del arreglo
        totalRegistrosSpan.textContent = registros.length;
    }

    // 4. FUNCIÓN GLOBAL DE ELIMINACIÓN
    // Al usar plantillas de texto, asignamos la función a 'window' para que el HTML la encuentre
    window.eliminarRegistro = function(index) {
        // Removemos el elemento del arreglo de datos
        registros.splice(index, 1);
        // Volvemos a renderizar la interfaz con los cambios
        renderizarRegistros();
        mostrarMensaje('Registro eliminado correctamente.', 'warning');
    };

    // 5. --- FUNCIONES DE VALIDACIÓN MODULARES (Conservadas de tu script original) ---
    function validarNombre() {
        const valor = inputNombre.value.trim();
        if (valor.length >= 3) {
            marcarValido(inputNombre);
            return true;
        } else {
            marcarInvalido(inputNombre);
            return false;
        }
    }

    function validarCategoria() {
        const valor = inputCategoria.value;
        if (valor !== "") {
            marcarValido(inputCategoria);
            return true;
        } else {
            marcarInvalido(inputCategoria);
            return false;
        }
    }

    function validarDescripcion() {
        const valor = inputDescripcion.value.trim();
        if (valor.length >= 10) {
            marcarValido(inputDescripcion);
            return true;
        } else {
            marcarInvalido(inputDescripcion);
            return false;
        }
    }

    function marcarValido(elemento) {
        elemento.classList.remove('is-invalid');
        elemento.classList.add('is-valid');
    }

    function marcarInvalido(elemento) {
        elemento.classList.remove('is-valid');
        elemento.classList.add('is-invalid');
    }

    function limpiarEstilosCampos() {
        [inputNombre, inputCategoria, inputDescripcion].forEach(elem => {
            elem.classList.remove('is-valid', 'is-invalid');
        });
    }

    // 6. --- MANEJO DE EVENTOS EN TIEMPO REAL ---
    inputNombre.addEventListener('input', validarNombre);
    inputNombre.addEventListener('blur', validarNombre);

    inputCategoria.addEventListener('change', validarCategoria);
    inputCategoria.addEventListener('blur', validarCategoria);

    inputDescripcion.addEventListener('input', validarDescripcion);
    inputDescripcion.addEventListener('blur', validarDescripcion);

    // 7. --- CONTROL DEL FORMULARIO (Submit) ---
    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); 

        const esNombreValido = validarNombre();
        const esCategoriaValida = validarCategoria();
        const esDescripcionValida = validarDescripcion();

        if (esNombreValido && esCategoriaValida && esDescripcionValida) {
            
            // Creamos el nuevo objeto de datos
            const nuevoRegistro = {
                nombre: inputNombre.value.trim(),
                categoria: inputCategoria.value,
                descripcion: inputDescripcion.value.trim()
            };

            // Insertamos el objeto en nuestro arreglo principal
            registros.push(nuevoRegistro);

            // Renderizamos de nuevo para pintar los datos actualizados
            renderizarRegistros();

            mostrarMensaje('¡Registro guardado con éxito!', 'success');
            formulario.reset();
            limpiarEstilosCampos();
        } else {
            mostrarMensaje('Por favor, corrija los campos marcados en rojo antes de registrar.', 'danger');
        }
    });

    // 8. --- UTILIDADES ---
    function mostrarMensaje(texto, tipo) {
        mensajeAlerta.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${texto}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => { mensajeAlerta.innerHTML = ''; }, 4000);
    }

    // 9. CARGA INICIAL
    // Pinta los registros iniciales inmediatamente al abrir la web
    renderizarRegistros();
});
