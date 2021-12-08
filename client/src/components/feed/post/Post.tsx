import "./Post.css";
import PostBody from "./PostBody";
import PostDate from "./PostDate";
import PostNumber from "./PostNumber";
import ReactionBar from "./reactions/ReactionBar";
import DividerDot from "./DividerDot";
import CommentButton from "./CommentButton";
import CommentSection, { IThread } from "./comments/CommentSection";
import { useState } from "react";
import IUser from "../../../types/IUser";

type PostProps = {
  user: IUser | undefined;
  postNumber: number;
  postBody: string;
  postDate: string;
  comments: IThread[];
  reactions: string[][];
};

function Post(props: PostProps) {
  const [showCommentBox, setShowCommentBox] = useState(false);

  return (
    <div className="Post">
      <PostNumber value={props.postNumber}></PostNumber>
      <PostDate value={props.postDate}></PostDate>
      <PostBody body={props.postBody}></PostBody>
      <div className="PostFooter">
        <ReactionBar
          user={props.user}
          type={"post"}
          reactions={props.reactions}
        ></ReactionBar>
        <DividerDot />
        <CommentButton type="comment" click={() => setShowCommentBox(true)} />
      </div>
      <CommentSection
        user={props.user}
        comments={props.comments}
        postNumber={props.postNumber}
        showCommentBox={showCommentBox}
      />
    </div>
  );
}

export default Post;
