const data = { /* obiekt z jednym kluczem z wartością w postaci tablicy z obiektami */
	users: [
		{
			id: 1,
			age: 29,
			name: "Mark",
			occupation: "UI designer",
			sex: "male" 
		},
		{
			id: 2,
			age: 49,
			name: "Martha",
			occupation: "UX specialist",
			sex: "female" 
		},
		{
			id: 3,
			age: 19,
			name: "Suzan",
			occupation: "Frontend developer",
			sex: "female" 
		},
		{
			id: 4,
			age: 22,
			name: "Derek",
			occupation: "JavaScript Developer",
			sex: "male" 
		},
		{
			id: 5,
			age: 21,
			name: "John",
			occupation: "Backend developer",
			sex: "male" 
		},
		{
			id: 6,
			age: 27,
			name: "Ana",
			occupation: "Python developer",
			sex: "female" 
		},
		{
			id: 7,
			age: 31,
			name: "Barb",
			occupation: "QA specialist",
			sex: "female" 
		}
	]
}

/* komponent do przekazania z propsami o nazwie jak w przekazanym komponencie: */
const Item = ({user}) => (
	<div className="userInfo"> 						
		<h3>{user.name}</h3>
		<p>user data:</p>
		<p>user's age: <strong>{user.age}</strong></p>
		<p>user's occupation: {user.occupation}</p>
		<p>user's sex: {user.sex}</p>
	</div>
)

const Header = () => {
	return (
		<div>
			<h2>Our software users</h2>
			<p>select desired list by clicking corresponding button</p>
		</div>
	)	
}

const Footer = () => {
	return (
		<footer>
			<p>Note that number of our software users grows rapidly,<br/>so make sure you join this community</p>
		</footer>
	)	
}

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
		
		/* metoda 'switch' sprawdzi jaki jest stan 'option' i zmieni renderowany zestaw danych: */
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
			<div className="appSpace"> 	{/* w metodzie (na kliknięcie) zmieniamy 'option' na konkretne wartości: */}
				<Header />
				<button onClick={this.handleUsersFilter.bind(this, "all")}>all users</button>
				<button onClick={this.handleUsersFilter.bind(this, "female")}>women</button>
				<button onClick={this.handleUsersFilter.bind(this, "male")}>men</button>
				{ this.usersList() }
				<Footer />
			</div> 
		)
	}
}

ReactDOM.render( /* przekazujemy dane w postaci 'data' (obiekt zdefiniowany na początku) */
	<ListItems data={data}/>,
	document.getElementById("root")
)