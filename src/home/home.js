import React, { Component } from "react";
import { homeService } from "./home.service";
import { observer } from "mobx-react";

const Home = observer(
  class Home extends Component {
    componentDidMount() {
      void homeService.posts.getPosts();
    }

    render() {
      const postLists = homeService.posts.data;

      return (
        <div className="homePage">
          {postLists.map((post) => {
            return (
              <div className="post" key={post.id}>
                <div className="postHeader">
                  <div className="title">
                    <h1>{post.title}</h1>
                  </div>
                </div>
                <div className="postTextContainer"> {post.text} </div>
                <h3>@{post.author.name}</h3>
              </div>
            );
          })}
        </div>
      );
    }
  }
);

export default Home;
