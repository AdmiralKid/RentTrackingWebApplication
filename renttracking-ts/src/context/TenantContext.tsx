import React from 'react'
import Tenant from '../models/tenant'
import axios from 'axios'

export interface Props {
    children: React.ReactNode
}
 
export interface TenantContextData {
    getAllTenants: () => Tenant[];
}

export const tenantContextDefaultValue: TenantContextData = {
    getAllTenants: () => []
}

class TenantContextProvider extends React.Component {

    getAllTenants = () => {
        return this.state.tenantList;
    }

    state : any = { tenantList:  [], getAllTenants: this.getAllTenants};

    initTenants = async  () => {
        var allTenants: Tenant[] = [];
        try{
            var response = await axios.get('http://localhost:5000/tenant/');
            allTenants = response.data;
        }
        catch (err){
            console.error(err);
            allTenants = [];
        }
        return allTenants;
    }
    
    componentDidMount(){
        this.initTenants().then((data)=>{
            this.setState({tenantList:data});
        })
    }

    render() { 
        return (
            <TenantContext.Provider value={{getAllTenants: this.getAllTenants, }}>
                {(this.state.tenantList.length>0)?this.props.children: null}
            </TenantContext.Provider>
        );
    }
}
export const TenantContext = React.createContext<TenantContextData>(tenantContextDefaultValue);
export default TenantContextProvider;