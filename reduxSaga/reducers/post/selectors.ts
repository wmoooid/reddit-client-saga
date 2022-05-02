import { PostState } from '.';

export const selectPost = (state: { post: PostState }) => state.post;
