import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetClientQuery } from "state/api";
import "./contact.css";

function Contact() {
  const { data } = useGetClientQuery();
  
  return (
    <div>
      <div className="cardcontact">
        <h3>Contacts</h3>
        <DataTable value={data} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
        >
          <Column field="name" header="Name" sortable></Column>
          <Column field="company" header="Company" sortable></Column>
          <Column field="email" header="Email Address" sortable></Column>
          <Column field="phoneNumber" header="Phone Number" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Contact;
