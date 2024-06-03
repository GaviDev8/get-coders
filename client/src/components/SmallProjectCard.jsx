import { FaGithub, FaLink, FaVideo } from 'react-icons/fa';

const ProjectCard = ({ title, imageName, description, siteLink, siteVideo, githubLink }) => {
  return (
    <div className="small-card">
      <img src={`/${imageName}`} alt={`Image for ${title}`} />
        <div className="card-content">
          <h2>{title}</h2>
          {siteLink ? (
            <a href={siteLink} className="btn-primary" id="pageButton">
              <FaLink size={20} color={"white"} />  Visit Site
            </a>
          ) : (
            siteVideo && (
              <a href={siteVideo} className="btn-primary" id="pageButton">
                <FaVideo size={20} color={"white"} />  Watch Video
              </a>
            )
          )}
          <a href={githubLink} className="btn-primary" id="pageButton">
            <FaGithub size={20} color={"white"} />  Github
          </a>
        </div>
    </div>
  );
};

export default ProjectCard;
