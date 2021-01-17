import { debug } from 'console';
import React,{useContext, useState, useEffect} from 'react'
import { parse } from 'url';
import '../App.css';
import { TenantContext } from '../context/TenantContext';
import Tenant from '../models/tenant'
function ViewTenant() {
    const [tenantlistState, settenantlist] = useState<Tenant[]>([])
    const contstate = useContext(TenantContext)    
    useEffect(() => {
        var alltenantPromise = contstate.getAllTenants()
        var allTenants: Tenant[] = []
        alltenantPromise.then((value)=>{
            if(value!=undefined)
            {
                if(value!=undefined)
                {
                    allTenants?.push(...value[0])
                    console.log(allTenants);
                    settenantlist(allTenants);
                }
            }        
        }).finally(() => {
            
            
        })
    },[])
    
    return (
        <div className="heading">
            ViewTenant
            {tenantlistState.map((item) => {
                return(<h1 key={item.tenantid}>{item.tenantname}</h1>)
            })}
        </div>
    )
}

export default ViewTenant
