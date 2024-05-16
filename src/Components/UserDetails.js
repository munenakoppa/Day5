import {useState,useEffect} from 'react';
import axios from "axios";
import './Styles/UserDetails.css'

function UserDetails(){

    let [userDetails,setDetails]=useState([{
        name: '',
        email: '',
        phone: '',
        password:''
    }]);

    function deleteUser(name){

       console.log(name);

       var config = {
        method: 'delete',
        url: 'http://localhost:5000/api/users/'+name,
        headers: { }
      };

      axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  axios.get("http://localhost:5000/api/users")
  .then((response)=>{
  //console.log(response.data);
  setDetails(response.data);
  
}).catch((error)=>{
  console.log(error);
  
})
})
.catch(function (error) {
  console.log(error);
});

    }

    useEffect(()=>{
        axios.get("http://localhost:5000/api/users")
    .then((response)=>{
    //console.log(response.data);
    setDetails(response.data);
    
}).catch((error)=>{
    console.log(error);
    
})

        
    },[])

    return(

        <div>
            <h1>User Details</h1>
            <table id="userlist">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    
                    <th>Action</th>
                </tr>
                {
                    userDetails.map(user=>(
                    <tr id={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        
                        <td><button id = "buttons" onClick={() => deleteUser(user.name)}>X</button></td>
                    </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default UserDetails;