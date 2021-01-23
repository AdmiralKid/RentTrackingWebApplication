import React,{useState, useEffect, useContext} from 'react';
import Flat from '../models/flat';
import Tenant from '../models/tenant';
import {TenantContext} from '../context/TenantContext';
import {FlatContext} from '../context/FlatContext';
const Home = () => {
    const [Flatlist, setFlatlist] = useState<Flat[]>([]);
    const [Tenantlist, setTenantlist] = useState<Tenant[] | []>([]);
    const tenantContext = useContext(TenantContext);
    const flatContext = useContext(FlatContext);
    useEffect(() => {
        setFlatlist(flatContext.getAllFlats());
        setTenantlist(tenantContext.getAllTenants());
      },[tenantContext,flatContext]);
    return (
        <div className="container-fluid row">
            {(Flatlist.length <= 0) ? <div className="col-sm-3">No data to Show</div> :
                Flatlist.map((item: Flat) => {
                    let currentTenant: Tenant|any = Tenantlist.find((tenant)=>{return item.flatid === tenant.flatid});
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