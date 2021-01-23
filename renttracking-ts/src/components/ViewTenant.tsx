import React,{useContext, useState, useEffect} from 'react'
import '../App.css';
import { TenantContext } from '../context/TenantContext';
import Tenant from '../models/tenant'
function ViewTenant() {
    const [tenantlistState, settenantlist] = useState<Tenant[]>([])
    const contstate = useContext(TenantContext)    
    useEffect(() => {
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
