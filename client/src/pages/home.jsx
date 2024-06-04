export default function Home() {
    return (
      <div className="container mt-5 text-center" id="homeContainer">
         <div className="row justify-content-center">
          <div className="col-6">
             <div className="rounded-space mx-auto">
              <img src="/avatar.jpg" className="img-fluid" alt="" />
             </div>
            </div>
           </div>
        <h1 className="fw-bold m-5" id="presentationContainer"><span id="presentationName">Get Coders: </span>Empowering freelance coders with job opportunities while providing organizations with swift assistance that meet their coding needs. </h1>
        <p className="fw-bold m-5" id="presentationText">
        LOGIN AND SIGN UP AREA 
        </p>
      </div>
    );
  }