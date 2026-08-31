from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, SelectField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class FacturacionForm(FlaskForm):
    id = StringField('Número de Factura (ej. FAC-003)', validators=[
        DataRequired(message="El número de factura es obligatorio.")
    ])
    cliente = StringField('Cliente', validators=[
        DataRequired(message="El nombre del cliente es obligatorio.")
    ])
    monto = DecimalField('Monto ($)', validators=[
        DataRequired(message="El monto es obligatorio."),
        NumberRange(min=0.01, message="El monto debe ser mayor a 0.")
    ])
    estado = SelectField('Estado', choices=[
        ('Pagado', 'Pagado'),
        ('Pendiente', 'Pendiente'),
        ('Anulado', 'Anulado')
    ], validators=[DataRequired()])
    submit = SubmitField('Generar Factura')