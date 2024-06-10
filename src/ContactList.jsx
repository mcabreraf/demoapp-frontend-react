import React from "react";

const ContactList = ({contacts, updateContact, updateCallback}) => {
    const onDelete = async (id) => {
        try {
          const options = {
            method: "DELETE"
          }
          const response = await fetch(`https://aws-flask-app.manuelprojectsinaws.com/delete_contact/${id}`, options)
          if (response.ok) {
            updateCallback()
            alert("Contact deleted successfully")
          } else {
            const data = await response.json()
            alert(data.message)
          }
        } catch (error) {
          console.error("An error occurred", error)
        }
    }


    return (
        <div>
            <h1>Contacts</h1>
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>
                      <button onClick={() => updateContact(contact)} className="edit-button">Edit</button>
                      <button onClick={() => onDelete(contact.id)} className="delete-button">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}

export default ContactList