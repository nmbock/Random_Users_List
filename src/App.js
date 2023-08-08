import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  // données, state
  const [users, setUsers] = useState([
    {id: 1, nom: "Bob"},
    {id: 2, nom: "Chris"}
  ]);

  // cmpts
  const handleDelete = (id) => {
    //alert("handledelete");
    console.log(id);
    const usersCopy = [...users];
    const usersUpdated = usersCopy.filter((user) => (
      user.id !== id
    ));
    setUsers(usersUpdated);
  };

    // Function to fetch a random user from RandomUser.me API
  async function fetchRandomUser() {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const { title, first, last } = data.results[0].name;
      return `${title} ${first} ${last}`;
    } catch (error) {
      console.error('Error fetching random user:', error);
      return null;
    }
  }
  
  const handleAdd = async () => {
    try {
      const newUser = await fetchRandomUser();
      if (newUser) {
        const usersCopy = [...users, { id: users.length + 1, nom: newUser }];
        setUsers(usersCopy);
      }
    } catch (error) {
      console.error('Error adding a user:', error);
    }
  };
  

  // Affichage
  return (
    <div className="App">
      <h1>Good afternoon !</h1>
      <div className="user-list-container">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span className="user-name">{user.nom}</span>
              <button onClick={() => handleDelete(user.id)}>Delete User</button>
            </li>
          ))}
        </ul>
        <div className="add-user-btn">
          <button onClick={() => handleAdd()}>Add a User</button>
        </div>
      </div>
    </div>
  );
}

export default App;
