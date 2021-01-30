import React from 'react'
import Flat from '../models/flat'
import axios from 'axios'

export interface Props {
    children: React.ReactNode
}
 
export interface FlatContextData {
    getAllFlats: () => Promise<Flat[]> | undefined;
}

export const FlatContextDefaultValue: FlatContextData = {
    getAllFlats: () => undefined
}

class FlatContextProvider extends React.Component {

    getAllFlats = async () => {
        var allFlats: Flat[] = [];
        try{
            var response = await axios.get('http://localhost:5000/flat/');
            allFlats = response.data;
            return allFlats;
        }
        catch (err){
            console.error(err);
            throw err;
        }
    }

    state : any = { getAllFlats: this.getAllFlats};

    render() { 
        return (
            <FlatContext.Provider value={{getAllFlats: this.getAllFlats}}>
                {this.props.children}
            </FlatContext.Provider>
        );
    }
}
export const FlatContext = React.createContext<FlatContextData>(FlatContextDefaultValue);
export default FlatContextProvider;