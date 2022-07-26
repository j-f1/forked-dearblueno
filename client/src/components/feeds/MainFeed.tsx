import { getPosts } from "gateways/PostGateway";
import Feed from "components/feeds/ReactQueryFeed";
import Post from "components/post/Post";
import { useInfiniteQuery } from "@tanstack/react-query";
import IPost from "types/IPost";
import { useEffect, useState } from "react";

interface MainFeedProps {
  initialPosts: IPost[];
}

function MainFeed(props: MainFeedProps) {
  const [posts, setPosts] = useState<IPost[]>(props.initialPosts);
  const fetchPosts = ({ pageParam = 2 }) => getPosts(pageParam);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("posts", fetchPosts, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.payload?.length === 0) {
          return undefined;
        }
        return pages.length + 2;
      },
    });

  useEffect(() => {
    setPosts((prev) =>
      prev.concat(data?.pages[data.pages.length - 1].payload ?? [])
    );
  }, [data?.pages]);

  return (
    <Feed
      getMore={fetchNextPage}
      status={status}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      animated
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </Feed>
  );
}

export default MainFeed;
