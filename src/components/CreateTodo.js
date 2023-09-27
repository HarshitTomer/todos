import React, { useState, useEffect, useRef } from 'react';


function CreateTodo() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the user ID from local storage or another source
  

  const fetchTodos = async () => {
    try {
      if (!userId) return;

      const response = await fetch(`http://localhost:5500/todos?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTodos(data);
      } else {
        console.error('Failed to fetch todos');
      }
    } catch (error) {
      console.error('Failed to fetch todos', error);
    }
  };
  const fetchTodosRef = useRef(fetchTodos);
  useEffect(() => {
    // Use the function from the ref
    fetchTodosRef.current();
  }, [userId]);
  

  const handleCreateTodo = async () => {
    try {
      if (!userId) return;

      const response = await fetch('http://localhost:5500/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, todo: newTodo, completed: false }), // Set initial completed status to false
      });

      if (response.ok) {
        setNewTodo('');
        fetchTodos(); // Fetch updated todos after creating a new one
      } else {
        console.error('Todo creation failed');
      }
    } catch (error) {
      console.error('Todo creation failed', error);
    }
  };

  const handleEditTodo = async (todoId, updatedTodo) => {
    try {
      if (!userId) return;
      console.log(updatedTodo)
      const response = await fetch(`http://localhost:5500/edittodos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ userId, todoId, updatedTodo: updatedTodo }),


      });

      if (response.ok) {
        fetchTodos(); // Fetch updated todos after editing
      } else {
        console.error('Todo edit failed');
      }
    } catch (error) {
      console.error('Todo edit failed', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      if (!userId) return;

      const response = await fetch(`http://localhost:5500/todos/${todoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        fetchTodos(); // Fetch updated todos after deleting
      } else {
        console.error('Todo deletion failed');
      }
    } catch (error) {
      console.error('Todo deletion failed', error);
    }
  };

  const handleMarkComplete = async (todoId, completed) => {
    try {
      if (!userId) return;

      const response = await fetch(`http://localhost:5500/todos`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId,todoId, completed: !completed }), // Toggle the completed status
      });

      if (response.ok) {
        fetchTodos(); // Fetch updated todos after marking as complete
      } else {
        console.error('Mark as complete failed');
      }
    } catch (error) {
      console.error('Mark as complete failed', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Todo List App</h2>
            </div>
            <div className="card-body">
            <form onSubmit={handleCreateTodo}>
                <div className="mb-3 input-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="New Todo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                    Add
                    </button>
                </div>
                </form>

              <div className="mt-4">
                <h3>Todo List</h3>
                <ul className="list-group">
                  {todos.map((todo) => (
                    <li key={todo._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          {todo.completed ? (
                            <del>{todo.todo}</del>
                          ) : (
                            todo.todo
                          )}
                        </div>
                        <div>
                          {!todo.completed && (
                            <button
                              type="button"
                              className="btn btn-success btn-sm me-2"
                              onClick={() =>
                                handleMarkComplete(todo._id, todo.completed)
                              }
                            >
                              Mark as Complete
                            </button>
                          )}
                          <button
                            type="button"
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {
                              const updatedTodo = prompt(
                                'Edit todo:',
                                todo.todo
                              );
                              if (updatedTodo !== null) {
                                handleEditTodo(todo._id, updatedTodo);
                              }
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to delete this todo?'
                                )
                              ) {
                                handleDeleteTodo(todo._id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTodo;
