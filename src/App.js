import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import TestComp from './components/TestComp';

function App() {
  const [breweries,setBreweries] = useState([]);
  const [form, setForm] = useState("");

  const fetchBreweries = (event) => {
    event.preventDefault();

    fetch("https://api.openbrewerydb.org/breweries?per_page=50&by_city="+form)
      .then(res => {return res.json()})
      .then(res => {
        //here we can use our data!
        console.log(res);
        setBreweries(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="container">
      <TestComp/>
      <form onSubmit={fetchBreweries}>
        <input type="text" className='form-control w-25 d-block mx-auto my-2' onChange={(event)=>setForm(event.target.value)}/>
        <button type="submit" className='btn btn-primary btn-lg d-block mx-auto my-1'>
          Fetch breweries
        </button>
      </form>

      <div className="row">
        {
          breweries.map((brewery,i)=>{
            return (
              <div className="col-md-4" key={brewery.id}>
                <img src={`https://source.unsplash.com/400x300/?brewery`} alt="Brewery" className="w-50"/>
                <h3>{brewery.name}</h3>
                <p>{brewery.city}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
