import React,{useState, useEffect, useContext} from 'react';
import Flat from '../models/flat';
import Tenant from '../models/tenant';
import addPersonIcon from '../images/iconsvg/person-plus-fill.svg';
import {TenantContext} from '../context/TenantContext';
import {FlatContext} from '../context/FlatContext';
const Home = () => {
    const [Flatlist, setFlatlist] = useState<Flat[]>([]);
    const [Tenantlist, setTenantlist] = useState<Tenant[] | []>([]);
    const tenantContext = useContext(TenantContext);
    const flatContext = useContext(FlatContext);
    useEffect(() => {
        flatContext.getAllFlats()?.then((data) => {
            setFlatlist(data);
        })

        tenantContext.getAllTenants()?.then((data) => {
            setTenantlist(data);
        })
        
      },[tenantContext,flatContext]);

    const assignTenantHandler = (flatid: number) => {
        console.log(flatid);
    }
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
                                    <div className="row justify-content-between">                                        
                                        <div className="col-10">
                                        { isOccupied ?  <p className="card-text">{currentTenant.tenantname}</p> 
                                        : <p className="card-text"> No one  </p>}
                                        </div>
                                        <div className="col-2">
                                            {!isOccupied ? <img onClick={()=>{assignTenantHandler(item.flatid)}} src={addPersonIcon} alt="caretdown" />:<></>}
                                        </div>
                                    </div>
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