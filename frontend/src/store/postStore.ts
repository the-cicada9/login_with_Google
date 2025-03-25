import { create } from "zustand";

type Post = {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  content: string;
  image?: string;
  tags: string[];
  likes: number;
  comments: number;
  shares?: number;
  time: string;
};

type PostStore = {
  posts: Post[];
  setPosts: (posts: Post[] | ((prevPosts: Post[]) => Post[])) => void;
};

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) =>
    set((state) => ({
      posts: typeof posts === "function" ? posts(state.posts) : posts,
    })),
}));

export default usePostStore;
