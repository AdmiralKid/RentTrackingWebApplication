interface Tenant  {
    tenantid: number; 
    tenantname: string;
    tenantaddress: string;
    tenantmobilenumber: number;
    rentalagreementid: number;
    checkindate: Date;
    rentamount: number; 
}

export default Tenant;