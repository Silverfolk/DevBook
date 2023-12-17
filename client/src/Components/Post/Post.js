import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../Layout/Spinner';
import PostItem from '../Posts/PostItem';
import CommentForm from '../Post/CommentForm';
import CommentItem from '../Post/CommentItem';
import { getPost } from '../../actions/post';

const Post = ({ getPost, postone }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  const loading = postone?.loading;
  const posts = postone?.post;
  console.log(posts);

  return loading || !posts ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={posts} showActions={false} />
      <CommentForm postId={posts._id} />
      <div className="comments">
        {posts.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={posts._id} />
        ))}
      </div>
    </section>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  postone: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  postone: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
