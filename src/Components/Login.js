import {useState,useEffect} from 'react';
import styles from './Styles/Login.module.css'
import axios from "axios";

function Login(){
    let [userName,setUserName]=useState('');
    let [password,setPassword]=useState('');
    let [userError,setError]=useState({
        name:'',
        password:''
    });
    


    function handleSubmit(e) {
        e.preventDefault();
        console.log(password);

        setError({
            
            name:'',
            password:''
        });

        if (userName === '') {
            setError((prevState) => ({
                ...prevState,
                name:'Name is Required'
            }))
        }
        if (password === '') {
            setError((prevState) => ({
                ...prevState,
                password:'Password is Required'
            }))
        }

    }

    useEffect(()=>{
        if(userError.name=='' && userError.password =='' && userName && password)
            {

                console.log('Trying trigger server');

                axios.get("http://localhost:5000/api/users/" + userName)
    .then((response)=>{
    console.log(response);
    if(response.data.password==password){
            alert('User Logged in Successfully');
            setUserName('');
            setPassword('');
    }
    else{
        alert('Wrong Password Entered');
    }
}).catch((error)=>{
    console.log(error.response);
    if(error?.response?.data?.message!=undefined && error?.response?.data?.message=='User '+userName+' not found'){
        alert(error?.response?.data?.message);
    }
})

            }

    },[userError]);

    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
         <input
           className={styles.input}
           type="text"
           placeholder="Username"
           value={userName}
           onChange={(e) => setUserName(e.target.value)}
         />
          {userError.name && <span className={styles.error} >{userError.name}</span>}
         <input
           className={styles.input}
           type="password"
           placeholder="Password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
         />
         {userError.password && <span className={styles.error} >{userError.password}</span>}
         <button className={styles.submitButton} type="submit">
           Login
         </button>
         </form>
       );
     }
      
     export default Login;