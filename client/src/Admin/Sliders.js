import React, { Component } from "react";
import API from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Mainheading } from "../components/Mainheading"
import axios from 'axios';

class Sliders extends Component {
  state = {
    sliders: [],
    title: "",
    description: "",
    linkTo: "",
    image: "",
    success:"none",
    danger:"none",

    file: "",
    filename:"Choose File",
    uploadedFile:"",
    message:"",
    messagestatus:"none",
    messagestatusclass:"",
    post_image: "",

    redirect: false
  };

  componentDidMount() {
    this.loadSliders();
    // this.loadImage();
  }

  loadImage = () => {
    API.getImages()
    .catch(err => console.log(err))
    .then(({data}) => {
      if (!data) {
        return console.log("Data not found");
        } else {
          return (
          data[0].url,
          this.setState({ image: data[0].url }),
          this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
          )      
        }
    });
  };

  

  loadSliders = () => {
    API.getSliders()
      .then(res =>
        this.setState({ sliders: res.data, title: "", description: "", linkTo: "",date: "", filename: "Choose File",messagestatus:"none"  })
      )
      .catch(err => console.log(err));
  };

  deleteSlider = id => {
    API.deleteSlider(id)
      .then(res => this.loadSliders())
      .catch(err => console.log(err));
  };
  

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault(); 
    if (this.state.title && this.state.description) {
      console.log(this.state);
      API.saveSlider({
        title: this.state.title,
        description: this.state.description,
        image: this.state.image,
        linkTo: this.state.linkTo
      })
        .then(res => {
          this.setState({success:"block", danger:"none", redirect: true})
          this.loadSliders()
        })
        .catch(err => console.log(err));
    }else{
      this.setState({danger:"block", success:"none"})
    }
  };
  onChangeUpload = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
    this.setState({file:e.target.files[0]});
    this.setState({filename:e.target.files[0].name});
  };
  
  onSubmit = async e => {
    e.preventDefault();
   
    this.setState({messagestatus: "block"});
    const formData = new FormData();
    formData.append('file', this.state.file );

    try{
      const res=await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => this.setState({image: res.data.url})); 

      this.setState({fileName: res.data.fileName, filePath: res.data.filePath});
      this.setState({uploadedFile: res.data.fileName + res.data.filePath});
      this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
    } catch(err){
      if(err){
        console.log(err)
      }else{
        this.setState({message : err.response.data.msg, messagestatusclass: "danger"})
      }
    }
    
  }

  
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to ='/admin/slider' />;
    }

    const styles = {
      textStyle: {
        color: "#000000"
      },
      imgStyleSm: {
        width: "250px",
        height: "250px",
        margin: "auto",
        alignContent: "middle",
        marginBottom: "2%"
      }
    }
    return (
      <div>
      <Container fluid>
        <div  className="row admin-content-box py-5">
          <Col size="md-6">
            <Mainheading color="dark">Add slider</Mainheading>
            <div className="form-outer">
            <form>
              <label>Current Slider Photo</label>
              <br />
              <img src={this.state.image ? this.state.image :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article: ${this.state.title}`} style={styles.imgStyleSm} />
              <br />
              <label>Slider Title</label>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Slider Title (required)"
              />

              <label>Description</label>
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder=" "
              />

              <label>Link To</label>
              <TextArea
                value={this.state.linkTo}
                onChange={this.handleInputChange}
                name="linkTo"
                placeholder=" "
              />
              <br />
              <label>Upload Image</label>
            <div className={`alert alert-${this.state.messagestatusclass} alert-dismissible`} style={{display: this.state.messagestatus}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              {this.state.message}
            </div>

              
              <>
                <div className='custom-file'>
                  <input
                    type='file'
                    className='custom-file-input'
                    name="post_image"
                    id='customFile'
                    onChange={this.onChangeUpload}
                    value={this.state.post_image}
                  />
                <label className='custom-file-label' htmlFor='customFile'>
                  {this.state.filename}
                </label>
              </div>
              <input
                type='submit'
                value='Upload'
                className='btn btn-primary btn-block mt-4'
                onClick={this.onSubmit}
              />
              </>

              <br />
              <FormBtn 
                onClick={this.handleFormSubmit}
                disabled={!(this.state.title && 
                this.state.image &&
                this.state.description)}
                >
               Add Slider
              </FormBtn>

            </form>
            <div className="alert alert-success alert-dismissible" style={{display: this.state.success}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
               Slider is added Successfully.
            </div>
            <div className="alert alert-danger alert-dismissible"  style={{display: this.state.danger}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              Please Complete the form before Submission.
            </div>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Mainheading color="dark">Most Recent Slider List</Mainheading>
            
            {this.state.sliders.length ? (
              <List>
                {this.state.sliders.map(slider => (
                <ListItem key={slider._id}>
                    <h5 style={styles.textStyle}><strong>News Title: </strong> {slider.title}</h5>
                    <p style={styles.textStyle}><strong>Description: </strong> {slider.description}</p>
                    <p style={styles.textStyle}><strong>Link To: </strong> {slider.linkTo}</p>
                    <p style={styles.textStyle}><strong>Date: </strong> {slider.date.slice(0, 10)}</p>
                    <p className="image-url-news" style={styles.textStyle}><strong>Image Url : </strong><span>{slider.image}</span></p>

                      
                    <Link to={"/sliders/" + slider._id} className="btn btn-theme">
                       Update Slider
                    </Link>
                    <button onClick={() => this.deleteSlider(slider._id)} type="button" className="btn btn-theme-danger">
                        Delete Slider
                    </button>
                  </ListItem>
                ))}
              </List>
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

export default Sliders;