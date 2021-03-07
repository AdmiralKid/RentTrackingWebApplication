import React,{useState} from 'react'
import '../App.css';
import Tenant from '../models/tenant';
import {Modal, Button, ListGroup, InputGroup} from 'react-bootstrap';
interface propsType {
    showModal:boolean;
    closeModalFunc: ()=>void;
    tenantData : Tenant[];
    selectedFlat: number;
    onModalSubmit: (flatid: number, tenantid: number)=>void;
}
function AssignTenantModal(props:propsType) {
    const [SelectedTenant, setSelectedTenant] = useState(-1);
    const handleTenantSelection = (tenantId:number) => {        
        setSelectedTenant(tenantId);
    }
    return (
        <>
            <Modal show={props.showModal} onHide={()=>{props.closeModalFunc()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Assign Tenant to Flat Number: {props.selectedFlat}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup as="ul">
                        {props.tenantData.map((item: Tenant) => {
                            if(item.flatid == null && item.checkoutdate == null)
                            {
                                return(
                                <ListGroup.Item key={item.tenantid} as="li">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Radio name="tenantgroup" onChange={()=>{handleTenantSelection(item.tenantid)}} aria-label="TenantSelection" />
                                        </InputGroup.Prepend>
                                        <InputGroup.Text>{item.tenantname}</InputGroup.Text>
                                    </InputGroup>
                                </ListGroup.Item>);
                            }
                        })}
                    </ListGroup>                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{
                        if(SelectedTenant !== -1)
                        {
                            props.onModalSubmit(props.selectedFlat,SelectedTenant);
                        }
                        props.closeModalFunc();
                        }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AssignTenantModal
