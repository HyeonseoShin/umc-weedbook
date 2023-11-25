import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App()
{
  const [id, setId] = useState("");
  const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const {name, value} = event.target;

    switch (name)
    {
      case "id": setId(value); break;
      case "password": setpassword(value); break;
      default: break; 
    }
  }

  const handleClick = async(event) => {
    if(id == "" || password == "")
    {
      alert("submit 이벤트가 중단되었습니다.");
      event.preventDefault();
    }

    setIsLoading(true);

    try
    {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        {
          id: id,
          pw: password
        }
      );
      console.log("data");
      console.log(response.data);
    }
    catch(error)
    {
      console.log("error");
      console.log(error);
    }
    finally
    {
      setTimeout(() => setIsLoading(false), 1500);
    }
  }

  return (
    <div className="App">
      <div>
        <div className="input">
          <label htmlFor='id'>
            ID
          </label>
          <input name='id' value={id} onChange={handleChange}>

          </input>
        </div>

        <div className='input2'>
          <label htmlFor='password'>
            Password
          </label>
          <input name='password' value={password} type='password' onChange={handleChange}>

          </input>
        </div>

          <input type='submit' value={"login"} onclick={handleClick} disabled={isLoading}>

          </input>
          <LoadingModal show = {isLoading}>

          </LoadingModal>
      </div>
    </div>
  );
}

function LoadingModal({ show })
{
  if (!show)
  {
    return null;
  }

  return(
    <div className='modal'>
      <div className='content'>
        Loading...
      </div>
    </div>
  );
}

export default App;
