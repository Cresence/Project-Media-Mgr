import React, { Component } from "react";
import { Col, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class Detail extends Component {
  state = {
    title: "",
    description: "",
    linkTo: "",
    image: "",

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
  }

  loadSliders = () => {
    API.getSlider(this.props.match.params.id)
    .then(res => this.setState({ 
        title: res.data.title,
        description: res.data.description,
        linkTo: res.data.linkTo,
        image: res.data.image,
     }))
    .catch(err => console.log(err));
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.news_title && this.state.category && this.state.description ) {
      API.updateSlider(this.props.match.params.id, {
        title: this.state.title,
        description: this.state.description,
        image: this.state.image,
        linkTo: this.state.linkTo
      })
        .then(res =>  this.setState({ redirect: true }))
        .catch(err => console.log(err));
    }
  };
  render() {
    const styles = {
      textStyle: {
        color: "#000000"
      },
      imgStyleSm: {
        width: "250px",
        height: "250px",
        margin: "auto",
        alignContent: "middle",
      },
      imgStyleLg: {
        height: "100%",
        // eslint-disable-next-line
        width: "100%",
        margin: "auto",
        alignContent: "left"
      }
    }

    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to ='/admin/news' />;
    }

    return (
      <div>
      <Container fluid>
        <div className="row admin-content-box py-5">
          <Col size="md-3"></Col>
          <Col size="md-6">
            <div className="form-outer">
            <label>Current Article Photo</label>
            <br />
            <img src={this.state.image ? this.state.image :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article (Mini): ${this.state.news_title}`} style={styles.imgStyleSm} data-toggle="modal" data-target="#myModal" />
            {/* Modal */}
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                {/* Modal content */}
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
      
                  <div className="modal-body">
                    <img src={this.state.image ? this.state.image :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article (Full): ${this.state.news_title}`} style={styles.imgStyleLg} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <form>
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
               Update Slider
              </FormBtn>

            </form>
            </div>
          </Col>
          <Col size="md-3"></Col>
        </div>
      </Container>
      </div>
    );
  }
}

export default Detail;
