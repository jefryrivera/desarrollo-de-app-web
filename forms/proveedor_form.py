from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ProveedorForm(FlaskForm):
    empresa = StringField('Nombre de la Empresa', validators=[
        DataRequired(message="El nombre de la empresa es obligatorio."),
        Length(min=2, max=100)
    ])
    servicio = StringField('Servicio Proporcionado', validators=[
        DataRequired(message="El tipo de servicio es obligatorio.")
    ])
    contacto = StringField('Correo de Contacto', validators=[
        DataRequired(message="El correo es obligatorio."),
        Email(message="Ingrese un correo válido.")
    ])
    submit = SubmitField('Guardar Proveedor')