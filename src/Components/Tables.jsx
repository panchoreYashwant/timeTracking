import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../App';

function Tables(props) {
  const {data} = useContext(MyContext)
  const[name,setName] = useState("")
  const[printData,setPrintData] = useState([])
  const createarr = ()=>{
      let filData = data?.filter(dt=>dt.project === name)
      setPrintData(filData)

     

    console.log(filData)

  }
  useEffect(()=>{
    console.log("2222222",data)
      createarr();
  },[name])
    return (
        <div>
        <div>
        <select onChange={(e)=>{setName(e.target.value)}} class="form-select" aria-label="Default select example">
        <option  >Please Select Project </option>
        {data?.map(dt=>(

            <option value={dt?.project}>{dt?.project}</option>
        ))}
 
</select>
        </div>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th>
            Task-Time
            </th>
            <th scope="col">Total Time</th>
            
          </tr>
        </thead>
        <tbody>
          {printData !== undefined? printData[0]?.details?.map(dt=>(
<React.Fragment>
<tr>

              <th scope="row">{dt?.date}</th>
              <th>
              <select class="form-select">
              {Object.entries(dt?.task).map(dtt=>(
                 
                  <option>{dtt[0]} - {dtt[1]}hour</option>
              ))}
              
            </select>
              </th>
              <td>{dt?.total} Hour</td>
          </tr>

              </React.Fragment>
              )):""}
           
         
        </tbody>
      </table>
        </div>
    );
}

export default Tables;