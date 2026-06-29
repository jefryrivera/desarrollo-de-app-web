// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Variables de control de elementos del DOM
    const formulario = document.getElementById('formulario-registro');
    const inputNombre = document.getElementById('input-nombre');
    const inputCategoria = document.getElementById('input-categoria');
    const inputDescripcion = document.getElementById('input-descripcion');
    const listaRegistros = document.getElementById('lista-registros');
    const totalRegistrosSpan = document.getElementById('total-registros');
    const mensajeAlerta = document.getElementById('mensaje-alerta');

    let contadorContador = 0;

    // Función para actualizar el contador en pantalla
    function actualizarContador() {
        totalRegistrosSpan.textContent = contadorContador;
    }

    // Capturar el evento submit del formulario
    formulario.addEventListener('submit', (evento) => {
        // Evitar que la página se recargue automáticamente
        evento.preventDefault();

        // Obtener y limpiar los valores de los inputs
        const nombre = inputNombre.value.trim();
        const categoria = inputCategoria.value;
        const descripcion = inputDescripcion.value.trim();

        // Validación de campos vacíos
        if (nombre === '' || categoria === '' || descripcion === '') {
            mostrarMensaje('Por favor, completa todos los campos del formulario.', 'danger');
            return; // Detiene la ejecución
        }

        // Si pasa la validación, creamos el elemento dinámicamente
        crearElementoRegistro(nombre, categoria, descripcion);

        // Mostrar mensaje de éxito
        mostrarMensaje('¡Registro agregado correctamente!', 'success');

        // Limpiar el formulario
        formulario.reset();
    });

    // Función para crear elementos HTML desde JS (createElement y appendChild)
    function crearElementoRegistro(nombre, categoria, descripcion) {
        // 1. Crear el elemento de la lista (li)
        const nuevoLi = document.createElement('li');
        // Aplicar clases de Bootstrap dinámicamente
        nuevoLi.className = 'list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 animated fadeIn';

        // 2. Crear el contenedor de texto
        const contenedorTexto = document.createElement('div');
        contenedorTexto.innerHTML = `<strong>${nombre}</strong> <span class="badge bg-secondary ms-2">${categoria}</span><br><small class="text-muted">${descripcion}</small>`;

        // 3. Crear el botón para eliminar el registro
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'btn btn-danger btn-sm';
        botonEliminar.textContent = 'Eliminar';

        // Asignar el evento click al botón de eliminar
        botonEliminar.addEventListener('click', () => {
            nuevoLi.remove(); // Elimina el elemento del DOM
            contadorContador--; // Resta al contador
            actualizarContador();
            mostrarMensaje('Registro eliminado.', 'warning');
        });

        // 4. Armar la estructura del elemento con appendChild
        nuevoLi.appendChild(contenedorTexto);
        nuevoLi.appendChild(botonEliminar);

        // 5. Agregar el elemento completo a la lista de la interfaz
        listaRegistros.appendChild(nuevoLi);

        // Incrementar y actualizar contador global
        contadorContador++;
        actualizarContador();
    }

    // Función para mostrar mensajes dinámicos de validación al usuario
    function mostrarMensaje(texto, tipo) {
        mensajeAlerta.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
                ${texto}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // Auto-ocultar la alerta después de 4 segundos
        setTimeout(() => {
            mensajeAlerta.innerHTML = '';
        }, 4000);
    }
});