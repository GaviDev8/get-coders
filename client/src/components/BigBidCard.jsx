import { CoderProfile, RecruiterProfile, BidJob } from 'react-icons/fa';

const BigBidCard = ({ title, imageName, description, siteLink, siteVideo, githubLink }) => {
  return (
    <div className="big-card">
      <img src={`/${profileImage}`} alt={`Image for ${coderProfile}`} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {siteLink ? (
          <a href={siteLink} className="btn-primary" id="pageButton">
            <CoderProfile size={30} color={"white"} /> Visit Site
          </a>
        ) : (
          siteVideo && (
            <a href={siteVideo} className="btn-primary" id="pageButton">
              <RecruiterProfile size={30} color={"white"} /> Watch Video
            </a>
          )
        )}
        <a href={job} className="btn-primary" id="pageButton">
          <BidJob size={30} color={"white"} /> Github
        </a>
      </div>
    </div>
  );
};

export default BigBidCard;
