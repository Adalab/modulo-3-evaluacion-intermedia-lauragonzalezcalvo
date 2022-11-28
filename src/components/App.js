import '../styles/App.scss';
import contacts from '../data/contacts.json';
import { useState } from 'react';

function App() {
  // --------------------------------------VARIABLES ESTADO-----------------------------------------------

// Con esta variable nos traemos adalabers del fichero
 const [data, setData] = useState(contacts);


// Variable para guardar en un objeto los datos de la nueva adalaber
const [newContact, setNewContact] = useState({
  name: '',
  counselor: '',
  speciality: '',
});


 // USEEFFECT

 // ---------------------------------------FUNCIONES HANDLER------------------------------------------------

 // Recogemos los valores de los inputs 
 const handleNewAdalaber = (ev) => {
  ev.preventDefault();
  const inputValue = ev.target.value;
  // Importante que coincida el id
  setNewContact({...newContact, [ev.target.id] : inputValue })
  
 }





 // -------------------------FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR----------------------


//Para pintar a traves de un map las adalabers, como está guardado en results : data.results
const htmlAdalaber = data.results.map ((eachAdalaber) => {
return (
        <tr key= {eachAdalaber.id}>
          <td>{eachAdalaber.name}</td>
          <td>{eachAdalaber.counselor}</td>
          <td>{eachAdalaber.speciality}</td>
        </tr>
);
});


  return (
    <div className="App">
      <header>
        <h1>Adalabers</h1>
      </header>
      <table className="table">
      <thead >
        <tr>
          <th>Nombre</th>
          <th>Tutora</th>
          <th>Especialidad</th>
        </tr>
      </thead>
      
      <tbody className="table">
      {htmlAdalaber}
      </tbody>
      </table>
      <form className="form">
          <h2 >Añade una nueva Adalaber</h2>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            onInput={handleNewAdalaber}
            value={newContact.name}
          />
          <label htmlFor="counselor">Tutora</label>
          <input
            type="text"
            name="counselor"
            id="counselor"
            onInput={handleNewAdalaber}
            value={newContact.counselor}
            />
          <label htmlFor="speciality">Especialidad</label>
          <input
            type="text"
            name="speciality"
            id="speciality"
            onInput={handleNewAdalaber}
            value={newContact.speciality}
          />
          <button>Añadir una nueva Adalaber</button>
        </form>
    </div>
  );
}

export default App;
