import React,{Component} from "react";
import './ListProperty.css';
import Location from "./Location";
import Description from "./Description";
import Amenities from "./Amenities";
import AddPhotos from "./AddPhotos";
import Pricing from "./Pricing";
import axios from "axios";
// import cookies from "react-cookies";
import Redirect from "react-router-dom/es/Redirect";

class ListProperty extends Component {
    constructor(props)
    {
        super(props);

        this.state = {
        }

        this.submit = this.submit.bind(this);
        this.addFormData = this.addFormData.bind(this);
    }

    async addFormData(formData) {

        formData.append('data',JSON.stringify(this.state));
        console.log(`Appended formdatat ${formData}`);
        return formData;
    }

    async addFiles(formData){
        const data = Object.assign({}, this.state);
        for (var key in data.files) {
            console.log(`Appending photos to form data ${key}`);
            formData.append('files', data.files[key]);
        }
        return formData;
    }

    async submit(e)
    {

        let formData = new FormData();

        let test1 = await this.addFormData(formData);

        let test2 = await this.addFiles(test1);

        // Display the key/value pairs
        for (var pair of test2.entries()) {
            console.log(pair[0]+ ', ' + pair[1]);
        }


        axios.post('http://localhost:8080/uploadFile', test2)
            .then((result) => {
                alert("Sending property");
                if(result.status === 200 && result.data === 'Successfully uploaded Property') {
                    alert('Property Uploaded Successfully');
                    this.setState({uploaded : true});
                }
            });

    }

    render() {


       return (
                    <div>
                        <div className="d-flex flex-column">
                            <div className="container">
                                <div className="row">
                                    <div className="GreyTabs col-4">
                                        <ul className="nav nav-pills flex-column">
                                            <li className="nav-item"><a className="active nav-link" href="" data-toggle="pill"
                                                                        data-target="#details">Details</a></li>
                                            <li className="nav-item"><a href="" className="nav-link"
                                                                        data-toggle="pill"
                                                                        data-target="#location">Location</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#amenities">Amenities</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#photos">Photos</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#pricing">Pricing</a></li>
                                            <li className="nav-item"><a href="" className="nav-link" data-toggle="pill"
                                                                        data-target="#payments">Submit Property</a></li>
                                        </ul>
                                    </div>
                                    <div className="col-8">
                                        <div className="tab-content">
                                            <div className="tab-pane fade" id="location" role="tabpanel">
                                                <Location
                                                    setProps={(key,value) => this.setState({ [key] : value} ) } />
                                            </div>
                                            <div className="tab-pane fade show active" id="details" role="tabpanel">
                                                <Description
                                                    setProps={(key,value) => this.setState({ [key] : value} ) } />
                                            </div>
                                            <div className="tab-pane fade" id="amenities" role="tabpanel">
                                                <Amenities
                                                    setProps={(key,value) => this.setState({ [key] : value} ) } />
                                            </div>
                                            <div className="tab-pane fade" id="photos" role="tabpanel">
                                                <AddPhotos setProps={(key,value) => this.setState({ [key] : value} ) } />
                                            </div>
                                            <div className="tab-pane fade" id="pricing" role="tabpanel">
                                                <Pricing setProps={(key,value) => this.setState({ [key] : value} ) } />
                                            </div>
                                            <div className="tab-pane fade" id="payments" role="tabpanel">
                                                <input type="checkbox" name="vehicle1" value="Bike"/> I hereby
                                                acknowledge
                                                that I have read, understand and agree to
                                                the terms of this leasing relating to Homeaway and
                                                payment of my services. <br></br>
                                                <button type="button" className="btn btn-primary"
                                                        onClick={(e) => this.submit(e)}>Submit the Property
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
}

export default ListProperty;