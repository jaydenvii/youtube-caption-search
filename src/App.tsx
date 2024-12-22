import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/searchbar'

function App() {
  const [count, setCount] = useState(0)

  return (<>
    <div className='App'>
      {/* <SearchBar /> */}

      <input
   type="search"
   placeholder="Search here"
 />

<table>
  <tr>
    <th>Country</th>
    <th>Continent</th>
  </tr>

{/* {countries.map((country, *index*) => {

<div>
  <tr>
    <td>{country.name}</td>
    <td>{country.continent}</td>
  </tr>
</div>

})} */}

</table>

</div>


</> )

}

export default App
