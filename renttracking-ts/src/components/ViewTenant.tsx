import React,{useContext, useState, useEffect} from 'react'
import '../App.css';
import { TenantContext } from '../context/TenantContext';
import Tenant from '../models/tenant'
function ViewTenant() {
    const [tenantlistState, settenantlist] = useState<Tenant[]>([]);
    const tenantContext = useContext(TenantContext);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    useEffect(() => {
        tenantContext.getAllTenants()?.then((data) => {
            settenantlist(data);
        })
    },[tenantContext])
    var tenantRow = tenantlistState.map((item) => {
        var cdate = new Date(item.checkindate)
        var dateFormatString = cdate.getDate() + " " + months[cdate.getMonth()] + ", " + cdate.getFullYear();
        return( 
        <tr key={item.tenantid}>
            <td>{item.tenantname}</td>
            <td className="d-none d-md-block d-lg-block d-xl-block">{item.tenantaddress}</td>
            <td>{item.tenantmobilenumber}</td>
            <td>{dateFormatString}</td>
            <td>{item.rentamount}</td>
        </tr>)
    });
    return (
        <div className="ViewTenant">
            <h4 className="heading">ViewTenant</h4>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th className="d-none d-md-block d-lg-block d-xl-block" scope="col">Address</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Check-in Date</th>
                    <th scope="col">Current Rent(₹)</th>
                </tr>
            </thead>
            <tbody>
            {tenantRow}
            </tbody>
            </table>
        </div>
    )
}

export default ViewTenant
