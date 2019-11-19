import React, { Component } from 'react';
import {Redirect} from 'react-router';
import './Properties.css';
import {BASE_URL} from './../../components/Configs/Configs.js';
import axios from 'axios';
import {Link} from 'react-router-dom';
class Properties extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           propertiesList : []
         }
         this.showBooking = this.showBooking.bind(this);
    }

    componentDidMount(){
        // axios.get(`${BASE_URL}/properties`,)
        // .then((response) => {
        //        this.setState({hackathonlist:response.data})
        // });
        var list = [
            {headline: "nice suit", address: 'san jose', startdate: 11/12/19, enddate: 11/12/19, price: 20},
            {headline: "beautiful place", address: 'san bruno', startdate: 11/12/19, enddate: 11/12/19, price: 20},
            {headline: "wonderful house", address: 'santa clara', startdate: 11/12/19, enddate: 11/12/19, price: 20}
        ];
        this.setState({propertiesList:list})
    }
    showBooking = (ID ,e) => {
        console.log("ID : " + ID);  
        e.preventDefault();
    //     this.props.showBookingPage(ID, () => {
    //         this.setState({
    //             redirectVar : <Redirect to= "/traveler/booking"/>
    //   })
    //       // this.props.history.push("/traveler/booking");
    //   });
  }
    render() { 
        console.log(this.state.propertiesList);
        // if(this.state.propertiesList != null) {
            let propDetails = this.state.propertiesList.map(propertyItem => {
                return (
                    <div className="prop">
                    <div class="row">
                    <div class="col-sm-5" className="backColor5_list">                  
                    {/* <img src={propertyItem.photos} className="mediao"/> */}
                    </div>
                    <div class="col-sm-7" className="backColor_dash_list">  
                    <p className="headline_list"><Link to="/booking" onClick = {this.showBooking.bind(this, propertyItem._id)}>{propertyItem.headline}</Link></p>                   
                    <ul class="list-inline">
                    <li>Address : {propertyItem.address}</li> 
                    <li>StartDate : {propertyItem.startdate}</li>
                    <li>EndDate : {propertyItem.enddate}</li>                
                    </ul>
                    <br/>
                    <ul class="list-inline">
                    <li>Price : ${propertyItem.price} per night</li>
                    </ul>
                    </div>
                    </div>
                    </div>              
                  );
        });    
    // }
    return (
        <div>
            <div className="noresult">
                <h>{this.state.propertiesList.length} RESULTS FOUND</h></div>
                {/* <div className="prop_pagi">
                <nav aria-label="Page navigation example">
                <ul class="pagination">
                {showPageNumbers1}
                </ul>
                </nav>
                </div> */}
                <div>
                    {propDetails}
                </div>
                {/* <ul class="pagination">
                {showPageNumbers1}
                </ul> */}
            <div></div>
        </div>
    );
}
}
export default Properties;