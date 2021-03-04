import { useState, useRef, useEffect } from 'react';
import { scroller } from 'react-scroll';
import axios from 'axios';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

import styles from '../index.module.scss';
import { getTagPosts } from '../../../api/posts';

import Head from 'next/head';
import Navbar from '../../../comps/Navbar';
import Tags from '../../..//comps/Blog/Tag';
import BlogNew from '../../../comps/BlogNew';
import CommonCta from '../../../comps/Common/Cta';

function TagPosts(props) {
  const router = useRouter();
  const [tag, setTag] = useState(props.slug);
  const [keyword, setkeyword] = useState('');
  const [articles, setarticles] = useState([]);
  const [active, setactive] = useState(false);
  const [clicked, setclicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeTag = (tagName) => {
    setTag(tagName);
    scroller.scrollTo(tagName, {
      offset: -125,
      smooth: 'easeOutCubic',
      duration: 500,
      delay: 0,
    });
  };
  useEffect(() => {
    if (clicked) {
      inputRef.current.focus();
    }
  }, [clicked]);

  const changeClicked = () => {
    setclicked(true);
  };
  const handleClose = () => {
    setkeyword('');
    setclicked(false);
  };

  const changekeyword = (keyword) => {
    setkeyword(keyword);
        setLoading(true);

    axios
      .get(process.env.ghostBlogsApi)
      .then((res) => {
        setarticles(
          res.data.posts.filter((data) => {
            return data.title.toLowerCase().includes(keyword.toLowerCase());
          }),
        );
        setLoading(false);

      })
      .catch((err) => {});
  };

  const tags = [
    { name: 'Tech', slug: 'tech' },
    { name: 'Data', slug: 'data' },
    { name: 'Culture', slug: 'culture' },
    { name: 'Design', slug: 'design' },
    { name: 'Stories', slug: 'stories' },
    { name: 'News', slug: 'news' },
  ];

  const inputRef = useRef(null);

  return (
    <div className="text-center text-md-left blog-page">
      <Head>
        <title>Gojek | Blogs</title>
      </Head>
      <Navbar whiteNav />
      {/* banner section */}
      <section
        className="py-5 mb-3 mb-md-5 d-flex align-items-center blog-banner"
        style={{ backgroundColor: '#00a913' }}
      >
        <div className="container pt-5">
          <div className="row justify-content-around align-items-center">
            <div className="col-12 col-md-5 col-lg-5 order-1 order-md-0">
              <h1 className="banner-head text-white pt-5 pt-md-0 px-4 px-md-0">
                Wondering <br className="d-none d-md-block" />
                how <br className="d-block d-md-none" /> we do it all?
              </h1>
              <p className="banner-sub-head text-white">
                Take a behind-the-scenes peek into the triumphs and tribulations it takes to build a
                #SuperApp.
              </p>
            </div>
            <div className="col-12 col-md-7 col-lg-7 px-0 px-md-3">
              <img
                src="/img/Blog-Banner.png"
                className="img-fluid banner-img mt-5 mt-md-0 px-3 px-md-0"
                alt="Gojek Banner"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`tags-nav bg-white sticky-top`}>
        <div className="container" style={{ position: 'relative' }}>
          <Tags
            tags={tags}
            onClick={changeTag}
            activeTag={tag}
            handlesearchClicked={changeClicked}
            clicked={clicked}
            page="all-blogs"
          />

          <div
            className={`input-group my-3 ${styles.searchBox} ${
              clicked ? styles.activeWidth : styles.normalWidth
            }`}
          >
            <div
              className={`input-group-prepend`}
              style={
                clicked
                  ? { borderBottom: '1px solid green', backgroundColor: 'white' }
                  : { borderBottom: 'none', backgroundColor: 'white' }
              }
              onClick={changeClicked}
            >
              <span
                className={`input-group-text text-green-light `}
                style={{ backgroundColor: 'transparent', border: 0, paddingLeft: '1rem' }}
              >
                <img className="img-fluid" src="/img/blog/search.svg" />
              </span>
            </div>

            <input
              type="text"
              placeholder="Search"
              className={`input-search form-control active-link ${clicked ? 'd-block' : 'd-none'}`}
              ref={inputRef}
              onChange={(event) => changekeyword(event.target.value)}
              placeholder="Search blogs (kubernetes, #firstprinciples, design)"
            />

            <div
              className={`input-group-append ${clicked ? 'd-block' : 'd-none'}`}
              style={{ borderBottom: '1px solid green' }}
            >
              <span
                aria-hidden="true"
                className="input-group-text text-green-light pointer"
                style={{ border: '0', backgroundColor: 'transparent', fontSize: '24px' }}
                onClick={handleClose}
              >
                &times;
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="container" id="searchResults">
        <div className="py-5">
          {keyword !== '' ? (
            loading ? (
              <h1 className="heading pb-4">Loading search Results for '{keyword}'</h1>
            ) : (
              <h1 className="heading pb-4">Search Results for '{keyword}'</h1>
            )
          ) : (
            ''
          )}
          <div className="row posts">
            {articles.map((post) => (
              <div className="col-md-4 mb-md-5">
                <a href={`/blog/${post.slug}`} className="post">
                  <div className="card border-0 bg-transparent">
                    <React.Fragment>
                      <div
                        className={`thumbnail small`}
                        style={{ backgroundImage: `url(${post.feature_image})` }}
                      />
                    </React.Fragment>
                    <div className="card-body px-0">
                      <h5 className={`${post.featured ? 'featured' : ''} title`}>{post.title}</h5>
                      <p className={`${post.featured ? 'featured' : ''} description`}>
                        {' '}
                        {post.excerpt}...
                      </p>
                      <React.Fragment>
                        <div className="mt-3 meta">
                          <p className="mb-0 author">{post.author}</p>
                          <p className="date-time">
                            <Moment format="MMM DD">{post.published_at}</Moment> | 5 min read
                          </p>
                        </div>
                      </React.Fragment>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {keyword === '' && (
        <section className="post-feed container mt-5">
          <BlogNew heading={props.slug} posts={props.posts} link="" pageName="tag" />
        </section>
      )}

      {/* CTA */}
      <CommonCta mobile />
      {/* End CTA */}
    </div>
  );
}

TagPosts.getInitialProps = async (ctx) => {
  const posts = await getTagPosts(ctx.query.slug);

  posts.forEach((post) => {
    post.featured = false;
  });
  return {
    posts,
    slug: ctx.query.slug,
  };
};

export default TagPosts;
