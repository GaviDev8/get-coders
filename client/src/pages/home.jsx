import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './home.css';

function Home() {
  const [isSignup, setIsSignup] = useState(true);
  const [signupFormState, setSignupFormState] = useState({ username: "", email: "", password: "" });
  const [loginFormState, setLoginFormState] = useState({ email: "", password: "" });
  const [addUser, { error: signupError }] = useMutation(ADD_USER);
  const [login, { error: loginError }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Auth.getToken();
    if (token) {
      navigate('/profile');
    }
  }, [navigate]);

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
    console.log(signupFormState);

    try {
      const userCreation = await addUser({
        variables: {
          username: signupFormState.username,
          email: signupFormState.email,
          password: signupFormState.password,
        },
      });
      const signupToken = userCreation.data.addUser.token;
      Auth.login(signupToken);
    } catch (e) {
      console.error(e);
    }

    setSignupFormState({
      username: "",
      email: "",
      password: "",
    });
    window.location.href = "/profile";
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();
    console.log(loginFormState);
    try {
      const userLogin = await login({
        variables: {
          email: loginFormState.email, password: loginFormState.password
        },
      });
      const loginToken = userLogin.data.login.token;
      Auth.login(loginToken);
    } catch (e) {
      console.error(e);
    }

    setLoginFormState({
      email: "",
      password: "",
    });
    window.location.href = "/profile";
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const isSignupFormEmpty = !signupFormState.username || !signupFormState.email || !signupFormState.password;

  const isLoginFormEmpty = !loginFormState.email || !loginFormState.password;

  return (
    <section className="h-100 gradient-form">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100" >
          <div className="col-xl-10">
            <div id="formSection" className="card rounded-3 text-black ">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      {isSignup ? (
                        <div className="form-outline mb-4">
                          <h1 className="mt-1 mb-5 pb-1">We are the <span id="getCoders">Get &#123; Coders &#125;</span> Team</h1>
                          <h5>Please Create an account</h5>
                          <form onSubmit={handleSignupFormSubmit}>
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
                              <button id="submitButton" type="submit" disabled={isSignupFormEmpty}>Signup</button>
                            </div>
                            {signupError ? (
                              <div>
                                <p className="error-text">The provided credentials are incorrect</p>
                              </div>
                            ) : null}
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
                              <button id="submitButton" type="submit" disabled={isLoginFormEmpty}>Login</button>
                            </div>
                            {loginError ? (
                              <div>
                                <p className="error-text">The provided credentials are incorrect</p>
                              </div>
                            ) : null}
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
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4 text-center">
                    <img style={{ width: '400px', height: '400px' }} src="/images/Get coders.png" alt="Get { Coders } logo" />
                    <p className="small mb-5" id="teamText">Empowering freelance coders with job opportunities while providing organizations with swift assistance that meet their coding needs.</p>
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
