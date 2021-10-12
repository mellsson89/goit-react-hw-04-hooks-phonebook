import React, {useState} from "react";
import {v4 as uuidv4} from "uuid";
import style from './styles/contactForm.module.scss';

export default function ContactForm({onSubmit})  {

    const [name,setName]=useState('');
    const [number,setNumber]=useState('')



    const  handleChangeName = (e) => {
        setName(e.currentTarget.value);
    }

    const  handleChangeNumber = (e) => {
        setNumber(e.currentTarget.value)
    }

    const handleSubmit =(e) => {
        e.preventDefault();

        const contact = {
            id:uuidv4(),
            name,
            number
        }

     onSubmit(contact);
        resetForm()

    }

    const resetForm =() => {
        setName('');
        setNumber('');
    }



    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <label className={style.formLabel}>
                Name
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChangeName}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                    className={style.formInput}
                />
            </label>
            <label className={style.formLabel}>
                Number
                <input
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleChangeNumber}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                    required
                    className={style.formInput}
                />
            </label>
            <button type='submit'>Add contact</button>
        </form>

    )
}
