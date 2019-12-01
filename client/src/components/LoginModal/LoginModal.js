import React, { Component } from "react"

class LoginModal extends Component {
    state = {
        user: "",
        password: ""
    }

    componentDidMount() {
        // Placeholder
    }

    render(){
        return(
            // Placeholder
            console.log("Placeholder")
            <div class="modal fade show" id="signupFormModal" >
  <div class="modal-dialog">
    <div class="modal-content">
      {/* <!-- Modal body --> */}
      <div class="modal-body">
        <div class="text-center top-icon">
          <span>
            <i class="fa fa-user-plus fa-spin-hover" aria-hidden="true"></i>
          </span> 
        </div>
        <h4 class="text-center">Sign-Up Form </h4>
        <form class="create-form">
        <div class="form-group">
          <label for="email">Email Id :</label>
          <input type="text" id="signup-email" class="form-control">
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="signup-password" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">Confirm Password:</label>
          <input type="password" id="signup-confirmPassword" class="form-control">
        </div>
  
        <button type="submit" id="signup-btn" class="btn btn-theme">Register Now</button>
        <button type="submit" id="signup-gmail-btn" class="btn btn-theme">
          <i class="fa fa-google-plus" aria-hidden="true"></i> Sign-Up With Gmail</button>
          </form>
      </div>
      {/* <!-- Modal footer --> */}
      <div class="modal-footer">
        <button type="button" class="btn btn-theme" data-dismiss="modal">Close</button>
      </div>
      
    </div>
  </div>
</div>
        );
    }
}

export default LoginModal