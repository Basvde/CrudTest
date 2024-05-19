from flask import Flask, jsonify, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS-configuratie

# Configureer de SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Defineer het Todo model
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)

# Endpoint voor het ophalen van todos
@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    todos_list = [{'id': todo.id, 'title': todo.title} for todo in todos]
    return jsonify(todos_list)

# Endpoint voor het maken van een nieuwe todo
@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.json
    new_todo = Todo(title=data['title'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'message': 'Todo created successfully'})

# Endpoint voor het bijwerken van een todo
@app.route('/todos/<int:id>', methods=['PUT'])
def update_todo(id):
    data = request.json
    todo = Todo.query.get(id)
    if todo:
        todo.title = data['title']
        db.session.commit()
        return jsonify({'message': 'Todo updated successfully'})
    else:
        return jsonify({'error': 'Todo not found'}), 404

# Endpoint voor het verwijderen van een todo
@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo:
        db.session.delete(todo)
        db.session.commit()
        return jsonify({'message': 'Todo deleted successfully'})
    else:
        return jsonify({'error': 'Todo not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
