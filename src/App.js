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
    if((username == "" && username.length < 6 )||( password == "" && password.length < 6))
    {
      alert("invalid !!");
      setValidationError(true);
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
              <input type="text" value={username} placeholder='Username' onChange={onChangeusername}className={
             username == "" && validationError ? "border border-danger" : ""}/>
            </div>
            <div className="form-group">
              <input type="text" value={password} placeholder='Password' className='w-100' onChange={onChangepassword} className={
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

