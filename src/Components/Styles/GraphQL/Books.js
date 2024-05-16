import {useState,useEffect} from 'react';
import axios from "axios";
import '../Styles/UserDetails.css'

function Books(){

    let [booksDetails,setDetails]=useState([{
        id: '',
        title: '',
        author: '',
       
    }]);

    var data = JSON.stringify({
        query: `{
        books {
          id
          title
          author
        }
      }`,
        variables: {}
      });

    useEffect(()=>{
      var config = {
  method: 'post',
  url: 'http://localhost:4000/graphql',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  setDetails(response.data.data.books);
})
.catch(function (error) {
  console.log(error);
});

        
    },[])

    return(

        <div>
            <h1>Books Details</h1>
            <table id="userlist">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    
                   
                </tr>
                {
                    booksDetails.map(book=>(
                    <tr id={book.id}>
                      <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        
                        
                       
                    </tr>
                    ))
                }
            </table>

        </div>
    )
}

export default Books;