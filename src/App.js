import './App.css';
import React from 'react'
import axios from 'axios'
function App() {
  const [serverdata,setdata]=React.useState([]);
  const [form,setform]=React.useState({});
  const connect=async()=>{
    const res=await axios.get('http://localhost:4000/data');
    setdata(res.data);
  }
  React.useEffect(()=>{
    connect();
  },[])

  const datastore=(e)=>{
    setform({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const submited=async(e)=>{
    e.preventDefault()
    const name=form.Full_Name
    const email=form.Email_Address
    const tel=form.Contact_Number
    const select=form.Lead_Type
    const companyname=form.Company_Name
    const file=form.Document
    const res=await axios.post('http://localhost:4000/submit',{
      name,
      email,
      tel,
      select,
      companyname,
      file
    })
    //alert(JSON.stringify(form))

  }

  
  return (

    <div className="App">
      {serverdata.map((item)=>
        <div>
          
          <center>
          <form className="form" onSubmit={submited}>
          <h1>{item.title}</h1>
          <hr />
          <br />
          {(item.fields).map((field_item)=>
          <div>
            <b><label >{field_item.label}: </label></b>
              {field_item.type==='select' || field_item.type==='checkbox' || field_item.type==='radio'?<select name={field_item.label} className='input' onChange={datastore}>
                {(field_item.options).map((options)=>
                <option  value={options}>{options}</option>)}
              </select>
              :
              <input className='input' name={field_item.label} type={field_item.type} required={field_item.required} onChange={datastore}></input>}
              
                
              
              
            </div>
          )}
          <button className="btn">Submit</button>
          </form>
          </center>
        </div>
        )}

    </div>
  );
}

export default App;
