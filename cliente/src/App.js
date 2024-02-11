import './App.css';
import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);
  
  const [empleados, setEmpleados] = useState([]); 

  const add = () => {
    axios.post("http://localhost:3001/create",{
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    });
  };

  const update = () => {
    axios.put("http://localhost:3001/update",{
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
    });
  };

  const deleteEmple = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      getEmpleados();
      limpiarCampos();
    });
};

  const limpiarCampos = () => {
    setAnios("");
    setNombre("");
    setCargo("");
    setPais("");
    setEdad("");
    setId("");
    setEditar(false);
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  }

  const getEmpleados = () => {
    axios.get("http://localhost:3001/Empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          Gestion de empleados
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input 
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre} 
              placeholder="Ingrese el nombre del empleado" 
              aria-label="Nombre del empleado" 
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon2">Edad:</span>
            <input 
              type="number" value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese la edad del empleado" 
              aria-label="Edad del empleado" 
              aria-describedby="basic-addon2"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon3">País:</span>
            <input 
              type="text" value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese el país del empleado" 
              aria-label="País del empleado" 
              aria-describedby="basic-addon3"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">Cargo:</span>
            <input 
              type="text" value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese el cargo del empleado" 
              aria-label="Cargo del empleado" 
              aria-describedby="basic-addon4"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon5">Años:</span>
            <input 
              type="number" value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese los años de experiencia del empleado" 
              aria-label="Años de experiencia del empleado" 
              aria-describedby="basic-addon5"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
      <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre</th>
      <th scope="col">Edad</th>
      <th scope="col">País</th>
      <th scope="col">Cargo</th>
      <th scope="col">Experiencia</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {empleados.map((val, key) => {
            return <tr key={val.id}>
            <th>{val.id}</th>
            <td>{val.nombre}</td>
            <td>{val.edad}</td>
            <td>{val.pais}</td>
            <td>{val.cargo}</td>
            <td>{val.anios}</td>
            <td>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button"
              onClick={()=>{
                editarEmpleado(val);
              }}
              className="btn btn-info">Editar</button>
              <button type="button" onClick={()=>{
                deleteEmple(val.id);
              }} className="btn btn-danger">Eliminar</button>
            </div>
            </td>
          </tr>
          })
          }

  </tbody>
    </table>
    </div>
  );
}

export default App;
