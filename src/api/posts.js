export const getPosts = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  );

  return await res.json();
};

export const createPost = async (post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return await res.json();
};

export const updatePost = async (post) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${post.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    },
  );

  return await res.json();
};

export const deletePost = async (postId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (res.status === 204) {
    return null;
  }

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Post not found");
    }

    if (res.status === 500) {
      throw new Error("Server error while deleting post");
    }

    throw new Error("Failed to delete post");
  }

  return await res.json();
};
