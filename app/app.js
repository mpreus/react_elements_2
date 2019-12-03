const data = { /* obiekt z jednym kluczem z wartością w postaci tablicy z obiektami */
	users: [
		{
			id: 1,
			age: 29,
			name: "Arek",
			sex: "male" 
		},
		{
			id: 2,
			age: 49,
			name: "Marta",
			sex: "female" 
		},
		{
			id: 3,
			age: 19,
			name: "Stasia",
			sex: "female" 
		},
		{
			id: 4,
			age: 22,
			name: "Darek",
			sex: "male" 
		}
	]
}

/* komponent do przekazania z propsami o nazwie jak w przekazanym komponencie: */
const Item = ({user}) => (
	<div className="userInfo"> 						{/* ponieważ propsy nazywają się 'content': */}
		<h3>{user.name}</h3>
		<p>informacje o użytkowniku:</p>
		<p>wiek użytkownika: <strong>{user.age}</strong> lat</p>
		<p>płeć użytkownika: {user.sex}</p>
	</div>
)

class ListItems extends React.Component {
	state = {
		select: "all"  		/* będzie zmieniał się za każdą zmianą przycisku (kliknięciem) */
	}

	handleUsersFilter = (option) => { /* 'option' będzie zmianiał się w zależności od klikniętego przycisku */
		this.setState({
			select: option
		})
	}

	usersList = () => {
		let users = this.props.data.users 		/* referencja do tablicy z danymi 'data' */
		
		/* metoda 'switch' sprawdzi jaki jest stan 'select' i zmieni renderowany zestaw danych: */
		switch(this.state.select) {
			case "all":
			return users.map( user => <Item  user={user} key={user.id}/> )
			case "female":
			users = users.filter(user => user.sex === "female"); /* oryginalną tablicę filtrujemy */
			return users.map( user => <Item  user={user} key={user.id}/> ) /* z przefiltrowanej tworzymy 'div' z danymi */
			case "male":
			users = users.filter(user => user.sex === "male");
			return users.map( user => <Item  user={user} key={user.id}/> )
		} /* jeśli jest w casach 'return', to nie potrzeba 'break' */

	}

	render() {
		return (
			<React.Fragment> 	{/* w metodzie (na kliknięcie) zmieniamy 'option' na konkretne wartości: */}
				<button onClick={this.handleUsersFilter.bind(this, "all")}>wszyscy</button>
				<button onClick={this.handleUsersFilter.bind(this, "female")}>kobiety</button>
				<button onClick={this.handleUsersFilter.bind(this, "male")}>mężczyźni</button>
				{ this.usersList() }
			</React.Fragment> 
		)
	}
}

ReactDOM.render( /* przekazujemy dane w postaci 'data' (obiekt zdefiniowany na początku) */
	<ListItems data={data}/>,
	document.getElementById("root")
)
/* how to filter data */