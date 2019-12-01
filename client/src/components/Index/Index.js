import React, { Component } from "react";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Container, Row } from "../components/Grid";
import {Mainheading} from "../components/Mainheading"

class Index extends Component {
  state = {
    bookhotels: [],
    owner_name: "",
    pet_name: "",
    select_pet: "",
    select_pet_size:"",
    select_date_from: "",
    select_date_to: "",
    pet_count:  0,
    days: 0,
    price: 0,
    total_price: 0,
    booking_status: " ",
  };

  componentDidMount() {
    this.loadBookhotels();
  }

  loadBookhotels = () => {
    API.getBookhotels()
      .then(res =>
        this.setState({ 
            bookhotels: res.data, 
            owner_name: "", 
            pet_name: "", 
            select_pet: "",
            select_pet_size:"",
            select_date_from: "",
            select_date_to: "",
            pet_count:  0,
            days: 0,
            price: 0,
            total_price: 0,
            booking_status:""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBookhotel = id => {
    API.deleteBookhotel(id)
      .then(res => this.loadBookhotels())
      .catch(err => console.log(err));
  };

 

  render() {
    return (
      <div>
      <Navadmin />
      <Container fluid>
      
        <div  className="row admin-content-box py-5 admin-booking">
         
          <Col size=" sm-12">
            <Mainheading color="dark">Booking List</Mainheading>
           
            {this.state.bookhotels.length ? (
              <ul>
                {this.state.bookhotels.map(bookhotel => (
                <li key={bookhotel._id}>
                    <Row>
                      <Col size="sm-4">
                      <p><strong>Owner Name :</strong> {bookhotel.owner_name}</p>
                      <p><strong>Pet Nick Name :</strong> {bookhotel.pet_name}</p>
                      <p><strong>Pet Name :</strong> {bookhotel.select_pet}</p>
                      <p><strong>Pet Size :</strong> {bookhotel.select_pet_size}</p>
                      
                      </Col>
                      <Col size="sm-4">
                      <p><strong>Start Booking Date :</strong> {bookhotel.select_date_from}</p>
                      <p><strong>End Booking Date :</strong> {bookhotel.select_date_to}</p>
                      <p><strong>No of Pets :</strong> {bookhotel.pet_count}</p>
                      <p><strong>No of Days :</strong> {bookhotel.days}</p>
                      </Col>
                      <Col size="sm-4">
                     
                      <p><strong>Price per pet :</strong> {bookhotel.price}</p>
                      <p><strong>Total Price :</strong> {bookhotel.total_price}</p>
                      <p><strong>Booking Status :</strong> {bookhotel.booking_status}</p>
                      <button onClick={() => this.deleteBookhotel(bookhotel._id)} type="button" className="btn btn-theme-danger">
                        Delete Record
                      </button>
                      </Col>
                    </Row>
                    
                   
   

                    {/* <Link to={"/bookhotels/" + bookhotel._id} className="btn btn-theme">
                       Update Bookhotel
                    </Link> */}
                   
                  </li>
                ))}
              </ul>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
         
        </div>
       
      </Container>
      </div>
    );
  }
}

export default Index;
