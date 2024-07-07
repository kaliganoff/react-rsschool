import React from 'react'
import './Header.css'

class Header extends React.Component {
render() {
  return (
    <header className='header'>
        <input type="search" placeholder='Search' />
        <button>Search</button>
    </header>
  )
}
}

export default Header