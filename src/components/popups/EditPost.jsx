import { useDispatch, useSelector } from "react-redux";
import { Input } from "../reuseable-components/Input";
import { useState } from "react";
import { setPopup } from "../../redux/slices/popups/simplePopupSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../../api/posts";

export function EditPopup() {
  const { data } = useSelector((state) => state.simplePopup);

  const [title, setTitle] = useState(data?.title || "");
  const [content, setContent] = useState(data?.contents || "");
  const [author, setAuthor] = useState(data?.author || "");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState(data?.tags || []);

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const handleCancelButtonClick = () => {
    dispatch(
      setPopup({
        open: false,
        popupType: null,
        data: null,
      }),
    );
  };

  const updatePostMutation = useMutation({
    mutationFn: () => {
      return updatePost({
        id: data.id,
        title: title,
        author: author,
        contents: content,
        tags: tagList,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);

      dispatch(setPopup({ open: false, popupType: null, data: null }));

      setTitle("");
      setContent("");
      setAuthor("");
      setTags("");
      setTagList([]);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    updatePostMutation.mutate();
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tags.trim() !== "") {
      e.preventDefault();
      setTagList([...tagList, tags.trim()]);
      setTags("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTagList(tagList.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div className="p-4 bg-white rounded shadow flex flex-col gap-3">
        <p className="text-xl font-bold">Edit Post</p>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleFormSubmit}
          autoComplete="off"
        >
          <div>
            <Input
              label="Title"
              name="title"
              id="title"
              value={title}
              onChange={(value) => setTitle(value)}
            />
          </div>
          <div>
            <Input
              label="Author"
              name="author"
              id="author"
              value={author}
              onChange={(value) => setAuthor(value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="content">Post Content</label>
            <textarea
              id="content"
              name="content"
              className="border border-gray-300 rounded-[6px] px-2 py-1 w-full"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          {/* Tags Input Section */}
          <div className="flex flex-col gap-3">
            <Input
              label="Tags"
              name="create-tags"
              id="create-tags"
              value={tags}
              onChange={(value) => setTags(value)}
              onKeyDown={handleAddTag}
              placeholder="Press Enter to add tags"
            />
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          {/* End Tags Input Section */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              className="bg-gray-200 cursor-pointer hover:bg-gray-300 px-2 py-1 rounded"
              onClick={handleCancelButtonClick}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                !title || !author || !content
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } bg-dark-blue text-white px-2 py-1 rounded hover:bg-blue-600`}
              disabled={
                !title || !author || !content || updatePostMutation.isPending
              }
            >
              {updatePostMutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
