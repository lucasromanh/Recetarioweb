from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from datetime import date, datetime
from werkzeug.utils import secure_filename
import random


app = Flask(__name__)

CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:micram123@localhost/recetas'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)


# Estructura de la tabla recetas a partir de la clase
class Receta(db.Model):
    __tablename__ = 'recetas'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, default=0)
    nombre = db.Column(db.String(255), nullable=False)
    ingredientes = db.Column(db.Text, nullable=False)
    preparacion = db.Column(db.Text, nullable=False)
    imagen = db.Column(db.String(255))  
    tiempo_preparacion = db.Column(db.Integer)
    tiempo_coccion = db.Column(db.Integer)
    fecha_creacion = db.Column(db.Date, default=date.today)
    etiquetas = db.Column(db.Text)
    es_favorita = db.Column(db.Boolean, default=False)
    disponible = db.Column(db.Boolean, default=False)  

    def __init__(self, nombre, ingredientes, preparacion, imagen, tiempo_preparacion, tiempo_coccion,
                 etiquetas, es_favorita=False, disponible=False):
        self.nombre = nombre
        self.ingredientes = ingredientes
        self.preparacion = preparacion
        self.imagen = imagen
        self.tiempo_preparacion = tiempo_preparacion
        self.tiempo_coccion = tiempo_coccion
        self.etiquetas = etiquetas
        self.es_favorita = es_favorita
        self.disponible = disponible
        self.fecha_creacion = datetime.today().date()

    def __str__(self):
        return f"{self.nombre} ({self.fecha_creacion.strftime('%Y-%m-%d')})\nIngredientes: {self.ingredientes}\nPreparación: {self.preparacion}\n"



class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    contrasena = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, email, contrasena):
        self.nombre = nombre
        self.email = email
        self.contrasena = contrasena


# Crear una clase RecetaSchema, donde se definen los campos de la tabla
class RecetaSchema(ma.Schema):
    class Meta:
        fields = ('id', 'nombre', 'ingredientes', 'preparacion', 'imagen', 'tiempo_preparacion', 'tiempo_coccion',
                  'fecha_creacion', 'etiquetas', 'es_favorita', 'disponible')


receta_schema = RecetaSchema()
recetas_schema = RecetaSchema(many=True)


@app.route('/recetas', methods=['GET'])
def get_recetas():
    recetas = Receta.query.all()
    return recetas_schema.jsonify(recetas)


@app.route('/recetas', methods=['POST'])
def add_receta():
    nombre = request.json['nombre']
    ingredientes = request.json['ingredientes']
    preparacion = request.json['preparacion']
    imagen = request.json['imagen']  
    tiempo_preparacion = request.json.get('tiempo_preparacion')
    tiempo_coccion = request.json.get('tiempo_coccion')
    etiquetas = request.json.get('etiquetas', '')
    es_favorita = request.json.get('es_favorita', False)
    disponible = request.json.get('disponible', False)

    nueva_receta = Receta(nombre=nombre, ingredientes=ingredientes, preparacion=preparacion, imagen=imagen,
                         tiempo_preparacion=tiempo_preparacion, tiempo_coccion=tiempo_coccion, etiquetas=etiquetas,
                         es_favorita=es_favorita, disponible=disponible)

    db.session.add(nueva_receta)

    try:
        db.session.commit()
        return jsonify({'id': nueva_receta.id, 'message': 'Receta agregada correctamente'})
    except Exception as e:
        db.session.rollback()  
        return jsonify({'error': str(e)}), 500



@app.route('/recetas/<int:id>', methods=['GET'])
def get_receta(id):
    receta = Receta.query.get(id)
    if receta:
        return receta_schema.jsonify(receta)
    else:
        return jsonify({'message': 'Receta no encontrada'})


@app.route('/recetas/<int:id>', methods=['PUT'])
def update_receta(id):
    receta = Receta.query.get(id)
    if receta:
        receta.nombre = request.json['nombre']
        receta.ingredientes = request.json['ingredientes']
        receta.preparacion = request.json['preparacion']
        receta.tiempo_preparacion = request.json['tiempo_preparacion']
        receta.tiempo_coccion = request.json['tiempo_coccion']
        receta.etiquetas = request.json['etiquetas']

        if 'imagen' in request.json:
            receta.imagen = request.json['imagen']

        db.session.commit()

        return jsonify({'message': 'Receta actualizada correctamente'})
    else:
        return jsonify({'message': 'Receta no encontrada'})


@app.route('/recetas/<int:id>', methods=['DELETE'])
def delete_receta(id):
    receta = Receta.query.get(id)
    if receta:
        db.session.delete(receta)
        db.session.commit()
        return jsonify({'message': 'Receta eliminada correctamente'})
    else:
        return jsonify({'message': 'Receta no encontrada'})
    
@app.route('/recetas/random', methods=['GET'])
def get_random_recipe():
    recetas = Receta.query.all()
    random_recipe = random.choice(recetas)
    result = receta_schema.dump(random_recipe)
    return jsonify(result)

@app.route('/recetas/top', methods=['GET'])
def get_top_recetas():
    recetas = Receta.query.order_by(Receta.id).limit(3).all()
    return recetas_schema.jsonify(recetas)

@app.route('/buscar_receta', methods=['GET'])
def buscar_receta():
    query = request.args.get('query')

    recetas_encontradas = Receta.query.filter(Receta.nombre.ilike(f'%{query}%')).all()

    recetas_encontradas_schema = recetas_schema.dump(recetas_encontradas)
    return jsonify(recetas_encontradas_schema)



if __name__ == '__main__':
    app.run(debug=True)
