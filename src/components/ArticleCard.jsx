import React from "react";

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article?.uri || ""} alt={article?.title} />
      <div className="card-content">
        <h3>{article?.title}</h3>
        <p>{article?.description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
