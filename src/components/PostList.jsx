import { Fragment } from "react";
import PropTypes from "prop-types";
import { Post } from "./Post";

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => {
        return (
          <Fragment key={post._id}>
            <Post {...post} />
            <hr className="text-gray-300 my-5" />
          </Fragment>
        );
      })}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
