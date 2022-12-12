import TextPost from "../../Project/PostTypes/text-post";
import ImagePost from "../../Project/PostTypes/image-post";
import LinkPost from "../../Project/PostTypes/link-post";
export const renderSwitch = (post, isFrontPage) => {
    switch (post.type) {
      case "text":
        return (
          <TextPost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={isFrontPage}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
            body={post.postBody}
            timestamp={post.timestamp}
          />
        );
      case "link":
        return (
          <LinkPost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={isFrontPage}
            linksrc={post.linksrc}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
            timestamp={post.timestamp}
          />
        );
      default:
        return (
          <ImagePost
            subreddit={post.communityName}
            user={post.author}
            upvotes={post.upvotes}
            title={post.postTitle}
            numComments={0}
            isFrontPage={isFrontPage}
            imagehash={"ABC"}
            key={post.hash}
            hash={post.hash}
            isEmbeded={true}
            timestamp={post.timestamp}
          />
        );
    }
}

export const postsToJSXArray = (posts, isFrontPage) => {
    return posts.map((post) => {
        return renderSwitch(post, isFrontPage);
    })
}