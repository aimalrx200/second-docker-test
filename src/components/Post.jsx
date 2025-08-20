import PropTypes from "prop-types";

import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setPopup } from "../redux/slices/popups/simplePopupSlice";

export function Post({ _id, title, contents, author, tags }) {
  const dispatch = useDispatch();

  const handleEditButtonClick = () => {
    dispatch(
      setPopup({
        open: true,
        popupType: "edit",
        data: {
          id: _id,
          title: title,
          contents: contents,
          author: author,
          tags: tags,
        },
      }),
    );
  };

  const handleDeleteButtonClick = () => {
    dispatch(
      setPopup({
        open: true,
        popupType: "delete",
        data: {
          id: _id,
          title: title,
        },
      }),
    );
  };

  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      {tags && tags.length > 0 && (
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <strong>Tags:</strong>
          <div className="flex items-center gap-3 flex-wrap">
            {tags.map((tag, index) => (
              <button
                type="button"
                key={index}
                className="px-2 py-1 rounded-md bg-gray-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 py-2">
        <button
          title="edit post"
          type="button"
          className="cursor-pointer text-blue-500"
          aria-label="edit post"
          onClick={handleEditButtonClick}
        >
          <span>
            <FaRegEdit />
          </span>
        </button>
        <button
          title="delete post"
          type="button"
          className="cursor-pointer text-red-500"
          aria-label="delete post"
          onClick={handleDeleteButtonClick}
        >
          <span>
            <AiOutlineDelete />
          </span>
        </button>
      </div>
    </article>
  );
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
};
