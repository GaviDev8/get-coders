import { ADD_USER, LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import "./home.css"

function Home() {
  const [isSignup, setIsSignup] = useState(true);
  const [signupFormState, setSignupFormState] = useState({ username: "", email: "", password: "" });
  const [loginFormState, setLoginFormState] = useState({ email: "", password: "" });
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [addUser, { error: signupError, data: signupData }] = useMutation(ADD_USER);
  const [login, { error: loginError, data: loginData }] = useMutation(LOGIN_USER);

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({ variables: { ...signupFormState } });
      console.log("Signup successful:", data);
      setSignupFormState({ username: "", email: "", password: "" });
      setSignupErrorMessage("");
    } catch (error) {
      console.error("Signup error:", error);
      if (signupError) {
        if (signupError.graphQLErrors.some(error => error.message.includes('duplicate key error collection'))) {
          setSignupFormState({ username: "", email: "", password: "" });
          setSignupErrorMessage("Email is already registered. Please use a different email.");
        } else {
          console.error("Other signup error:", signupError);
        }
      }
    }
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...loginFormState } });
      console.log("Login successful:", data);
      setLoginFormState({ email: "", password: "" });
      setLoginErrorMessage("");
    } catch (error) {
      console.error("Login error:", error);
      if (loginError) {
        const errorMessage = loginError.graphQLErrors[0]?.message || "Login failed";
        setLoginErrorMessage(errorMessage);
      }
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div id="formSection" className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      {isSignup ? (
                        <div className="form-outline mb-4">
                          <h1 className="mt-1 mb-5 pb-1">We are the <span id="getCoders">Get &#123; Coders &#125;</span> Team</h1>
                          <h5>Please Create an account</h5>
                          <form onSubmit={handleSignupFormSubmit}>
                            {signupErrorMessage && (
                              <p className="error-message">{signupErrorMessage}</p>
                            )}
                            <div className="text-center pt-1 mb-5 pb-1">
                              <input
                                className="form-control"
                                type="text"
                                name="username"
                                value={signupFormState.username}
                                placeholder="Username"
                                onChange={handleSignupChange}
                              />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={signupFormState.email}
                                placeholder="Email"
                                onChange={handleSignupChange}
                              />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={signupFormState.password}
                                placeholder="Password"
                                onChange={handleSignupChange}
                              />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <button id="submitButton" type="submit">Signup</button>
                            </div>
                          </form>
                          <p>Already have an account? 
                            <button className="btn btn-outline-danger m-5" onClick={toggleForm}>Login</button>
                          </p>
                        </div>
                      ) : (
                        <div className="form-outline mb-4">
                          <h1 className="mt-1 mb-5 pb-1">We are the <span id="getCoders">Get &#123; Coders &#125;</span> Team</h1>
                          <h5>Please login to your account</h5>
                          <form onSubmit={handleLoginFormSubmit}>
                            {loginErrorMessage && (
                              <p className="error-message">{loginErrorMessage}</p>
                            )}
                            <div className="text-center pt-1 mb-5 pb-1">
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={loginFormState.email}
                                placeholder="Email"
                                onChange={handleLoginChange}
                              />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={loginFormState.password}
                                placeholder="Password"
                                onChange={handleLoginChange}
                              />
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                              <button id="submitButton" type="submit">Login</button>
                            </div>
                          </form>
                          <p>Not a member?
                            <button className="btn btn-outline-danger m-5" onClick={toggleForm}>Register</button>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h2>LOGO HERE</h2>
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
