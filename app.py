from flask import Flask, render_template, redirect, url_for, flash
from forms.producto_form import ProductoForm
from forms.cliente_form import ClienteForm
from forms.proveedor_form import ProveedorForm
from forms.facturacion_form import FacturacionForm

app = Flask(__name__)
# Configuración requerida para Flask-WTF / CSRF
app.config['SECRET_KEY'] = 'clave_secreta_proyecto_integrador_2026'

SISTEMA_NOMBRE = "Plataforma de Gestión Integral"

# Listas temporales en memoria
lista_productos = [
    {"id": 1, "nombre": "Desarrollo Web Base", "categoria": "frontend", "precio": 350.00, "stock": 5},
    {"id": 2, "nombre": "API Restful Python", "categoria": "backend", "precio": 450.50, "stock": 0},
    {"id": 3, "nombre": "Sistema de Inventario", "categoria": "fullstack", "precio": 800.00, "stock": 3}
]

lista_clientes = [
    {"id": 1, "nombre": "tech corp", "email": "CONTACTO@TECHCORP.COM", "telefono": "0991234567"},
    {"id": 2, "nombre": "soluciones web", "email": "INFO@SOLUCIONESWEB.COM", "telefono": "0998765432"}
]

lista_proveedores = [
    {"id": 1, "empresa": "Hosting Express", "servicio": "Servidores VPS", "contacto": "soporte@hosting.com"},
    {"id": 2, "empresa": "Domain Registrar", "servicio": "Dominios Web", "contacto": "ventas@domain.com"}
]

lista_facturas = [
    {"id": "FAC-001", "cliente": "Tech Corp", "monto": 800.00, "estado": "Pagado"},
    {"id": "FAC-002", "cliente": "Soluciones Web", "monto": 350.00, "estado": "Pendiente"}
]

# --- RUTAS PRINCIPALES Y FORMULARIOS ---

@app.route('/')
def index():
    return render_template('index.html', nombre_sistema=SISTEMA_NOMBRE)

# PRODUCTOS
@app.route('/productos')
def productos():
    return render_template('productos.html', productos=lista_productos, titulo_modulo="Catálogo de Productos")

@app.route('/productos/nuevo', methods=['GET', 'POST'])
def nuevo_producto():
    form = ProductoForm()
    if form.validate_on_submit():
        nuevo_id = len(lista_productos) + 1
        lista_productos.append({
            "id": nuevo_id,
            "nombre": form.nombre.data,
            "categoria": form.categoria.data,
            "precio": float(form.precio.data),
            "stock": form.stock.data
        })
        return redirect(url_for('productos'))
    return render_template('formulario_producto.html', form=form)

# CLIENTES
@app.route('/clientes')
def clientes():
    return render_template('clientes.html', clientes=lista_clientes)

@app.route('/clientes/nuevo', methods=['GET', 'POST'])
def nuevo_cliente():
    form = ClienteForm()
    if form.validate_on_submit():
        nuevo_id = len(lista_clientes) + 1
        lista_clientes.append({
            "id": nuevo_id,
            "nombre": form.nombre.data,
            "email": form.email.data,
            "telefono": form.telefono.data
        })
        return redirect(url_for('clientes'))
    return render_template('formulario_cliente.html', form=form)

# PROVEEDORES
@app.route('/proveedores')
def proveedores():
    return render_template('proveedores.html', proveedores=lista_proveedores)

@app.route('/proveedores/nuevo', methods=['GET', 'POST'])
def nuevo_proveedor():
    form = ProveedorForm()
    if form.validate_on_submit():
        nuevo_id = len(lista_proveedores) + 1
        lista_proveedores.append({
            "id": nuevo_id,
            "empresa": form.empresa.data,
            "servicio": form.servicio.data,
            "contacto": form.contacto.data
        })
        return redirect(url_for('proveedores'))
    return render_template('formulario_proveedor.html', form=form)

# FACTURACIÓN
@app.route('/facturacion')
def facturacion():
    return render_template('facturacion.html', facturas=lista_facturas)

@app.route('/facturacion/nueva', methods=['GET', 'POST'])
def nueva_factura():
    form = FacturacionForm()
    if form.validate_on_submit():
        lista_facturas.append({
            "id": form.id.data,
            "cliente": form.cliente.data,
            "monto": float(form.monto.data),
            "estado": form.estado.data
        })
        return redirect(url_for('facturacion'))
    return render_template('formulario_facturacion.html', form=form)

if __name__ == '__main__':
    app.run(debug=True)