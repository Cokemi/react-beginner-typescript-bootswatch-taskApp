import React, { useRef } from "react";

type FormatElement = React.FormEvent<HTMLFormElement>; // Tipo de elemento Evento Form - HTML Form

interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = React.useState<string>(""); // Con <string> obligamos a que los setNewTask('Hi') sean unicamente string
  const [tasks, setTasks] = React.useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormatElement) => {
    // La funcion recibe el parametro de entrada e que es de tipo FormatElement(typescript)
    e.preventDefault(); // Prevenimos que cargue la pagina de nuevo con el submit
    // console.log(newTask);
    addTask(newTask);
    console.log(tasks);
    setNewTask("");
  };

  const addTask = (name: string) => {
    //Para asignarlo al array de newTasks debemos hacer lo sgte:
    // 1º Vamos a copiar el contenido actual de las tareas                                                  [...tasks]
    // 2º Y Luego vamos a añadir uno nuevo [...tasks, {}]. Un objeto nuevo con una propiedad llamada name   [...tasks, {name}]
    // 3º Pasamos un segundo parámetro done que inicializaremos a false                                     [...tasks, {name, done: false}]
    // 4º Con todo lo anterior lo que estoy añadiendo es un nuevo objeto a la lista                         const newTasks = [...tasks, {name, done: false}]
    // 5º Como todo esto es inmutable, tendremos que volver a asignarlo
    const newTasks = [...tasks, { name, done: false }];

    // 6º Lo que vamos hacer ahora es añadir nuestra newTasks al array tasks pero obtenemos                 setTasks(newTasks);
    // 7º Pero obtenemos un error y basicamente no estamos especificando lo q estamos guardando
    // 8º Lo que tenemos que hacer es en el const de tasks especificar que queremos un array de tareas y
    // esto lo conseguiremos creando un interface (tipo de datos para las tareas)                           Ver interface ITask
    // 9º Ahora añadiremos a nuestro const task el array de ITask                                           const [tasks, setTasks] = React.useState<ITask[]>([]);
    // 10º Y con nuestra instruccion sgte no obtendremos ningun error
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  const toggleDoneTask = (i: number) => {
    // Necesito una copia del array secundario del array de tareas
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  const removeTask = (i: number) => {
    // Esta funcion remueve una tarea
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1); // Elimino del indice que tengo i, una sola tarea 1
    setTasks(newTasks);
    taskInput.current?.focus();
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <div style={{ color: "orange", fontSize: "25px" }}>
                Enter a task to do:
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Add</button>
              </form>
            </div>
          </div>
          {
            // 1º El siguiente codigo es para mostrar las tareas que haya en el array y las visualicemos en el explorador.
            // Para ello usaremos un map para nuestro array de tareas
            // Recordar que map tiene un tipo number que es la key que se usa para mapeo (la llamaremos i)
            tasks.map((t: ITask, i: number) => (
              <div className="card card-body mt-2" key={i}>
                <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h2>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done ? "✓" : "✗"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default App;
