import '../styles/App.scss';
import contacts from '../data/contacts.json';
import { useState } from 'react';

function App() {
  // --------------------------------------VARIABLES ESTADO-----------------------------------------------

// Con esta variable nos traemos adalabers del fichero

 const [data, setData] = useState(contacts);
  console.log(data);
 // USEEFFECT
 // FUNCIONES HANDLER
 // FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR


//Para pintar a traves de un map las adalabers

const htmlAdalaber = data.results.map ((eachAdalaber) => {
return (
        <tr>
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
      {/* <tbody className="table">
        <tr>
          <td>MariCarmen</td>
          <td>Yanelis</td>
          <td>Python</td>
        </tr>
        
        <tr>
          <td>Amparo</td>
          <td>Dayana</td>
          <td>IA</td>
        </tr>
        
        <tr>
          <td>Escandia</td>
          <td>Iván</td>
          <td>3D graphics</td>
        </tr>
      </tbody> */}
      </table>
      <form className="form">
          <h2 >Añade una nueva Adalaber</h2>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            // onInput={handleNewContact}
            // value={newContact.name}
          />
          <label htmlFor="counselor">Tutora</label>
          <input
            type="text"
            name="counselor"
            id="counselor"
            // onInput={handleNewContact}
            // value={newContact.lastname}
            />
          <label htmlFor="specialty">Especialidad</label>
          <input
            type="text"
            name="specialty"
            id="specialty"
            // onInput={handleNewContact}
            // value={newContact.phone}
          />
          <button>Añadir una nueva Adalaber</button>
        </form>
    </div>
  );
}

export default App;
