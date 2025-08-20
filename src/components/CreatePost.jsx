import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "./reuseable-components/Input";
import { createPost } from "../api/posts";
import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

export function CreatePost() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [contents, setContents] = useState("");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);

  const queryClient = useQueryClient();

  const createPostMutation = useMutation({
    mutationFn: () =>
      createPost({
        title,
        author,
        contents,
        tags: tagList,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);

      setShowSuccess(true);

      setTitle("");
      setAuthor("");
      setContents("");
      setTags("");
      setTagList([]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPostMutation.mutate();
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
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <Input
          label="Title"
          name="create-title"
          id="create-title"
          value={title}
          onChange={(value) => setTitle(value)}
        />
      </div>
      <div>
        <Input
          label="Author"
          name="create-author"
          id="create-author"
          value={author}
          onChange={(value) => setAuthor(value)}
        />
      </div>
      <div>
        <textarea
          className="border border-gray-300 rounded-md p-3 w-full"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
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
      <div>
        <input
          className={`${
            !title ? "cursor-not-allowed" : "cursor-pointer"
          } rounded-md text-white bg-dark-green px-2 py-1 hover:bg-green-800 transition`}
          title={!title ? "Title is required" : ""}
          type="submit"
          value={createPostMutation.isPending ? "Creating..." : "Create"}
          disabled={!title || createPostMutation.isPending}
        />
      </div>

      {showSuccess ? (
        <div className="flex items-center justify-between gap-3 bg-dark-green rounded-md p-2 text-white">
          <p>Post Created Successfully!</p>
          <button
            title="close message"
            type="button"
            className="cursor-pointer"
            onClick={() => setShowSuccess(false)}
          >
            <span>
              <IoMdCloseCircle />
            </span>
          </button>
        </div>
      ) : null}
    </form>
  );
}
