import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../img/avatar.png";
import styles from "../../styles/contactcard.module.css"
import { Context } from "../store/appContext";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContactCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    const toEdit = useNavigate();
    const handleEdit = (edit) => {
        console.log(edit)
        actions.editRequest(edit);
        toEdit('/addcontact')
    }

    return (
        <div className={`container d-flex ${styles.card} align-items-center justify-content-start border w-75`}>
            <div className="row d-flex">
                <div className={` col-lg-4 col-md-12 col-sm-12 d-flex p-3 mx-auto justify-content-center align-items-center ${styles.profile}`}>
                    <img src={Profile} className={styles.profileImg} />
                </div>
                <div className={` col-lg-6 col-md-8 col-sm-12 ${styles.text} py-3 px-3 mx-3 align-items-center`}>
                    <h1 className={styles.title}>{data.name}</h1>
                    <p className={styles.info}><FontAwesomeIcon icon={faLocationDot} className="me-3 mt-3" />{data.address}</p>
                    <p className={styles.info}><FontAwesomeIcon icon={faPhone} className="me-3" />{data.phone}</p>
                    <p className={styles.info}><FontAwesomeIcon icon={faEnvelope} className="me-3" />{data.email}</p>
                </div>

                <div className={`col-lg-2 col-md-4 col-sm-12 ${styles.actions} d-flex justify-content-end align-items-center me-5 mb-2`}>
                    <button className={`mx-3 ${styles.buttons}`} onClick={() => handleEdit(data)}><FontAwesomeIcon icon={faPenToSquare} className="mx-3" /></button>
                    <button className={`mx-3 ${styles.buttons}`} onClick={() => actions.deleteContact(data.id)}><FontAwesomeIcon icon={faTrash} /></button>
                </div>
            </div>
        </div >
    );
};

export default ContactCard;
