import React, { Component } from 'react';
//import { Route, withRouter, BrowserRouter } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import '../../App.css';

import http from '../10Services/httpService';
import apiEndpoint from '../10Services/endpoint';
import swal from 'sweetalert';

import inputValidator from '../08CommonComponents/InputValidator';


//var currentDate = (new Date().getUTCFullYear()) + "-" + dateFormat(new Date().getUTCMonth() + 1) + "-" + dateFormat(new Date().getUTCDate());

// function dateFormat(num) {
//     if (num >= 1 && num <= 9) {
//         return "0" + num;
//     }
//     else return num;
// }


class AdminCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: "ADMIN",
            name: "",
            surname: "",
            birthdate: "",
            personalCode: "",
            address: "",
            phone: "",
            email: ""
        }
        this.roleDropdownOnChange = this.roleDropdownOnChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    drawSelector() {
        return (
            <div className="form">
                <div className="form-group ">
                    <label htmlFor="role-selector">Naudotojo rolė:</label>
                    <select name="role-selector" id="selRole" className="form-control" value={this.state.role} onChange={this.roleDropdownOnChange}>
                        <option value="ADMIN">Administratorius</option>
                        <option value="MANAGER">Švietimo specialistas</option>
                        <option value="USER">Vaiko atstovas</option>
                    </select>
                </div>
                <div className="form-group ">
                    <label htmlFor="txtEmail">El. paštas <span className="fieldRequired">*</span></label>
                    <input
                        type="text"
                        className="form-control"
                        id="txtEmail"
                        name="email"
                        value={this.state.email}
                        placeholder="El. paštas"
                        onChange={this.handleChange}
                        onInvalid={(e) => inputValidator(e)}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                    />
                </div>
            </div>
        )
    }

    drawForm(role) {
        if (role === "ADMIN" || role === "MANAGER") {
            return (
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="txtName">Vardas <span className="fieldRequired">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtName"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            onInvalid={(e) => inputValidator(e)}
                            placeholder="Vardas"
                            required
                            pattern="[A-zÀ-ž]{2,32}"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtSurname">Pavardė <span className="fieldRequired">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            id="txtSurname"
                            name="surname"
                            value={this.state.surname}
                            onChange={this.handleChange}
                            onInvalid={(e) => inputValidator(e)}
                            placeholder="Pavardė"
                            required
                            pattern="[A-zÀ-ž]{2,32}"
                        />
                    </div>
                </div>
            )
        }
        else if (role === "USER") {
            return (
                <div className="form-group">
                    <div className="form">
                        <div className="form-group ">
                            <label htmlFor="txtName">Vardas <span className="fieldRequired">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="txtName"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                placeholder="Vardas"
                                required
                                pattern="[A-zÀ-ž]{2,32}"
                            />
                        </div>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="txtSurname">Pavardė <span className="fieldRequired">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="txtSurname"
                                name="surname"
                                value={this.state.surname}
                                onChange={this.handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                placeholder="Pavardė"
                                required
                                pattern="[A-zÀ-ž]{2,32}"
                            />
                        </div>
                    </div>
                    <div className="form">
                        {/*<div className="form-group col">
                        <label htmlFor="txt">Gimimo data <span className="fieldRequired">*</span></label>
                        {<input 
                            type="date"
                            data-date-format="DD/MM/YYYY"
                            min='1900-01-01'
                            max={currentDate}
                            className="form-control"
                            id="txtBirthdate"
                            name="birthdate"
                            value={this.state.birthdate}
                            onChange={this.handleChange}
                            onInvalid={(e) => this.validateText(e)}
                            placeholder="MMMM-MM-DD"
                            required
                        />
                        </div>*/}
                        <div className="form-group">
                            <label htmlFor="txtIdentificationCode">Asmens kodas <span className="fieldRequired">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="txtPersonalCode"
                                name="personalCode"
                                value={this.state.personalCode}
                                onChange={this.handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                placeholder="Asmens kodas"
                                required
                                pattern="[0-9]{11}"
                            />
                        </div>
                    </div>
                    <div className="form">
                        <div className="form-group">
                            <label htmlFor="txtTelNo">Telefonas <span className="fieldRequired">*</span></label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">
                                        +370
                                    </div>
                                </div>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="txtTelNo"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    onInvalid={(e) => inputValidator(e)}
                                    placeholder="Telefono numeris"
                                    required pattern="[0-9]{8}">
                                </input>
                            </div>
                        </div>
                    </div>

                    <div className="form">
                        <div className="form-group ">
                            <label htmlFor="txtAddress">Adresas <span className="fieldRequired">*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="txtAddress"
                                name="address"
                                value={this.state.address}
                                onChange={this.handleChange}
                                onInvalid={(e) => inputValidator(e)}
                                placeholder="Adresas"
                                required
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }

    resetState = () => {
        this.setState({
            name: "",
            surname: "",
            birthdate: "",
            personalCode: "",
            address: "",
            phone: "",
            email: ""
        })

    }

    roleDropdownOnChange(event) {
        event.preventDefault()
        this.setState({
            role: event.target.value,
        })
        this.resetState();
    }

    handleChange(event) {
        const target = event.target;
        inputValidator(event);
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("Posting to " + apiEndpoint + "/api/users/admin/createuser")
        http.post(`${apiEndpoint}/api/users/admin/createuser`, {
            "address": this.state.address,
            //"birthdate": this.state.birthdate,
            "email": this.state.email,
            "name": this.state.name,
            "password": this.state.email,
            "personalCode": this.state.personalCode,
            "phone": this.state.phone,
            "role": this.state.role,
            "surname": this.state.surname,
            "username": this.state.email
        })
            .then((response) => {
                console.log("Naujas naudotojas sukurtas");
                console.log(this.state);
                console.log(response);
                swal({
                    text: "Naujas naudotojas buvo sėkmingai sukurtas.",
                    button: "Gerai"
                }).then(() => {
                    this.props.history.push("/new")
                    this.props.history.replace("/admin")
                }
                    // function refreshWindow() {
                    //     window.location.reload();
                    // }
                )
            })
            .catch((error) => {
                console.log(error);
                swal({                   
                    text: error.response.data,                   
                    button: "Gerai"
                })
            })

    }

    render() {
        return (
            <div >
                <h6 className="py-3"><b>Naujo naudotojo sukūrimas</b></h6>
                <form onSubmit={this.handleSubmit}>
                    {this.drawSelector()}
                    {this.drawForm(this.state.role)}
                    <h6 className="py-3"><b>Naudotojo prisijungimai</b></h6>

                    <div className="row">
                        <div className="col-7">
                            <p><b>Naudotojo vardas</b></p>
                        </div>
                        <div className="col-6">
                            <p>{this.state.email}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <p><b>Slaptažodis</b></p>
                        </div>
                        <div className="col-6">
                            <p>{this.state.email}</p>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-outline-danger float-left" onClick={this.resetState} id="btnClean">Išvalyti</button>
                        <button type="submit" className="btn btn-primary float-right" id="btnCreate">Sukurti</button>
                    </div>
                </form>

            </div>
        )
    }
}

export default withRouter(AdminCreateUser)