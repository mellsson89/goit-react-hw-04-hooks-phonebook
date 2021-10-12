import React, {useEffect, useState} from "react";
import Filter from "./components/Filter";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Modal from "./components/Modal";

export default function App(){

    const [contacts,setContacts]=useState([{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},]);
    const [showModal,setShowModal]=useState(false);
    const [filter,setFilter]=useState('');

    useEffect(()=> {
        const getContacts=localStorage.getItem('contacts');
        const parsedContacts=JSON.parse(getContacts);
        if(parsedContacts) {
            setContacts(parsedContacts)
            }
    },[])

    useEffect(() => {
        localStorage.setItem('contacts',JSON.stringify(contacts))

    },[contacts])


    const handleFilter =(e) => {
        setFilter(e.currentTarget.value);

    }

   const addContact = (contact) => {
        const cloneName=contacts.find(({name}) => name === contact.name);
        if(cloneName) {
            const {name} =cloneName;
            alert(`${name} is already in contacts`);
            return;
        }
        setContacts([contact,...contacts])
        toggleModal();
    }

   const deleteContact =(id) => {

        setContacts(contacts.filter(contact => contact.id !== id))


    }

   const toggleModal =() => {
        setShowModal(!showModal);

    }


        const normalizeFilter=filter.toLowerCase();
        const visibleFilter = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));

        return (
            <div>
                <button type='button' onClick={toggleModal}>Add contact</button>
                <h1>Phonebook</h1>
                <h2>Contacts</h2>
                <Filter value={filter} onChange={handleFilter}/>
                <ContactList contacts={visibleFilter} onDelete={deleteContact}/>
                {showModal && <Modal onClose={toggleModal}><ContactForm onSubmit ={addContact}/></Modal>}
            </div>
        )
    }


