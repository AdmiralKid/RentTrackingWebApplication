import React, {createContext, Component} from "react";
import axios from 'axios';
export const TenantContext = createContext();

class TenantContextProvider extends Component {
    state = { 
        tenantList: []
    }
    fetchTenants = async () => {
        const response = await axios.get('http://localhost:5000/tenant/');
        this.setState({tenantList:response.data});
    };
    componentDidMount(){
        debugger;
        this.fetchTenants()
    }
    render() { 
        return ( 
            <TenantContext.Provider value={{tenantList:this.state.tenantList}}>
                {this.props.children}
            </TenantContext.Provider>
         );
    }
}
 
export default TenantContextProvider;