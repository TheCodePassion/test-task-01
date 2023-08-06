import React from 'react'

const Header = ({ title }) => {
  return (
    <div className="header">
      <h1 className="title">{title || 'Users List'}</h1>
    </div>
  )
}

export default Header
