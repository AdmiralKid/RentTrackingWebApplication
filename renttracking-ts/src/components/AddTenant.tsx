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
    const [tenant, setTenant] = useState<Tenant>({tenantmobilenumber : 0, tenantname : "", tenantaddress : "", tenantid : 0, checkindate : new Date(), checkoutdate : new Date(), rentamount : 0, flatid : 0, rentalagreementid : 0});
    const [errors, seterrors] = useState({tenantname : "", tenantaddress : "", tenantmobilenumber : ""});
    const onModalCloseHandler = () => {
        seterrors({tenantname : "", tenantaddress : "", tenantmobilenumber : ""});
        props.closeModalFunc();
    }
    const handleChange = (event : any) => {
        setTenant({...tenant, [event.target.name]:event.target.value});
    }
    const validateForm = (tenantdata : Tenant) => {
        let validErrors = {tenantname : "", tenantaddress : "", tenantmobilenumber : ""};
        if(!tenantdata.tenantname.trim()){
            validErrors.tenantname = "Tenant Name Required.";
        }
        else if(tenantdata.tenantname.length<3){
            validErrors.tenantname = "Tenant Name Must be at least 3 characters.";
        }
        if(!tenantdata.tenantaddress.trim()){
            validErrors.tenantaddress = "Tenant Address Required.";
        }
        if(tenantdata.tenantmobilenumber.toString().trim().length !== 10){
            validErrors.tenantmobilenumber = "Invalid Mobile number. Remove 0  or +91";
        }
        return validErrors;
    }
    const handleSubmit = (event : any) => {
        event.preventDefault();
        let validErrors = validateForm(tenant);
        seterrors(validErrors);
        if(validErrors.tenantname === "" && validErrors.tenantaddress === "" && validErrors.tenantmobilenumber === ""){
            props.onAddTenantModalSubmit(tenant);
            onModalCloseHandler();
        }
    }
    
    return (
        <>
            <Modal show={props.showModal} onHide={()=>{onModalCloseHandler()}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Tenant</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e)=>{handleSubmit(e)}}>
                    <Modal.Body>
                        
                            <Form.Group controlId="formTenantName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="tenantname" placeholder="Tenant Name" onChange={(e)=>{handleChange(e)}} isInvalid={!!errors.tenantname}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.tenantname}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTenantAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control name="tenantaddress" as="textarea" onChange={(e)=>{handleChange(e)}} isInvalid={!!errors.tenantaddress} />
                                <Form.Control.Feedback type="invalid">
                                {errors.tenantaddress}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="formTenantMobileNumber">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control name="tenantmobilenumber" type="number" onChange={(e)=>{handleChange(e)}} isInvalid={!!errors.tenantmobilenumber}/>
                                <Form.Control.Feedback type="invalid">
                                {errors.tenantmobilenumber}
                                </Form.Control.Feedback>
                            </Form.Group>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" type="submit">
                        Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default AddTenantModal