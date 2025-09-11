import { PostList } from "../components/PostList";
import { CreatePost } from "../components/CreatePost";
import { PostSorting } from "../components/PostSorting";
import { PostFilter } from "../components/PostFilter";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useState } from "react";
import { SimplePopup } from "../components/reuseable-components/SimplePopup";
import { Header } from "../components/Header";

export function Blog() {
  const [author, setAuthor] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [sortOrder, setSortOrder] = useState("descending");

  const postsQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  const posts = postsQuery.data ?? [];

  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <Header />
        </div>
        <CreatePost />
        <hr className="text-gray-300" />
        <PostFilter
          field="author"
          value={author}
          onChange={(value) => setAuthor(value)}
        />
        <PostSorting
          fields={["createdAt", "updatedAt"]}
          value={sortBy}
          onChange={(value) => setSortBy(value)}
          orderValue={sortOrder}
          onOrderChange={(orderValue) => setSortOrder(orderValue)}
        />
        <hr className="text-gray-300" />
        <PostList posts={posts} />
      </div>
      <SimplePopup />
    </>
  );
}
