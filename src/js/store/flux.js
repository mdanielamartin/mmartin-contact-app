const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [
				{
					name: "Don Chipi",
					phone: "(039)-343-3232",
					address: 'Segunda Parcela',
					email: "donchipi@outlook.com",
					id: 0
				},
				{
					name: "Mr. Cuchi",
					phone: "(043)-354-4234",
					address: 'Venezuela',
					email: "soycuchi@outlook.com",
					id: 2
				}
			],

			agendas: [],

			user: { slug: '', id: '', status: false },

			toEdit: {},
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getAgendaList: async () => {
				const store = getStore();
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas')
					const agendasList = await response.json()
					if (!response.ok) {
						throw new Error(agendasList.detail)
					}
					setStore({ ...store, agendas: [...agendasList.agendas] })
				} catch (error) {
					console.error(`Something went wrong, ${error}`)
				}

			},

			updateRender: async () => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.user.slug}`)
					const agenda = await response.json()
					if (!response.ok) {
						throw new Error(agenda.detail)
					}
					setStore({ ...store, contacts: [...agenda.contacts] })
				} catch (error) {
					console.error(`Something went wrong, ${error}`)

				}
			},

			selectAgenda: async (e) => {
				const store = getStore();
				setStore({ ...store, user: { slug: e.target.value, id: 0 } })
				await getActions().updateRender();

			},

			submitContact: async (data) => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.user.slug}/contacts`, {
						method: 'POST',
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify(data)
					})
					const contact = await response.json();
					if (!response.ok) {
						throw new Error(contact.detail)
					}
				} catch (error) {
					console.error(`Something went wrong, ${error}`)
				}
				await getActions().updateRender();
			},

			deleteContact: async (id) => {
				const store = getStore();
				console.log(id)
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.user.slug}/contacts/${id}`, {
						method: 'DELETE'
					})
					if (!response.ok) {
						throw new Error(response.statusText)
					}
				} catch (error) {
					console.error(`Something went wrong, ${error}`)
				}
				await getActions().updateRender();
			},

			editContact: async (data) => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${store.user.slug}/contacts/${data.id}`, {
						method: 'PUT',
						headers: { 'content-type': 'application/json' },
						body: JSON.stringify(data)
					})
					const contact = await response.json();
					if (!response.ok) {
						throw new Error(contact.detail)
					}
				} catch (error) {
					console.error(`Something went wrong, ${error}`)
				}
				getActions().resetEdit()
				await getActions().updateRender();

			},

			resetEdit: () => {
				const store = getStore();
				setStore({ ...store, toEdit: {} })
			},

			editRequest: (data) => {
				const store = getStore();
				setStore({ ...store, toEdit: data });
			},

			createUserAgenda: async (username) => {
				const store = getStore();
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}`, {
						method: 'POST'
					})
					const registration = await response.json();
					if (!response.ok) {
						throw new Error(registration.detail)
					}
					setStore({ ...store, user: registration });
				} catch (error) {
					alert(`Something went wrong, ${error}`)
					console.error(`Something went wrong, ${error}`)
				}
				await getActions().updateRender();
				await getActions().getAgendaList();
			},

			deleteUserAgenda: async (username) => {
				const store = getStore();

				if (username === '') {
					username = store.user.slug;
				}
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/${username}`, {
						method: 'DELETE'
					})
					if (!response.ok) {
						throw new Error(response.statusText)
					}
					setStore({ ...store, user: { slug: '', id: '', status: false }, contacts: [] });
				} catch (error) {
					alert(`Something went wrong, ${error}`)
					console.error(`Something went wrong, ${error}`)
				}
				await getActions().getAgendaList();

			}
		}
	};
};

export default getState;
