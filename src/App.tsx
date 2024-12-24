import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/searchbar'
import YouTubeVideoList from "./components/getContent"
import Card from "./components/Card.tsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
       <Card
        title="hi"
        description="yes."
        // imageUrl="https://please_help_im_dying_ty"
      >
        <SearchBar/>
      </Card>
      <h1>Video List</h1>
      <YouTubeVideoList />

    </div>
)
}

export default App
