import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0 });
  const { articleId } = useParams();

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    };

    loadArticleInfo();
  }, [articleId]);

  const article = articles.find((article) => article.name === articleId);

  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`, null);
    const { upvotes } = response.data;
    setArticleInfo(() => ({
      upvotes: upvotes,
    }));
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </>
  );
};

export default ArticlePage;
