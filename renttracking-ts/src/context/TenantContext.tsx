import React from 'react'
import Tenant from '../models/tenant'
import axios from 'axios'

export interface Props {
    children: React.ReactNode
}
 
export interface TenantContextData {
    getAllTenants: () => Promise<Tenant[]>|undefined;
}

export const tenantContextDefaultValue: TenantContextData = {
    getAllTenants: () => undefined
}

class TenantContextProvider extends React.Component {

    getAllTenants = async () : Promise<Tenant[]> => {
        var allTenants: Tenant[] = [];
        try{
            var response = await axios.get('http://localhost:5000/tenant/');
            allTenants = response.data;
            return allTenants;
        }
        catch (err){
            console.error(err);
            throw err;
        }
    }

    state : any = {getAllTenants: this.getAllTenants};
    
    render() { 
        return (
            <TenantContext.Provider value={{getAllTenants: this.getAllTenants}}>
                {this.props.children}
            </TenantContext.Provider>
        );
    }
}
export const TenantContext = React.createContext<TenantContextData>(tenantContextDefaultValue);
export default TenantContextProvider;