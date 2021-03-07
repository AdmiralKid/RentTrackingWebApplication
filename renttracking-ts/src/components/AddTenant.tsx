import React,{useState} from 'react'
import '../App.css';
import Tenant from '../models/tenant';
import {Modal, Button, Form} from 'react-bootstrap';

interface propsType {
    showModal:boolean;
    closeModalFunc: ()=>void;
    onAddTenantModalSubmit: (tenant: Tenant)=>void;
}
function AddTenantModal(props:propsType) {
    const [tenant, setTenant] = useState<Tenant>({tenantmobilenumber:0, tenantname:"", tenantaddress:"", tenantid:0,checkindate:new Date(),checkoutdate:new Date(), rentamount:0, flatid:0,rentalagreementid:0});
    const handleTenantNameChange = (value: string) => {
        var updatedTenant = tenant;
        updatedTenant.tenantname = value;
        setTenant(updatedTenant)
    }
    const handleTenantAddressChange = (value: string) => {
        var updatedTenant = tenant;
        updatedTenant.tenantaddress = value;
        setTenant(updatedTenant)
    }
    const handleTenantMobileNumberChange = (value: string) => {
        var updatedTenant = tenant;
        updatedTenant.tenantmobilenumber = +value;
        setTenant(updatedTenant)
    }
    return (
        <>
            <Modal show={props.showModal} onHide={()=>{props.closeModalFunc()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Tenant</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTenantName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="Tenant Name" onChange={(e)=>{handleTenantNameChange(e.target.value)}} />
                            <Form.Control.Feedback type="invalid">
                                Invalid
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTenantAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" onChange={(e)=>{handleTenantAddressChange(e.target.value)}} />
                            <Form.Control.Feedback type="invalid">
                            Invalid
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTenantMobileNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control type="number" onChange={(e)=>{handleTenantMobileNumberChange(e.target.value)}} />
                            <Form.Control.Feedback type="invalid">
                            Invalid
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={()=>{
                            //props.onAddTenantModalSubmit(tenant);
                            props.closeModalFunc();                  
                    }}>
                    Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTenantModal