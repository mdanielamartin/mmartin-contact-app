import React, { useState, useContext, useEffect, act } from "react";
import { Link } from 'react-router-dom'
import ContactCard from "../components/ContactCard.jsx";
import styleLink from "../../styles/addcontact.module.css"
import { Context } from "../store/appContext";
//include images into your bundle


//create your first component
const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [user, setUser] = useState('');
	useEffect(() => {
		actions.resetEdit();
	}, [])

	return (
		<div>
			<div className={`container-fluid my-2`}>
				<div className="row d-flex justify-content-center align-items-center">
					<div className="col-lg-5 col-sm-12 d-flex">
						<input type="text" className={`form-control me-1`} placeholder="Enter agenda to create or delete" onChange={(e) => { setUser(e.target.value) }} />
						<button className={`btn btn-success mx-1`} onClick={() => { actions.createUserAgenda(user) }}>New Agenda</button>
						<button className={`btn btn-danger mx-1`} onClick={() => { actions.deleteUserAgenda(user) }}>Delete Agenda</button>
					</div>
					<div className="dropdown col-lg-6 col-sm-12">
						<button className="btn btn-light dropdown-toggle w-100 py-3" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Select Agenda</button>
						<ul className="dropdown-menu px-5 w-75 justify-content-center" aria-labelledby="dropdownMenu2">
							{actions.emptyAgendaList() ? <li>NO AGENDAS AVAILABLE</li> :
								store.agendas.map((agenda, index) => {
									return (
										<li key={index}><button className="dropdown-item" type="button" value={agenda.slug} onClick={(e) => actions.selectAgenda(e)}>{agenda.slug}</button></li>
									)
								})}
						</ul>
					</div>
					<div className="col-lg-1 col-sm-12 d-flex justify-content-center">
						<Link to="/addcontact" className={`btn btn-success`}>Add Contact</Link>
					</div>
				</div>

				<div className={`row d-flex justify-content-center align-items-center my-2 fs-4 fw-bold ${styleLink.currentview}`}>{`Currently viewing: ${store.user.slug}`}</div>
			</div>
			<div className='container-fluid d-flex flex-column'>
				{actions.emptyAgenda() ? <div className='row justify-content-center my-2'>NO CONTACTS STORED, CLICK ADD CONTACT</div> : store.contacts.map((contact, index) => {
					return (
						<div div className='row justify-content-center my-2' key={contact.id}>
							<ContactCard data={contact} />
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default Contacts;
