import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactForm = ({ existingContact = {}, updateCallback }) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")
    const navigate = useNavigate()

    const updating = Object.entries(existingContact).length != 0

    const onSubmit = async (e) => {
      e.preventDefault()
      
      const token = localStorage.getItem("token")
      if (!token) return navigate("/login")

      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email
      }

      const url = "https://aws-flask-app.manuelprojectsinaws.com/" + (updating ? "update_contact/" + existingContact.id : "create_contact")
      const options = {
        method: updating ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
      }
      try {
        const response = await axios(url, options);

        if (response.status === 200 || response.status === 201) {
          updateCallback()
          alert("Contact " + (updating ? "updated" : "created") + " successfully")
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert("An error occurred", error)
      }
    }

    return (
      <form onSubmit={onSubmit}>
        {updating && <h2>Update Contact</h2> || <h2>Create Contact</h2>}
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <button type="submit" className="add-button">
          {updating ? "Update Contact" : "Create Contact"}
        </button>
      </form>
    )
}

export default ContactForm