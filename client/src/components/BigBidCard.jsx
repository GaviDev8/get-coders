import { CoderProfile, RecruiterProfile, Job } from 'react-icons/fa';

import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function BigBidCard() {
    return (
      <MDBCard alignment='center'>
        <MDBCardHeader>Featured</MDBCardHeader>
        <MDBCardBody>
          <MDBCardTitle>Special title treatment</MDBCardTitle>
          <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
          <MDBBtn href='#'>Button</MDBBtn>
        </MDBCardBody>
        <MDBCardFooter className='text-muted'>2 days ago</MDBCardFooter>
      </MDBCard>
    );
  }

// const BigBidCard = ({ coderProfile, description, siteLink, recruiterProfile, githubLink }) => {
//   return (
//     <div className="big-card">
//       <img src={`/${userImage}`} alt={`Image for ${coderProfile}`} />
//       <div className="card-content">
//         <h2>{coderProfile}</h2>
//         <p>{description}</p>
//         {coderProfile ? (
//           <a href={siteLink} className="btn-primary" id="pageButton">
//             <User size={30} color={"white"} /> I can help with this job!
//           </a>
//         ) : (
//           recruiterProfile && (
//             <a href={siteLink} className="btn-primary" id="pageButton">
//               <User size={30} color={"white"} /> I need help 
//             </a>
//           )
//         )}
//         <a href={job} className="btn-primary" id="pageButton">
//           <Job size={30} color={"white"} /> the project!
//         </a>
        
//       </div>
//       <div>
//       <h2>{recruiterProfile}</h2>
//         <p>{description}</p>
//         {recruiterProfile ? (
//           <a href={siteLink} className="btn-primary" id="pageButton">
//             <User size={30} color={"white"} /> I need help
//             </a>
//         ) : (
//           recruiterProfile && (
//             <a href={siteLink} className="btn-primary" id="pageButton">
//               <User size={30} color={"white"} /> I need help
//             </a>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default BigBidCard;
