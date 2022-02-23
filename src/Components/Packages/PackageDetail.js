import React from 'react';
import { ReactComponent as OkIcon } from '../../assests/ok.svg'
import Sidebar from '../Sidebar';
import axios from 'axios';
import { message, notification } from 'antd';

class PackageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            packageType: "",
            price: "",
            free: "",
            options: [],
            errorMessage: null,
            data: null
        }
    }

    componentDidMount() {
        const link = "package/" + this.props.match.params._id
        axios.get(link)
            .then(response => {
                this.setState({
                    name: response.data.packageFound.name,
                    price: response.data.packageFound.price,
                    options: response.data.packageFound.options,
                    packageType: response.data.packageFound.packageType,
                });

            })
            .catch(function (error) {
                message.error(error);
            });
    }
    render() {
        const RenderFree = this.state.options.map((servicemap) => {
            return (
                <>
                    <table >
                        <tr>
                            <td><OkIcon /></td>
                            <td><input value={servicemap} readOnly className="col-12 border-0 fillColor px-md-5 px-1 py-2" /></td>
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
                                <input value={this.state.name} readOnly className="col-12 fillColor px-md-5 px-1 py-2" />
                            </div>
                            <div className=' col-12 mt-2'>
                                <select readOnly className="col-12 fillColor px-md-5 px-1 py-2">
                                    <option value="">{this.state.packageType}</option>
                                </select>
                            </div>
                            <div className=' col-12 mt-2'>
                                <input value={this.state.price} readOnly className="col-12 fillColor px-md-5 px-1 py-2" />
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
                {this.state.errorMessage !== null &&
                    notification['error']({
                        message: 'Error',
                        description: this.state.errorMessage,
                        placement: 'bottomLeft'
                    })
                }
            </>

        )
    }
}

export default PackageDetail;