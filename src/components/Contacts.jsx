import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import ContactForm from './ContactForm'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Contacts = () => {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    fetchContacts(navigate)
  }, [navigate])

  const fetchContacts = async (navigate) => {
    const token = localStorage.getItem("token")
    if (!token) return navigate("/login")

    const url = 'https://aws-flask-app.manuelprojectsinaws.com/contacts'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const response = await axios(url, options);
      if (response.status === 200) {
        const data = response.data
        setContacts(data.contacts)
      } else {
        alert('An error occurred while fetching contacts. Please try again.')
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.")
        localStorage.removeItem("token")
        return navigate("/login")
      } else {
        alert("An error occurred while fetching contacts. Please try again later.")
      }
    }

  }

  const closeModal = ()=> {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
    
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      <button className="add-button" onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && 
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
          </div>
        </div>
      }
      <div>
        <button style={{ marginTop: "50px" }} className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </>
  )
}

export default Contacts
