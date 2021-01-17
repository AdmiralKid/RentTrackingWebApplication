import React from 'react'
import Tenant from '../models/tenant'
import axios from 'axios'

export interface Props {
    children: React.ReactNode
}
 
export interface TenantContextData {
    tenantList: Tenant[];
    getAllTenants: () => Promise<any[] | undefined>;
}

export const tenantContextDefaultValue: TenantContextData = {
    tenantList: [],
    getAllTenants: async () => undefined
}

export const TenantContext = React.createContext<TenantContextData>(tenantContextDefaultValue);



class TenantContextProvider extends React.Component {
    getAllTenants = async () => {
        let result : any[] = []
        try{
            const callback = await axios.get('http://localhost:5000/tenant/')
            result.push(callback.data);
            console.log("Callback Data = ",callback.data);
            return result;
        }
        catch{
            console.error("Error Get All Tenants.");
        }        
    }
    obj : Tenant = {
        tenantid: 1,
        tenantname: "sid",
        tenantaddress: "abc",
        tenantmobilenumber:9900,
        rentalagreementid: 1,
        checkindate: new Date(2018, 11, 24, 10, 33, 30),
        rentamount: 10239
    }  
    state : TenantContextData= { tenantList:  [this.obj,this.obj], getAllTenants: this.getAllTenants}

    render() { 
        return ( 
            <TenantContext.Provider value={this.state}>
                {this.props.children}
            </TenantContext.Provider>
         );
    }
}
 
export default TenantContextProvider;