import React, { Component, Fragment } from "react";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Navadmin from "../components/Navadmin";
// import FileUpload from '../components/FileUpload';
import axios from 'axios';
import { Cloud9 } from "aws-sdk";
import { userInfo } from "os";

class NewsPost extends Component {
  state = {
    posts: [],
    news_title: "",
    category: "",
    description: "",
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

//   onChangeHandler = event => {
//     // console.log(event.target.files[0]);
//     // const {lastModified, lastModifiedDate, name, size, type} = event.target.files[0];
//     const img = event.target.files[0];
//     img.src = URL.createObjectURL(img)
//     console.log(img.src);
//     // this.setState({
//     //   lastModified: lastModified,
//     //   lastModifiedDate: lastModifiedDate,
//     //   name: name,
//     //   size: size,
//     //   type: type
//     // })
//   }

// //   onClickHandler = () => {
// //     const data = new FormData()
// //     data.append('file', this.state.selectedFile)
// //     // if (this.state.lastModified && this.state.lastModifiedDate && this.state.name && this.state.size && this.state.type) {
// //     // API.postImage({
// //     //   lastModified: this.state.lastModified,
// //     //   lastModifiedDate: this.state.lastModifiedDate,
// //     //   name: this.state.name,
// //     //   size: this.state.size,
// //     //   type: this.state.type
// //     // })
// //     //   .then(res => {
// //     //     console.log(res);
// //     //   })
// //     //   .catch(err => console.log(err));
// //   // }
// //   axios.post('/img_data', data, {
// //     // Nothing happens here?
// //   })
// //     .then(res => console.log(res.statusText))
// //     .catch(err => console.log(err))
// // }
  loadImage = () => {
    API.getImages()
    .then(({data}) => {
      if (data) {
        console.log(data[0].url)
        return (
        data[0].url,
        this.setState({ image_url: data[0].url }),
        this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
        )      
        } else {
        return null;
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
    if (this.state.news_title && this.state.category && this.state.description && this.state.image_url) {
      API.savePost({
        news_title: this.state.news_title,
        category: this.state.category,
        description: this.state.description,
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

  // saveImage = () => {
  //   axios.post('upload', {
  //     name: user.name,
  //     url: response.url
  //   })
  //     .then(res => {
  //       this.setState({success:"block", danger:"none"})
  //     })
  //     .catch(err => console.log(err));
  // }
  
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
      // const { fileName, filePath } = res.data;
      // console.log(res.data);
      
      this.setState({fileName: res.data.fileName, filePath: res.data.filePath});
      // setUploadedFile({ fileName, filePath });
      this.setState({uploadedFile: res.data.fileName + res.data.filePath});
      this.setState({message : "File Uploaded Successfully", messagestatusclass: "success"})
      // this.setState({clicked: true});
    } catch(err){
      if(err){
        console.log(err)
        // console.log("Server error")
        //this.setState({message : "Server error", messagestatusclass: "danger"})
      }else{
        // console.log(err.response.data.msg)
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
                <option value="Announcement">Announcement</option>
                <option value="News">News</option>
              </select>
              <br/>

              <label>Description</label>
              <TextArea
                value={this.state.description}
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

              
              <Fragment>
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

              </Fragment>


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
            
            {this.state.posts.length ? (
              <List>
                {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h5><strong>News Title : </strong> {post.news_title}</h5>
                    <h6><strong>Category : </strong> {post.category}</h6>
                    <p><strong>Description : </strong> {post.description}</p>
                    <p><strong>Date : </strong> {post.date}</p>
                    <p className="image-url-news"><strong>Image Url : </strong><span>{post.image_url}</span></p>

                      
                    <Link to={"/posts/" + post._id} className="btn btn-theme">
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
