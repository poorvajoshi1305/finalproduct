import React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { listenerCount } from 'process';

const App = () => {
  return (
    <>
      <MyComponent />
    </>
  )
}

export default App;


const MyComponent = () => {

  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [list, setList] = useState([]);
  const onChangeusername = (e) => {
    setUsername(e.target.value);
  };

  const onChangepassword = (e) => {
    setPassword(e.target.value);
  };

  const userRegister = async () =>{
    if(username == "" || password == "")
    {
      alert("invalid !!");
      return;
    }
    else
    alert(`You are registered !!`);
    const url = "http://localhost:4000/add-user";
    const data = {
      username : username,
      password : password,
    };


    await axios.post(url, data);

    const newlist = [data, ...list];
    setList(newlist);

    setUsername("");
    setPassword("");

  }

  const getUsers = async () => {
    const url = "http://localhost:4000/users";
    const result = await fetch(url);
    const list = await result.json();

    const newList = [...list];
    setList(newList);
  };
  return (
    <>
      <div>
        <div>
          <form>
            <h2>Registration From</h2>
            <div>
              <input type="text" value={username} placeholder='Username' onChange={onChangeusername}/>
            </div>
            <div>
              <input type="text" value={password} placeholder='Password' onChange={onChangepassword}/>
            </div>
            <div>
              <input type="button" value="Regiser" onClick={userRegister}/>
              <input type="button" value="Users" onClick={getUsers}/>
            </div>
          </form>
          <hr />
          <h1>users</h1>
          {list.map((item, index) =>(
              <div key={index}>
                {item.username} {item.password}
              </div>
          ))}
        </div>
      </div>
    </>
  )
};


