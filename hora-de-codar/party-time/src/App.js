import './App.css';
import { useEffect, useState } from 'react'

function App() {
  const [services, setServices] = useState([])
  const [parties, setParties] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/services')
    .then(res => res.json())
    .then(data => setServices(data))

    fetch('http://localhost:3000/api/parties')
    .then(res => res.json())
    .then(data => setParties(data))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {services && services.map(service => (
              <div>
                <p>{service.name}</p>
                <span>{service.description}</span>
              </div>
            ))}
        </div>
        <hr/>
        <div>
          {parties && parties.map(party => (
            <div>
              <h1>{party.title}</h1>
              <p>{party.author}</p>
              <ul>
                {party.services && party.services.map(serviceOfParty => (
                  <li>{serviceOfParty.name}/{serviceOfParty.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
