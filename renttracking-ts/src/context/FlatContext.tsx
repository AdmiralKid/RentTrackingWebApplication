import React from 'react'
import Flat from '../models/flat'
import axios from 'axios'

export interface Props {
    children: React.ReactNode
}
 
export interface FlatContextData {
    getAllFlats: () => Flat[];
}

export const FlatContextDefaultValue: FlatContextData = {
    getAllFlats: () => []
}

class FlatContextProvider extends React.Component {

    getAllFlats = () => {
        return this.state.FlatList;
    }

    state : any = { FlatList:  [], getAllFlats: this.getAllFlats};
    
    initFlats = async  () => {
        var allFlats: Flat[] = [];
        try{
            var response = await axios.get('http://localhost:5000/flat/');
            allFlats = response.data;
        }
        catch (err){
            console.error(err);
            allFlats = [];
        }
        return allFlats;
    }
    
    componentDidMount(){
        this.initFlats().then((data)=>{
            this.setState({FlatList:data});
        })
    }

    render() { 
        return (
            <FlatContext.Provider value={{getAllFlats: this.getAllFlats, }}>
                {(this.state.FlatList.length>0)?this.props.children: null}
            </FlatContext.Provider>
        );
    }
}
export const FlatContext = React.createContext<FlatContextData>(FlatContextDefaultValue);
export default FlatContextProvider;