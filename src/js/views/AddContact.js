import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import styles from "../../styles/addcontact.module.css";
import { Context } from "../store/appContext";
//include images into your bundle


//create your first component
const AddContact = () => {
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({ name: '', address: '', phone: '', email: '' })
    const [editMode, setEditMode] = useState(false);
    const [editDone, seteditDone] = useState(false)
    const toContact = useNavigate();

    const updateForm = (e) => {
        seteditDone(true);
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.submitContact(contact)
        setContact({ name: '', address: '', phone: '', email: '' })
        toContact('/')
    }

    const handleEdit = (e) => {
        e.preventDefault();
        actions.editContact(contact)
        toContact('/')
    }

    const handleCancel = () => {
        actions.resetEdit();
        toContact('/')
    }
    useEffect(() => {
        if (Object.keys(store.toEdit).length !== 0) {
            setEditMode(true);
            setContact(store.toEdit);
        }
    }, [])
    return (
        <div>
            <div className={`${styles.linkbar} me-5 mt-2`}>
                <Link to="/" className={styles.nav}>Contact List</Link>
            </div>
            <form className="mx-5 my-3 align-items-center border px-5 py-3">
                <h1 className={styles.title}>New Contact Form</h1>
                <div className={`form-group ${styles.formgroup}`}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input type="text" className={`form-control ${styles.input}`} id="name" name='name' placeholder="Enter name" value={contact.name} onChange={(e) => updateForm(e)} />
                </div>
                <div className={`form-group ${styles.formgroup}`}>
                    <label htmlFor="address" className={styles.label}>Address</label>
                    <input type="text" className={`form-control ${styles.input}`} id="address" name='address' placeholder="Enter address" value={contact.address} onChange={(e) => updateForm(e)} />
                </div>

                <div className={`form-group ${styles.formgroup}`}>
                    <label htmlFor="phone" className={styles.label}>Phone</label>
                    <input type="text" className={`form-control ${styles.input}`} id="phone" name='phone' placeholder="Enter phone" value={contact.phone} onChange={(e) => updateForm(e)} />
                </div>
                <div className={`form-group ${styles.formgroup}`}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input type="email" className={`form-control ${styles.input}`} id="email" name='email' placeholder="Enter email" value={contact.email} onChange={(e) => updateForm(e)} />
                </div>
                <div className={`py-4 ${styles.buttons}`}>
                    <button className={`btn btn-danger ${styles.addbutton} mx-2`} onClick={handleCancel}>Cancel</button>
                    {editMode ? <button type="submit" className={`btn btn-primary ${styles.addbutton} mx-2`} disabled={!editDone} onClick={(e) => handleEdit(e)} >Edit</button> : <button type="submit" className={`btn btn-success ${styles.addbutton} mx-2`} disabled={!editDone} onClick={(e) => handleSubmit(e)} >Submit</button>}
                </div>
            </form >
        </div >
    );
};

export default AddContact;
