const ProjectCard = ({ title, imageName, description, payment, dateLimit, userId}) => {
  return (
    <div className="small-card">
      <img src={`/${imageName}`} alt={`Image for ${title}`} />
        <div className="card-content">
          <h2>{title}</h2>
          <p>{description}</p>
          <h3>Current Value: ${payment}</h3>
          <h2>Current Winner: {userId}</h2>
          <h3>Delivery Data: {dateLimit}</h3>
          <h4>Your Bid : </h4>
        </div>
    </div>
  );
};

export default ProjectCard;
