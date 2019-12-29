import React, { Component } from "react";
import { Col, Container } from "../components/Grid";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API";
import Navadmin from "../components/Navadmin";
import {Mainheading} from "../components/Mainheading"
class Detail extends Component {
  state = {
    post: {},
    news_title: "",
    category: "",
    description: "",
    date:"",
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
      
     }))
    .catch(err => console.log(err));
  }
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.news_title && this.state.category && this.state.description ) {
      API.updatePost(this.props.match.params.id, {
        news_title: this.state.news_title,
        category: this.state.category,
        description: this.state.description,
        post_image: this.state.post_image,
      })
        .then(res =>  window.location.href='/admin/news')
        .catch(err => console.log(err));
    }
  };
  render() {
    return (
      <div>
      <Navadmin />
      <Container fluid>
        <div  className="row admin-content-box py-5">
          <Col size="md-3"></Col>
          <Col size="md-6">
            <Mainheading color="dark">Update Post</Mainheading>
            <div className="form-outer">
            <form>
              <label>Update News Title</label>
              <Input
                value={this.state.news_title}
                onChange={this.handleInputChange}
                name="news_title"
                placeholder="news_title"
              />
              <label>Update Category</label>
              <select className="form-control" id="category" name="category" value={this.state.category} onChange={this.handleInputChange}>
                <option value="">Select</option>
                <option value="Announcement">Announcement</option>
                <option value="News">News</option>
              </select>
              <br/>
              {/* <Input
                value={this.state.category}
                onChange={this.handleInputChange}
                name="category"
                placeholder="category"
              /> */}
              <label>Update Description</label>
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description "
              />
              
              <FormBtn
                disabled={!(this.state.news_title && this.state.category && this.state.description)}
                onClick={this.handleFormSubmit}
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
