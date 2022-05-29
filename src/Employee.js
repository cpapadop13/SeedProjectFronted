import React, { Component } from "react";
import { Card, CardBody, Row, Col, Label, FormGroup, Input,CardHeader,Form } from "reactstrap";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import postAPI from "./apicallingmethods/postAPITemplate";
import getAPI from "./apicallingmethods/getAPITemplate";
import { Toast } from 'primereact/toast';
import isEmpty from "./validation/isEmpty";

const initialState = {
  emplist:[],
      firstName:"",
      lastName:"",
      description:"",
      status:"",
      department:""
};
class Employee extends Component {
  constructor() {
    super();
    this.getSuccess=this.getSuccess.bind(this);
    this.saveSuccess=this.saveSuccess.bind(this);
    this.showError=this.showError.bind(this);
    this.state = initialState;
    document.title = "Employee :: CRUD Operations";
  }

  //reacts js life cycle method to calling method when page refresh
  componentDidMount = async () => {
    const data = {
      url: "seedproject/getEmployees",
      showMessage: "S",
    };
    const response = await getAPI(data);
    if (response && !isEmpty(response)) {
      this.setState({emplist:response});
      this.getSuccess();
    }else{
      this.showError();
    }
   
  };
   
 //This method set values in state
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  dellEmployee =async (item) => {
    const data = {
      url: "seedproject/delEmplyee/"+item.id,
      showMessage: "S",
    };
    const response = await getAPI(data);
    window.location.reload(false);
  };

  actionTemplate = (rowData, column) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          tooltip="Dell User"
          onClick={this.dellEmployee.bind(this, rowData)}
          tooltipOptions={{ position: "left" }}
        ></Button>
      </div>
    );
  };

  formSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName: this.state.firstName.toUpperCase(),
      lastName: this.state.lastName.toUpperCase(),
      description: this.state.description.toUpperCase(),
      status: this.state.status.toUpperCase(),
      department: this.state.department.toUpperCase(),
      url: "seedproject/addEmployee",
      showMessage: "S",
    };
     const response = await postAPI(data);
     this.setState({emplist:[response,...this.state.emplist]});
     this.setState({firstName:""});
     this.setState({lastName:""})
     this.setState({description:""})
     this.setState({status:""})
     this.setState({department:""})
     this.saveSuccess();
  };

  getSuccess=()=> {
    this.toast.show({severity: 'success', summary: 'Success Message', detail: 'Employee Get Successfully'});
  }
  
  saveSuccess=()=> {
    this.toast.show({severity: 'success', summary: 'Success Message', detail: 'Employee Save Successfully'});
  }
  showError=()=> {
    this.toast.show({severity: 'error', summary: 'Error Message', detail: 'Record Not Found'});
}

  render() {
    const savecontent = (
      <Row onSubmit={this.formSubmit}>
        <Col md="12" style={{ marginTop: "15px" }}>
        <h1 style={{color: "cadetblue"}}>WELCOME TO EMPLOYEE PORTAL</h1>
          <div>
          <Form>
          <Card>
          <CardHeader>ADD EMPLOYEE FORM</CardHeader>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>
                    First Name :<span style={{ color: "red" }}> *</span>
                  </Label>
                  <Input
                    type="text"
                    value={this.state.firstName}
                    required
                    name="firstName"
                    onChange={this.onChange}
                    placeholder="Enter First Name"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>
                    Last Name:<span style={{ color: "red" }}> *</span>
                  </Label>
                  <Input
                    type="text"
                    required
                    value={this.state.lastName}
                    name="lastName"
                    onChange={this.onChange}
                    placeholder="Enter Last Name"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Description</Label>
                  <span style={{ color: "red" }}> *</span>
                  <Input
                    type="text"
                    required
                    value={this.state.description}
                    name="description"
                    onChange={this.onChange}
                    placeholder="Enter Description"
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Status</Label>
                  <span style={{ color: "red" }}> *</span>
                  <Input
                    type="text"
                    required
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    placeholder="Enter Status"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Department</Label>
                  <span style={{ color: "red" }}> *</span>
                  <Input
                    type="text"
                    required
                    name="department"
                    value={this.state.department}
                    onChange={this.onChange}
                    placeholder="Enter Department"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Button
                    type="submit"
                    color="success"
                  >
                    Save
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            </Card>
            </Form>
          </div>
        </Col>
      </Row>
    );
    const datatablecontent = (
      <Row className="datatable-responsive-demo">
        <Col md="12" style={{ marginTop: "15px" }}>
        <Card>
          <CardHeader>ALL EMPLOYEE INFORMATION</CardHeader>
          <DataTable
            className="p-datatable-responsive-demo"
            responsive={true}
            value={this.state.emplist}
            emptyMessage="No records found"
            dataKey="userId"
            style={{ textAlign: "center" }}
            paginator={true}
            rows={10}
            rowsPerPageOptions={[10, 20, 30]}
          >
            <Column
              style={{ textAlign: "center" }}
              sortable={true}
              filter={true}
              field="firstName"
              header="First Name"
            />
            <Column
              style={{ textAlign: "center" }}
              sortable={true}
              filter={true}
              field="lastName"
              header="Last Name"
            />

            <Column
              style={{ textAlign: "center" }}
              sortable={true}
              filter={true}
              field="description"
              header="Description"
            />

            <Column
              style={{ textAlign: "center" }}
              sortable={true}
              filter={true}
              field="status"
              header="Status"
            />
            <Column
              style={{ textAlign: "center" }}
              sortable={true}
              filter={true}
              field="department"
              header="Department"
            />

            <Column
              style={{ textAlign: "center" }}
              body={this.actionTemplate}
              field="actions"
              header="Actions"
            />
          </DataTable>
          </Card>
        </Col>
      </Row>
    );

    return (
      <Row>
        <Toast ref={(el)=>(this.toast=el)} style={{marginTop:"50px"}}></Toast>
        <Col>
          <Card>
            <CardBody>
              <div className="content-section implementation">
                {savecontent}
              </div>
              <div className="content-section implementation">
                {datatablecontent}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Employee;
