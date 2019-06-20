import React, { Component } from "react";
import axios from "axios";
import img from "./giphy.gif";

class Quote extends Component {
  state = {
    quote: "",
    title: ""
  };
  componentDidMount() {
    this.getQuote();
  }
  getQuote = () => {
    let timeStamp = new Date();
    let randomTime = timeStamp.getTime();
    axios
      .get(
        `https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&time=${randomTime}`
      )
      .then(res => {
        // console.log(res.data[0].content);
        let str = res.data[0].content;
        str = str.replace(/(<([^>]+)>)/gi, " ");
        str = str.replace(/&#8220;/g, "“");
        str = str.replace(/&#8221/g, '"');
        str = str.replace(/&#8217;/g, "’");
        str = str.replace(/&#8211;/g, "–");
        str = str.replace(/&#8230/g, "…");
        str = str.replace(/&#8230/g, "…");

        let title = res.data[0].title;
        title = title.replace(/(<([^>]+)>)/gi, " ");
        title = title.replace(/&#8220;/g, "“");
        title = title.replace(/&#8221/g, '"');
        title = title.replace(/&#8217;/g, "’");
        title = title.replace(/&#8211;/g, "–");
        title = title.replace(/&#8230/g, "…");
        title = title.replace(/&#8230/g, "…");

        // console.log(str, title);
        if (res.data) {
          this.setState({
            quote: str,
            title: res.data[0].title
          });
        }
      });
  };
  render() {
    const { quote, title } = this.state;

    if (!quote) {
      return <img src={img} alt="Loading..." />;
    } else {
      return (
        <div>
          <div className="quoteBlock">
            <i className="fa fa-quote-left" aria-hidden="true" />
            <span>
              {quote}
              <p className="title" style={{ fontStyle: "italic" }}>
                &#8211; {title}
              </p>
            </span>
            <i className="fa fa-quote-right" aria-hidden="true" />
          </div>
          <div className="btn-container">
            <a href="!#" className="btn btn-primary" onClick={this.getQuote}>
              Get Quote
            </a>
          </div>
        </div>
      );
    }
  }
}

export default Quote;
