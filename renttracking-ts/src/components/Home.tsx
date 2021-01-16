import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import Flat from '../models/flat';
import Tenant from '../models/tenant';
const Home = () => {
    const [Flatlist, setFlatlist] = useState<Flat[]>([])
    const [Tenantlist, setTenantlist] = useState<Tenant[] | []>([])
    useEffect(() => {
        axios.get('http://localhost:5000/flat/')
                .then(function (response) {
                    console.log(response);
                    setFlatlist(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        
        axios.get('http://localhost:5000/tenant/')
                .then(function (response) {
                    console.log(response);
                    setTenantlist(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        
      },[]);
    return (
        <div className="container-fluid row">
            {(Flatlist.length <= 0) ? <div className="col-sm-3">No data to Show</div> :
                Flatlist.map((item: Flat) => {
                    debugger;
                    let currentTenant: Tenant|any = Tenantlist.find((tenant)=>{return item.currenttenantid === tenant.tenantid});
                    let isOccupied = (typeof currentTenant !== 'undefined');
                    return(
                        <div key={item.flatid} className="col-sm-3" style={{paddingTop: "10px"}}>
                            <div className="card">
                                <div className="card-body" style={{backgroundColor:"LightGreen"}}>
                                    <h5 className="card-title">{item.flatid}</h5>
                                    { isOccupied ?  <p className="card-text">{currentTenant.tenantname}</p> : <p className="card-text">No one </p>}                                   
                                </div>
                            </div>
                        </div>
                    )
                })
            }            
        </div>
    )
}

export default Home