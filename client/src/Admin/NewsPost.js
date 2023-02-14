import React, { Component } from "react";
import API from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { Col, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Mainheading } from "../components/Mainheading";
import axios from 'axios';

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

  };

  componentDidMount() {
    this.loadPosts();
    this.props.userInfo ? this.setState({ author: this.props.userInfo.name, author_photo: this.props.userInfo.picture }) : console.log(`User not logged in...?\nProps Details: ${this.props.userInfo}`);
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
    });
  };

  loadPosts = () => {
    API.getPosts()
      .then(res =>
        !res ? this.setState({ posts: [], news_title: "", category: "", description: "",date: "", filename: "Choose File", messagestatus:"none"  }) : this.setState({ posts: res.data, news_title: "", category: "", description: "",date: "", filename: "Choose File", messagestatus:"none"  })
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
    if (this.state.news_title && this.state.category && this.state.description) {
      API.savePost({
        news_title: this.state.news_title,
        category: this.state.category,
        description: this.state.description,
        news_body: this.state.news_body,
        image_url: this.state.image_url,
        video_src: this.state.video_src,
        tags: this.state.tags,
        author: this.props.userInfo.name,
        author_photo: this.props.userInfo.picture
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
  
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to ='/admin/news' />;
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
            <Mainheading color="dark">Add Post</Mainheading>
            <div className="form-outer">
            <form>
              <label>Current Article Photo</label>
              <br />
              <img src={this.state.image_url ? this.state.image_url :"https://placehold.it/128x197?text=No%20Preview"} alt={`Article: ${this.state.news_title}`} style={styles.imgStyleSm}/>
              <br />
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
               Add Post
              </FormBtn>

            </form>
            <div className="alert alert-success alert-dismissible" style={{display: this.state.success}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
               Post is added Successfully.
            </div>
            <div className="alert alert-danger alert-dismissible"  style={{display: this.state.danger}}>
              <button type="button" className="close" data-dismiss="alert">&times;</button>
              Please Complete the form before Submission.
            </div>
            </div>
          </Col>
          <Col size="md-6 sm-12">
            <Mainheading color="dark">Post List</Mainheading>
            
            {this.state.posts.length ? (
              <List style={{"height": "50%"}}>
                {this.state.posts.map(post => (
                <ListItem key={post._id}>
                    <h5 style={styles.textStyle}><strong>News Title: </strong> {post.news_title}</h5>
                    <h6 style={styles.textStyle}><strong>Category: </strong> {post.category}</h6>
                    <p style={styles.textStyle}><strong>Description: </strong> {post.description}</p>
                    <p style={styles.textStyle}><strong>News Body: </strong> {post.news_body}</p>
                    <p style={styles.textStyle}><strong>Tags: </strong> {post.tags}</p>
                    <p style={styles.textStyle}><strong>Date: </strong> {post.date.slice(0, 10)}</p>
                    <p className="image-url-news" style={styles.textStyle}><strong>Image Url : </strong><span>{post.image_url}</span></p>

                      
                    <Link to={"/articles/" + post._id} className="btn btn-primary">
                       Update Post
                    </Link>
                    <button onClick={() => this.deletePost(post._id)} type="button" className="btn btn-danger">
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