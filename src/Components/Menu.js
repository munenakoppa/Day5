import Login from './Login';
import Registration from './Registration';
import {useState} from 'react';
import styles from './Styles/Login.module.css'
import axios from "axios";
import UserDetails from './UserDetails';

function Menu() {
    let [toggle,setToggle]=useState('Registration');

    function getUsers(){

        axios.get("http://localhost:5000/api/users")
    .then((response)=>{
    console.log(response.data);
    
}).catch((error)=>{
    console.log(error);
    
})

    }

  return (
    <div >
       <div>
       <hr />
        <button onClick={()=>setToggle('Registration')} className={toggle=='Registration' ? styles.activeMenuButton : styles.menuButton}>Registration</button>
           &nbsp;&nbsp;&nbsp;
        <button onClick={()=>setToggle('Login')} className={toggle=='Login' ? styles.activeMenuButton : styles.menuButton}>Login</button>

        &nbsp;&nbsp;&nbsp;
        <button onClick={()=>setToggle('userDetails')} className={toggle=='userDetails' ? styles.activeMenuButton : styles.menuButton}>Get Users in Console</button>
        </div>
        <hr />
      {toggle=='Registration' &&<Registration />}
      {toggle=='Login' && <Login />}
      {toggle=='userDetails' && <UserDetails />}
    </div>
  );
}

export default Menu;