import { useEffect, useState } from 'react';
import './App.css';
import api from './config_axios';

function Avion() {
const [test,setTest]=useState()
  useEffect(() => {
    const loadData = async () =>
     { const data =await api.get('/avion/getallavion')
      console.log(data)
      setTest(data)}
      loadData()
  }, [])
  console.log("avion",test)
  return (
  <>
     <h1 style={{textAlign:'center'}}>Axios Interceptors (Global instance)</h1>
  {
    test?.map(item=>
        <div style={{display:'flex',justifyContent:'space-between',padding:'30px'}}>
        <p>nom :{item?.nom_avion}</p>
        <p>point_depart{item?.point_depart}</p>
        <p>point_arrive{item?.point_arrive}</p>
        </div>
    )
  }
  </>
  );
}

export default Avion;
