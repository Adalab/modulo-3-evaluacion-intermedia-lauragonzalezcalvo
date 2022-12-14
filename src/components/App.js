import "../styles/App.scss";
// import contacts from '../data/contacts.json';
import { useEffect, useState } from "react";
import fetchdataApi from "../services/api";

function App() {
  // ------------------------------------------VARIABLES ESTADO--------------------------------------------------------

  // Con esta variable nos traemos adalabers del fichero. De momento solo me interesa lo guardado en results
  const [data, setData] = useState([]);

  // Variable para guardar en un objeto los datos de la nueva adalaber
  const [newContact, setNewContact] = useState({
    // como me da un error,"two children with the same key ", genero un UUID random
    id: crypto.randomUUID(),
    name: "",
    counselor: "",
    speciality: "",
    social_networks: [],
  });
  // Variable estado para guardar el value del input de la usuaria
  const [searchName, setSearchName] = useState("");
  // Variable estado para guardar el value del select de la usuaria
  const [searchCounselor, setSearchCounselor] = useState("");
  const [messageErrorInputs, setMessageErrorInputs] = useState("");

  //------------------------------------- USEEFFECT------------------------------

  useEffect(() => {
    fetchdataApi().then((dataresults) => {
      setData(dataresults);
    });
  }, []);

  // ---------------------------------------FUNCIONES HANDLER------------------------------------------------

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };
  // Recogemos los valores de los inputs
  const handleNewAdalaber = (ev) => {
    const inputValue = ev.target.value;
    // Importante que coincida el id
    setNewContact({ ...newContact, [ev.target.id]: inputValue });
  };

  // Hacemos otra función, para recoger lo que esta guardado en nuestra variable estado para que se añada a la tabla nuestra nueva adalaber

  const addNewContact = () => {
    // llamamos a nuestra variable estado para introducirle una nueva adalaber
    if (
      newContact.counselor === "" ||
      newContact.name === "" ||
      newContact.speciality === ""
    ) {
      setMessageErrorInputs("Debe rellenar todos los campos");
    } else {
      setData([...data, newContact]);
      // para dejarlo vacío
      setNewContact({
        id: crypto.randomUUID(),
        name: "",
        counselor: "",
        speciality: "",
        social_networks: [],
      });
      setMessageErrorInputs("");
    }
  };

  const handleSearch = (ev) => {
    ev.preventDefault();
    setSearchName(ev.target.value);
  };
  const handleSelectCounselor = (ev) => {
    ev.preventDefault();
    setSearchCounselor(ev.target.value);
  };

  // -------------------------FUNCIONES Y VARIABLES QUE AYUDEN A RENDERIZAR-----------------------

  //Para pintar a traves de un map las adalabers
  const htmlAdalaber = data
    .filter((searchAdalaber) =>
      searchAdalaber.name
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase())
    )

    .filter((search) => search.counselor.includes(searchCounselor))

    .map((eachAdalaber) => {
      return (
        <tr key={eachAdalaber.id}>
          <td>{eachAdalaber.name}</td>
          <td>{eachAdalaber.counselor}</td>
          <td>{eachAdalaber.speciality}</td>
          <td>
            {eachAdalaber.social_networks.map((socialNetwork, index) => {
              return (
                <a
                  key={index}
                  href={socialNetwork.url}
                  target="_blank"
                  rel="noreferrer"
                  className="url"
                >
                  {socialNetwork.name}
                </a>
              );
            })}
          </td>
        </tr>
      );
    });

  return (
    <div className="App">
      <header className="header">
        <h1>Adalabers</h1>
      </header>
      <main className="main">
        <form className="main-form">
          <div className="main-form__Search">
            <label className="main-form__Search-label" htmlFor="">
              Nombre:
            </label>
            <input
              placeholder="Ej: Maricarmen"
              type="text"
              onChange={handleSearch}
              value={searchName}
              className="main-form__Search-inputs"
            />
          </div>
          <div className="main-form__Search">
            <label htmlFor="">Escoge una tutora:</label>
            <select
              onChange={handleSelectCounselor}
              value={searchCounselor}
              className="main-form__Search-select"
            >
              <option value="Escoge un opción">Escoge un opción</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
              <option value="Yanelis">Yanelis</option>
              <option value="Miguel">Miguel</option>
            </select>
          </div>
        </form>
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
              <th>Redes</th>
            </tr>
          </thead>

          <tbody className="table-list">{htmlAdalaber}</tbody>
        </table>
        <form className="main-formAdalaber" onSubmit={handleSubmit}>
          <h2 className="main-formAdalaber-title">Añade una nueva Adalaber</h2>
          <section>
            <div className="main-formAdalaber__div">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                id="name"
                onInput={handleNewAdalaber}
                value={newContact.name}
                className="main-form__Search-inputs"
              />
            </div>
            <div className="main-formAdalaber__div">
              <label htmlFor="counselor">Tutora</label>
              <input
                type="text"
                name="counselor"
                id="counselor"
                onInput={handleNewAdalaber}
                value={newContact.counselor}
                className="main-form__Search-inputs"
              />
            </div>
            <div className="main-formAdalaber__div">
              <label htmlFor="speciality">Especialidad</label>
              <input
                type="text"
                name="speciality"
                id="speciality"
                onInput={handleNewAdalaber}
                value={newContact.speciality}
                className="main-form__Search-inputs"
              />
            </div>
          </section>
          <button onClick={addNewContact} className="main-form__Search-btn">
            Añadir
          </button>
          {messageErrorInputs}
        </form>
      </main>
    </div>
  );
}

export default App;
