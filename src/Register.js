import { useState } from "react";
import axios from "axios";

export const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [list, setList] = useState([]);

    const onchangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onchangePassword = (e) => {
        setPassword(e.target.value);
    }

    const registerUser = async () => {
        if((username != "" && username.match(/[a-z]/g) && password.match(/[A-Z]/g) && username.length > 5)||(password.match(/[a-z]/g) && password.match(/[A-Z]/g) && password.match(/[0-9]/g) && password.match(/[^a-zA-Z\d]/g) && password.length >= 8))
        {
            alert("Registered!!");
        }
        
        else 
        {
            alert("invalid!!");
            return;
        }
        

        const url = "http://localhost:4000/add-user";

        const data = {
            username : username,
            password : password,
        }
        await axios.post(url,data);
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

    }



    return(
        <>
            <div className="">
                <div className="justify-content-center">
                    <div >
                    <form className="">
                        <h1>Registration Form</h1>
                        <div className="form-group">
                            <input type="text" placeholder="Username" value={username} onChange={onchangeUsername}/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" value={password} onChange={onchangePassword}/>
                        </div>
                        <div className="form-group">
                            <div>
                                <input type="button" value="Register" onClick={registerUser} className="btn btn-success"/>
                            </div>
                            <div>
                                <input type="button" value="Users" onClick={getUsers} className="btn btn-info"/>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                <hr />
                <div> 
                    {list.map((items, index) => (
                        <div key={index}>username : {items.username} password : {items.password}</div>
                    ))}
                </div>
            </div>
        </>
    );
};