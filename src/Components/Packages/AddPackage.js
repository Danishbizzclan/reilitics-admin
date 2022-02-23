import React from 'react';
import { ReactComponent as PlusIcon } from '../../assests/plus.svg'
import { ReactComponent as OkIcon } from '../../assests/ok.svg'
import cross from '../../assests/cross.png'
import Sidebar from '../Sidebar';
import axios from 'axios';
import { message } from 'antd';

class AddPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            packageType: "",
            price: "",
            free: "",
            options: [],
        }
        this.onHandleChange = this.onHandleChange.bind(this);
    }

    onHandleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    FreeService = () => {
        if (this.state.free !== "") {
            const random = Math.floor(100000 + Math.random() * 900000);
            const newService = {
                serviceid: random,
                free: this.state.free,
            }
            this.state.options.push(newService)
            this.setState({
                free: "",
            })
        }
    }

    removeFreeService(e) {
        let myArr = this.state.options.filter(function (item) {
            return item.serviceid !== e;
        });
        this.setState({ options: myArr })
    }
    validate() {
        let nameError = "";
        let packageTypeError = "";
        let priceError = "";
        if (!this.state.name) {
            nameError = "Name is required";
        }
        if (!this.state.packageType) {
            packageTypeError = "Package Type is required";
        }
        if (!this.state.price) {
            priceError = "Price field is required";
        }
        if (nameError || packageTypeError || priceError ) {
            this.setState({ nameError, packageTypeError, priceError });
            return false;
        }
        return true;
    }
    SubmitPackage = () => {
        if (this.validate()) {
            var result = this.state.options.map(a => a.free);
            const link = "package"
            axios.post(link,
                {
                    name: this.state.name,
                    packageType: this.state.packageType,
                    price: this.state.price,
                    options: result
                })
                .then((res) => {
                    if (res.data.success === true) {
                        message.success('Package Added Successfully')
                        window.location = "/packages"
                    }
                    else {
                        message.error(res.data.message)
                    }
                })
        }
    }

    render() {
        const RenderFree = this.state.options.map((servicemap) => {
            return (
                <>
                    <table >
                        <tr>
                            <td><OkIcon /></td>
                            <td><input value={servicemap.free} readOnly className="col-12 border-0 fillColor px-md-5 px-1 py-2" /></td>
                            <td><button className="btn" style={{ marginTop: '4px' }} type="button" onClick={() => this.removeFreeService(servicemap.serviceid)}> <img src={cross} alt="" width="25px" height="25px" ></img> </button></td>
                        </tr>
                    </table>
                </>
            )
        })

        return (
            <>
                <Sidebar />
                <div className='content pt-5'>
                    <div className='displayFlex '>
                        <div className='displayFlex ml-2'>
                            <h6 className='mr-auto font-weight-bold'>Packages & Pricing</h6>
                        </div>
                    </div>
                    <div className="col-12 my-3 row mx-0">
                        <div className='col-md-6 col-12 mx-auto'>
                            <div className=' col-12 mt-2'>
                                <input placeholder="Name"
                                    value={this.state.name}
                                    required
                                    name="name"
                                    onChange={this.onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{this.state.nameError}</span>
                            </div>
                            <div className=' col-12 mt-2'>
                                <select name="packageType" onChange={this.onHandleChange} className="col-12 fillColor px-md-5 px-1 py-2">
                                    <option value="">Package Type</option>
                                    <option value="Free">Free</option>
                                    <option value="Paid">Paid</option>
                                </select>
                                <span className="text-danger">{this.state.packageTypeError}</span>
                            </div>
                            <div className=' col-12 mt-2'>
                                <input placeholder="Price"
                                    type="number"
                                    required
                                    value={this.state.price}
                                    name="price"
                                    onChange={this.onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <span className="text-danger">{this.state.priceError}</span>
                            </div>
                            <div className=' col-12 mt-2'>
                                <input placeholder="Option"
                                    required
                                    value={this.state.free}
                                    name="free"
                                    onChange={this.onHandleChange}
                                    className="col-12 fillColor px-md-5 px-1 py-2" />
                                <div className=" col-12">
                                    <button type="button" className="btn d-block mx-auto White outline" onClick={this.FreeService}><PlusIcon /> </button>
                                </div>
                            </div>
                            <div className='col-md-12 mt-2 px-0'>
                                <button onClick={this.SubmitPackage} className="White Radius8 p-2 d-block mx-auto">
                                    Add Package
                                </button>
                            </div>
                        </div>
                        <div className='col-md-5 col-12 mx-auto'>
                            <h6 className='text-center font-weight-bold'>Options</h6>
                            {this.state.options?.length > 0 ?
                                <div className='text-center'>
                                    {RenderFree}
                                </div> :
                                <p className='text-center'>No Options Added Yet</p>
                            }
                        </div>
                    </div>
                </div>
            </>

        )
    }
}

export default AddPackage;