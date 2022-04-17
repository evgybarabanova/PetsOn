import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./post.css";

export default function CatId() {
  const [postCat, setPostCat] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3903/posts/${id}`).then((PostsCat) => {
      //console.log(PostsCat);
      const { id, picture, title, text } = PostsCat.data;
      //console.log("7777777", picture);
      setPostCat({ id, picture, title, text });
      //console.log(postCat);

      // // TODO call api (axios) to get the comments for this post (GET http://..../posts/${id}/comemnts))

      return axios.get(`http://localhost:3903/posts/${id}/comments`)
        .then(response => {
          const { data: comments } = response

          setComments(comments)
        })
    });
  }, []);

  const handleCommentSubmit = event => {
    event.preventDefault()

    const text = event.target.text.value
    console.log(text);

    // // TODD call api (axios) to create a comment for the post with id postCat.id (POST http://..../posts/${postCat.id}/comemnts)
    fetch(`http://localhost:3903/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application',
        credentials: "include",
      },
      body: JSON.stringify({ text })
    })
      .then(() => alert('comment submitted'))
      .catch(error => alert(error.message))

    // TODO call api (axios) to refresh the comments list (GET http://..../posts/${postCat.id}/comemnts)
  }


  return (
    <div className="container">
      <h3>{postCat.title}</h3>
      <img src={postCat.picture} />
      <p className="postText">{postCat.text}</p>

      <h4>Комментарии</h4>
      <ul>
        {comments.map(comment => <li>{comment.text}</li>)}
      </ul>

      <h5>Оставьте комментарий</h5>
      <form onSubmit={handleCommentSubmit}>
        <textarea name="text" cols="30" rows="10"></textarea>
        <button type="submit">Сохранить комментарий</button>
      </form>
    </div>
  );
}
