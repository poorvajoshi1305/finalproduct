// import logo from './logo.svg';
import axios from "axios";
import './App.css';
import { useState } from 'react';

function App() {
  return (
    <>
    <MyComponent />
    </>
  );
}

export default App;

function MyComponent()
{
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validErr, setvalidErr] = useState(false);
  const [list, setList] = useState([]);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const getUser = async () => {
    const url = "http://localhost:4000/users";
    // const result = await fetch(url);
    const result = await axios.get(url);
    const list = result.data;

    const newList = [...list];
    setList(newList);
  };
  const registerUser = async () =>{
    // alert("Registered !!");
    // if(username == "" || password == "")
    // {
    //     setvalidErr = true;
    //     return;
    // }
    if (username == "" || password == "") {
      setvalidErr(true);
      alert("invalid !!");
      return;
    }
    else{
      alert("Registered !!");
    }

    const url = "http://localhost:6000/add-user";
    const data = {
      username: username,
      password: password,
    };

    // AJAX using AXIOS
    await axios.post(url, data);

    const newList = [data, ...list];
    setList(newList);

    setUsername("");
    setPassword("");
  };


  return(
  <>
      <div className="container-fluid" >
      <div className='d-flex justify-content-center mt-5'>
      <form>
        <div>Registration from </div>
        <hr />
            <div className="form-group">
              <input type="text" placeholder='Enter username' className='w-100' style={{width:"90vh"}} onChange={onUsernameChange} className={
            username == "" && validErr ? "border border-danger" : ""
          }/>
            </div>
            <div className="form-group">
              <input type="text" placeholder='Enter password'onChange={onPasswordChange} className='w-100' style={{width:"90vh"}} className={
            password == "" && validErr ? "border border-danger" : ""
          }/>
            </div>
            <div className="form-group">
              <input type="button" value='Register' className='btn btn-3 btn-primary' onClick={registerUser}/>
            </div>
          </form>
          <hr />
          <div>${} ${}</div>
        </div>
      </div>
  </>
  );
}
