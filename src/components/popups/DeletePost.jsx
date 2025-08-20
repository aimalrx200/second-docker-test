import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { setPopup } from "../../redux/slices/popups/simplePopupSlice";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "../../api/posts";

export const DeletePost = ({ postId, title }) => {
  const dispatch = useDispatch();

  const [postTitle, setPostTitle] = useState("");

  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: () => {
      return deletePost(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);

      dispatch(setPopup({ open: false, popupType: null, data: null }));

      setPostTitle("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    deletePostMutation.mutate();
  };

  return (
    <div className="p-4 bg-white rounded shadow flex flex-col gap-3">
      <p className="text-xl font-bold">Delete Post</p>
      <p>Are you sure you want to delete this post?</p>

      <form
        className="flex flex-col gap-3"
        onSubmit={handleFormSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col gap-3">
          <label htmlFor={title}>
            Type: <b>{title}</b>
          </label>
          <input
            className="border border-gray-300 px-2 py-1 rounded-[6px] w-full"
            type="text"
            name={title}
            id={title}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            className="bg-gray-200 cursor-pointer hover:bg-gray-300 px-2 py-1 rounded"
            onClick={() => {
              dispatch(setPopup({ open: false, popupType: null, data: null }));
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${
              postTitle !== title || deletePostMutation.isPending
                ? "cursor-not-allowed"
                : "cursor-pointer bg-red-500 hover:bg-red-600"
            } text-white px-2 py-1 rounded bg-red-300`}
            disabled={postTitle !== title || deletePostMutation.isPending}
          >
            {deletePostMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
    </div>
  );
};

DeletePost.propTypes = {
  postId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
