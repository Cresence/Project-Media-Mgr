import React, { Component } from "react";
import { Col, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import axios from "axios";
import { Redirect } from 'react-router-dom';

class Detail extends Component {
  state = {
    news_title: "",
    category: "",
    description: "",
    news_body: "",
    date:"",
    post_image:"",
    success:"none",
    danger:"none",
    image_url: "",
    author: "",
    author_photo: "",
    video_src: "",
    tags: "",

    file: "",
    filename:"Choose File",
    uploadedFile:"",
    message:"",
    messagestatus:"none",
    messagestatusclass:"",

    redirect: false
  };
  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    API.getPost(this.props.match.params.id)
    .then(res => this.setState({ 
      news_title: res.data.news_title,
        category: res.data.category,
        description: res.data.description,
        news_body: res.data.news_body,
        image_url: res.data.image_url,
        author: res.data.author,
        author_photo: res.data.author_photo,
        tags: res.data.tags,
        video_src: res.data.video_src
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
      }).then(res => this.setState({image_url: res.data.url})); 

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
      API.updatePost(this.props.match.params.id, {
        news_title: this.state.news_title,
        category: this.state.category,
        description: this.state.description,
        news_body: this.state.news_body,
        image_url: this.state.image_url,
        author: this.state.author,
        author_photo: this.state.author_photo,
        tags: this.state.tags,
        video_src: this.state.video_src
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
            <img src={this.state.image_url ? this.state.image_url :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article (Mini): ${this.state.news_title}`} style={styles.imgStyleSm} data-toggle="modal" data-target="#myModal" />
            {/* Modal */}
            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                {/* Modal content */}
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
      
                  <div className="modal-body">
                    <img src={this.state.image_url ? this.state.image_url :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article (Full): ${this.state.news_title}`} style={styles.imgStyleLg} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>

            <form>
              <label>News Title</label>
              <Input
                value={this.state.news_title}
                onChange={this.handleInputChange}
                name="news_title"
                placeholder="News Title (required)"
              />
             <label>Select Category</label>
              <select className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleInputChange}>
                <option value="">Select</option>
                <option value="Show Archive">Show Archive</option>
                <option value="Cosplay-Lifestyle">Cosplay/Lifestyle</option>
                <option value="Gaming">Gaming</option>
                <option value="Convention">Convention</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Tech-Science">Tech/Science</option>
              </select>
              <br/>

              <label>Description</label>
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder=" "
              />

              <label>News Body</label>
              <TextArea
                value={this.state.news_body}
                onChange={this.handleInputChange}
                name="news_body"
                placeholder=" "
              />
              <br />
                  
              <label>Video Source (If Applicable)</label>
              <TextArea
                value={this.state.video_src}
                onChange={this.handleInputChange}
                name="video_src"
                placeholder="Only use the embedded video link from website (E.g., Youtube, Facebook, Twitch)"
              />
              <br />
                  
              <label>Tags</label>
              <TextArea
                value={this.state.tags}
                onChange={this.handleInputChange}
                name="tags"
                placeholder="Separate tags by comma (E.g., food, travel, games, cosplay, etc...)"
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
                disabled={!(this.state.news_title && 
                this.state.category &&
                this.state.description &&
                this.state.news_body)}
                >
               Update Post
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
