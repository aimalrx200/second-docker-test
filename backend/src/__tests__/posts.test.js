import mongoose from "mongoose";
import { describe, expect, test, beforeEach, beforeAll } from "@jest/globals";
import {
  createPost,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
  getPostById,
  updatePost,
  deletePost,
} from "../services/posts.js";
import { Post } from "../models/post.js";
import { User } from "../models/user.js";

let testUser;

beforeAll(async () => {
  // Create a user to use for all tests in this file
  testUser = new User({
    username: "TestUser",
    password: "TestPassword",
  });
  await testUser.save();
});

describe("creating posts", () => {
  test("with all parameters should succeed", async () => {
    const post = {
      title: "Hi Mongoose!",
      author: testUser._id,
      contents: "This post is stored in a MongoDb Database using Mongoose.",
      tags: ["mongoose", "mongodb"],
    };

    const createdPost = await createPost(testUser._id, post);

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);

    const foundPost = await Post.findById(createdPost._id);

    expect(foundPost).toEqual(expect.objectContaining(post));

    expect(foundPost.createdAt).toBeInstanceOf(Date);

    expect(foundPost.updatedAt).toBeInstanceOf(Date);
  });

  test("without title should fail", async () => {
    const post = {
      author: testUser._id,
      contents: "Post with no title",
      tags: ["empty"],
    };

    try {
      await createPost(testUser._id, post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`title` is required");
    }
  });

  test("without author should fail", async () => {
    const post = {
      title: "Post with no author",
      contents: "This should fail",
    };
    try {
      await createPost(testUser._id, post);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("`author` is required");
    }
  });

  test("with minimal parameters should succeed", async () => {
    const post = {
      title: "Only a title",
      author: testUser._id,
    };

    const createdPost = await createPost(testUser._id, post);

    expect(createdPost._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});

const samplePosts = [
  {
    title: "Learning Redux",
    author: null, // This will be replaced with testUser._id
    tags: ["redux"],
  },
  {
    title: "Learn React Hooks",
    author: null, // This will be replaced with testUser._id
    tags: ["react", "nodejs"],
  },
  {
    title: "Guide to TypeScript",
    author: null, // This will be replaced with testUser._id
    tags: ["typescript"],
  },
];

let createdSamplePosts = [];

beforeEach(async () => {
  await Post.deleteMany({});
  createdSamplePosts = [];

  // Replace the placeholder author with the actual user ID
  const postsToCreate = samplePosts.map((post) => ({
    ...post,
    author: testUser._id,
  }));

  for (const post of postsToCreate) {
    const createdPost = new Post(post);
    createdSamplePosts.push(await createdPost.save());
  }
});

describe("listing posts", () => {
  test("should return all posts", async () => {
    const posts = await listAllPosts();

    expect(posts.length).toEqual(createdSamplePosts.length);
  });

  test("should return posts sorted by creation date descending by default", async () => {
    const posts = await listAllPosts();

    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    expect(posts.map((post) => post.createdAt)).toEqual(
      sortedSamplePosts.map((post) => post.createdAt),
    );
  });

  test("should take into account provided sorting options", async () => {
    const posts = await listAllPosts({
      sortBy: "updatedAt",
      sortOrder: "ascending",
    });

    const sortedSamplePosts = createdSamplePosts.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    );

    expect(posts.map((post) => post.updatedAt)).toEqual(
      sortedSamplePosts.map((post) => post.updatedAt),
    );
  });

  test("should be able to filter posts by author", async () => {
    const posts = await listPostsByAuthor(testUser._id);

    expect(posts.length).toBe(3);
  });

  test("should be able to filter posts by tag", async () => {
    const posts = await listPostsByTag("nodejs");

    expect(posts.length).toBe(1);
  });
});

describe("getting a post", () => {
  test("should return the full post", async () => {
    const post = await getPostById(createdSamplePosts[0]._id);

    expect(post.toObject()).toEqual(createdSamplePosts[0].toObject());
  });

  test("should fail if the id does not exist", async () => {
    const post = await getPostById("000000000000000000000000");

    expect(post).toEqual(null);
  });
});

describe("updating posts", () => {
  test("should update the specified property", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      author: testUser._id,
    });

    const updatedPost = await Post.findById(createdSamplePosts[0]._id);

    expect(updatedPost.author).toEqual(testUser._id);
  });

  test("should not update other properties", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      author: testUser._id,
    });

    const updatedPost = await Post.findById(createdSamplePosts[0]._id);

    expect(updatedPost.title).toEqual("Learning Redux");
  });

  test("should updated the updatedAt timestamp", async () => {
    await updatePost(testUser._id, createdSamplePosts[0]._id, {
      author: testUser._id,
    });

    const updatedPost = await Post.findById(createdSamplePosts[0]._id);

    expect(updatedPost.updatedAt.getTime()).toBeGreaterThan(
      createdSamplePosts[0].updatedAt.getTime(),
    );
  });

  test("should fail if the id does not exist", async () => {
    const post = await updatePost(testUser._id, "000000000000000000000000", {
      author: testUser._id,
    });

    expect(post).toEqual(null);
  });
});

describe("deleting posts", () => {
  test("should remove the post from the database", async () => {
    const result = await deletePost(testUser._id, createdSamplePosts[0]._id);

    expect(result.deletedCount).toEqual(1);

    const deletedPost = await Post.findById(createdSamplePosts[0]._id);

    expect(deletedPost).toEqual(null);
  });

  test("should fail if the id does not exist", async () => {
    const result = await deletePost(testUser._id, "000000000000000000000000");

    expect(result.deletedCount).toEqual(0);
  });
});
