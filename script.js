document.addEventListener('DOMContentLoaded', () => {
    
    // Selectores del DOM
    const formulario = document.getElementById('formulario-registro');
    const inputNombre = document.getElementById('input-nombre');
    const inputCategoria = document.getElementById('input-categoria');
    const inputDescripcion = document.getElementById('input-descripcion');
    const listaRegistros = document.getElementById('lista-registros');
    const totalRegistrosSpan = document.getElementById('total-registros');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    let contadorRegistros = 0;

    // --- FUNCIONES DE VALIDACIÓN MODULARES ---

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

    // Auxiliares para aplicar clases estéticas de Bootstrap
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

    // --- MANEJO DE EVENTOS EN TIEMPO REAL (input y blur) ---

    inputNombre.addEventListener('input', validarNombre);
    inputNombre.addEventListener('blur', validarNombre);

    inputCategoria.addEventListener('change', validarCategoria);
    inputCategoria.addEventListener('blur', validarCategoria);

    inputDescripcion.addEventListener('input', validarDescripcion);
    inputDescripcion.addEventListener('blur', validarDescripcion);

    // --- CONTROL DEL FORMULARIO (submit) ---

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault(); // Evita recarga de página

        // Validar todos los campos al intentar enviar
        const esNombreValido = validarNombre();
        const esCategoriaValida = validarCategoria();
        const esDescripcionValida = validarDescripcion();

        // Solo procede si absolutamente todas las validaciones son verdaderas
        if (esNombreValido && esCategoriaValida && esDescripcionValida) {
            
            // Crear el registro dinámicamente
            crearElementoRegistro(
                inputNombre.value.trim(),
                inputCategoria.value,
                inputDescripcion.value.trim()
            );

            mostrarMensaje('¡Registro guardado con éxito!', 'success');
            formulario.reset();
            limpiarEstilosCampos();
        } else {
            mostrarMensaje('Por favor, corrija los campos marcados en rojo antes de registrar.', 'danger');
        }
    });

    // --- MANIPULACIÓN DEL DOM (Creación y borrado) ---

    function crearElementoRegistro(nombre, categoria, descripcion) {
        const nuevoLi = document.createElement('li');
        nuevoLi.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2';

        const contenedorTexto = document.createElement('div');
        contenedorTexto.innerHTML = `<strong>${nombre}</strong> <span class="badge bg-primary ms-2">${categoria}</span><br><small class="text-muted">${descripcion}</small>`;

        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-danger btn-sm';
        botonEliminar.textContent = 'Eliminar';

        // Evento click para eliminar individualmente
        botonEliminar.addEventListener('click', () => {
            nuevoLi.remove();
            contadorRegistros--;
            totalRegistrosSpan.textContent = contadorRegistros;
            mostrarMensaje('Registro eliminado correctamente.', 'warning');
        });

        nuevoLi.appendChild(contenedorTexto);
        nuevoLi.appendChild(botonEliminar);
        listaRegistros.appendChild(nuevoLi);

        contadorRegistros++;
        totalRegistrosSpan.textContent = contadorRegistros;
    }

    function mostrarMensaje(texto, tipo) {
        mensajeAlerta.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${texto}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => { mensajeAlerta.innerHTML = ''; }, 4000);
    }
});
