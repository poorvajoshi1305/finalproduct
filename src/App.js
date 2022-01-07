import React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { listenerCount } from 'process';
// import {Register} from './Register';

const App = () => {
  return (
    <>
      <MyComponent />
      {/* <Register /> */}
    </>
  )
}

export default App;


const MyComponent = () => {

  const [validationError, setValidationError] = useState(false);
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
    if((username.match(/[a-zA-Z]/g) && username.length >5)&&(password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8))
    {
      alert(`You are registered !!`);
    }
    else
    {
      alert("invalid !! Username sholud be atleast 6 characters and password should contain atleast 1 uppercase 1 lowercase 1 digit 1 special character and should have atleast atleast 8 characters");
      setValidationError(true);
      return;
    }

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
    const result = await axios.get(url);

    const list = result.data;
    const newList = [...list];
    setList(newList);
  };
  return (
    <>
      <div className='container-fluid bg-info mt-0'>
        <div className='d-flex justify-content-center mt-5'>
          <div>
          <form>
            <h2 className='bg-warning p-3'>Registration From</h2>
            <hr />
            <div className="form-group">
              <input type="text" value={username} placeholder='Username' onChange={onChangeusername} class="w-100"className={
             username == "" && validationError ? "border border-danger" : ""}/>
            </div>
            <div className="form-group">
              <input type="text" value={password} placeholder='Password' class='w-100' onChange={onChangepassword} className={
            password == "" && validationError ? "border border-danger" : ""}/>
            </div>
            <div className="form-group">
              <input type="button" value="Regiser" className='btn btn-3 btn-success' style={{width:"45vh"}} onClick={userRegister}/>
              <input type="button" value="Users" className='btn btn-3 btn-primary ml-1' style={{width:"45vh"}} onClick={getUsers}/>
            </div>
          </form>
          <hr />

          <h1>users</h1>
          {list.map((item, index) =>(
              <div key={index}>
                {/* <p>
                    {username}
                </p>
                <p>
                    {password}
                </p> */}
                {/* <div key={index} className='justify-center-space'> */}
                  {/* <b>USERNAME : </b>{item.username} <b>PASSWORD : </b> {item.password}</div> */}
                  {/* style={{border: "2px solid"}} */}
                  <table className="table table-dark" >
                      <tr>
                      <th scope="col"><b>USERNAME</b></th>
                      <th scope="col"><b>USERNAME</b></th>
                      </tr>
                      <tr>
                      <td scope="row">{item.username}</td>
                      <td scope="row">{item.username}</td>
                      </tr>
                  </table>
              </div>
          ))}
          </div>
        </div>
      </div>
    </>
  )
};

