import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../../img/rigo-baby.jpg";
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
        <div className={`d-flex ${styles.card} align-items-center justify-content-start border w-75`}>
            <div className={`mx-5 ${styles.profile}`}>
                <img src={Profile} className={styles.profileImg} />
            </div>
            <div className={`${styles.text} px-5 py-3`}>
                <h1 className={styles.title}>{data.name}</h1>
                <p className={styles.info}><FontAwesomeIcon icon={faLocationDot} className="me-3 mt-3" />{data.address}</p>
                <p className={styles.info}><FontAwesomeIcon icon={faPhone} className="me-3" />{data.phone}</p>
                <p className={styles.info}><FontAwesomeIcon icon={faEnvelope} className="me-3" />{data.email}</p>
            </div>

            <div className={`${styles.actions} d-flex justify-content-end align-items-start`}>
                <button className={`mx-3 ${styles.buttons}`} onClick={() => handleEdit(data)}><FontAwesomeIcon icon={faPenToSquare} className="mx-3" /></button>
                <button className={`mx-3 ${styles.buttons}`} onClick={() => actions.deleteContact(data.id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div >
    );
};

export default ContactCard;
