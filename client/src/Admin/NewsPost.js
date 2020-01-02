import React, { Component } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Navadmin from "../components/Navadmin";
// import {Mainheading} from "../components/Mainheading"
// import FileUpload from '../components/FileUpload';
import axios from 'axios';
// import { Cloud9 } from "aws-sdk";
import { userInfo } from "os";

class NewsPost extends Component {
  state = {
    posts: [],
    news_title: "",
    category: "",
    description: "",
    news_body: "",
    date:"",
    post_image:"",
    success:"none",
    danger:"none",
    image_url: "",

    file: "",
    filename:"Choose File",
    uploadedFile:"",
    message:"",
    messagestatus:"none",
    messagestatusclass:"",

    clicked: false
  };

  componentDidMount() {
    this.loadPosts();
    this.loadImage();
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
          this.setState({ image_url: data[0].url }),
          this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
          )      
        }
     // this.setState({ image_url: data[0].url })
    });
  };

  // handleClicked = () => this.state.clicked ? this.loadImage : null
  

  loadPosts = () => {
    API.getPosts()
      .then(res =>
        this.setState({ posts: res.data, news_title: "", category: "", description: "",date: "", filename: "Choose File",messagestatus:"none"  })
      )
      .catch(err => console.log(err));
  };

  deletePost = id => {
    API.deletePost(id)
      .then(res => this.loadPosts())
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
    console.log(this.state)   
    if (this.state.news_title && this.state.category && this.state.description && this.state.image_url && this.state.clicked) {
      API.savePost({
        news_title: this.state.news_title,
        category: this.state.category,
        description: this.state.description,
        news_body: this.state.news_body,
        image_url: this.state.image_url
      })
        .then(res => {
          this.setState({success:"block", danger:"none"})
          this.loadPosts()
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
    // // date time
    // var today = new Date();
    // var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
    // var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
    // var dateTime = date+''+time;
    // console.log(dateTime);
    // // date time end
    formData.append('file', this.state.file );

    try{
      const res=await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => this.setState({image_url: res.data.url }));      
      this.setState({fileName: res.data.fileName, filePath: res.data.filePath});
      this.setState({uploadedFile: res.data.fileName + res.data.filePath});
      this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
      this.setState({clicked: true});
    } catch(err){
      if(err){
        console.log(err)
      }else{
        this.setState({message : err.response.data.msg, messagestatusclass: "danger"})
      }
    }
    
  }

  
  render() {
    return (
      <div>
      <Navadmin />
      <Container fluid>
        <div  className="row admin-content-box py-5">
          <Col size="md-6">
            {/* <Mainheading color="dark">Add Post</Mainheading> */}
            <div className="form-outer">
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
                <option value="Cosplay">Cosplay/Lifestyle</option>
                <option value="Gaming">Gaming</option>
                <option value="Convention">Convention</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Tech/Science">Tech/Science</option>
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
                name="description"
                placeholder=" "
              />
              <label>Upload Image</label>
              {/* <div className="form-group">
                <input 
                  type="file" 
                  className="form-control-file border" 
                  name="post_image"
                  value={this.state.post_image}
                  onChange={this.handleInputChange}
                />
              </div> */}
              {/* <FileUpload 
                type={"file"}
                name={"post_image"}
                value={this.state.post_image}
                onChange={this.handleInputChange}
              /> */}

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
              
              {/* { this.state.uploadedFile ? 
              <div>
                <h5 className="text-center">Image uploaded Successfully </h5>
                <p>{this.state.fileName}</p>
                <img  src={this.state.filePath} alt="path"/>
              </div>: " "
              } */}

              </>


              <FormBtn onClick={this.handleFormSubmit} >
               Add Post
              </FormBtn>

            </form>
            <div className="alert alert-success alert-dismissible" style={{display: this.state.success}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
               Post is added Successfully.
            </div>
            <div className="alert alert-danger alert-dismissible"  style={{display: this.state.danger}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              Please Complete the form before Submition 
            </div>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            {/* <Mainheading color="dark">Post List</Mainheading> */}
            
            {this.state.posts.length ? (
              <List>
                {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h5><strong>News Title : </strong> {post.news_title}</h5>
                    <h6><strong>Category : </strong> {post.category}</h6>
                    <p><strong>Description : </strong> {post.description}</p>
                    <p><strong>News Body : </strong> {post.news_body}</p>
                    <p><strong>Date : </strong> {post.date}</p>
                    <p className="image-url-news"><strong>Image Url : </strong><span>{post.image_url}</span></p>

                      
                    <Link to={"/articles/" + post._id} className="btn btn-theme">
                       Update Post
                    </Link>
                    <button onClick={() => this.deletePost(post._id)} type="button" className="btn btn-theme-danger">
                        Delete Post
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

export default NewsPost;