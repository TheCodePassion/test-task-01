import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import socket from '../socket/socket'

function ProfileScreen() {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [newName, setNewName] = useState('')
  const [notification, setNotification] = useState(null)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit('getUser', { id: userId })

    socket.on('userDetails', (data) => {
      setUser(data)
    })

    return () => {
      socket.off('userDetails')
    }
  }, [userId])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleUpdateName = () => {
    socket.emit('updateUserName', { id: userId, name: newName })
  }

  const handleDeleteUser = () => {
    socket.emit('deleteUser', { id: userId })
  }

  socket.on('userNameUpdated', (data) => {
    if (data.message === 'User name updated successfully') {
      setNotification('User name updated successfully')
      setNewName('')
    } else {
      setNotification('Failed to update user name')
    }
  })

  socket.on('userDeleted', (data) => {
    if (data.message === 'User deleted successfully') {
      setNotification('User deleted successfully')
      setShowDeleteConfirmation(false)
      navigate('/')
    } else {
      setNotification('Failed to delete user')
      setShowDeleteConfirmation(false)
    }
  })

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-container">
      <Header title={user.name} />

      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <p className="profile-info-item">Name: {user.name}</p>
        <p className="profile-info-item">
          Access level: {user.accesslevel}
        </p>{' '}
        <p className="profile-info-item">Date of Creation: {user.datecreate}</p>
        <img className="profile-icon" src={user.icon} alt="Profile icon" />
      </div>

      <div className="update-name-section">
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
          placeholder="Enter new name"
          className="name-input"
        />
        <button
          className="button update-name-button"
          onClick={handleUpdateName}
        >
          Change name
        </button>
      </div>
      {notification && <p className="notification">{notification}</p>}

      <button
        className="button delete-button"
        onClick={() => setShowDeleteConfirmation(true)}
      >
        Delete User
      </button>
      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete the user?</p>
          <button
            className="button confirm-delete-button"
            onClick={handleDeleteUser}
          >
            Confirm{' '}
          </button>
          <button
            className="button cancel-delete-button"
            onClick={() => setShowDeleteConfirmation(false)}
          >
            Cancel
          </button>
        </div>
      )}

      <Link to="/" className="button home-button">
        Return to Home
      </Link>
    </div>
  )
}

export default ProfileScreen
