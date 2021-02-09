import { useState, useRef, useEffect } from 'react';
import { scroller } from 'react-scroll';
import axios from 'axios';
import Moment from 'react-moment';
import styles from './index.module.scss';

import { getLatestPosts, getTags, getFeaturedPosts, getPosts, search } from '../../api/posts';

import Head from 'next/head';
import Navbar from '~/../../comps/Navbar';
import Tags from '~/../../comps/Blog/Tag';
import BlogNew from '../../comps/BlogNew';
import FeaturedPosts from '~/../../comps/BlogNew/featured';
import { CTA } from '../../comps/BlogNew/cta';
import CommonCta from '~/../../comps/Common/Cta';

function Blog(props) {
  const [tag, setTag] = useState('tech');
  const [keyword, setkeyword] = useState('');
  const [articles, setarticles] = useState([]);
  const [clicked, setclicked] = useState(false);

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
    axios
      .get(
        'https://blog.gojek.io/ghost/api/v3/content/posts/?key=dc81903c2020e7c9d2f8bafcf7&limit=all',
      )
      .then((res) => {
        setarticles(
          res.data.posts.filter((data) => {
            return data.title.toLowerCase().includes(keyword.toLowerCase());
          }),
        );
      })
      .catch((err) => {
        console.log('error in request', err);
      });
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
        <div className="container" style={{ position: 'relative'}}>
          <Tags
            tags={tags}
            onClick={changeTag}
            activeTag={tag}
            handlesearchClicked={changeClicked}
            clicked={clicked}
            page="blog"
          />

          <div
            className={`input-group my-3 ${styles.searchBox}`}
            style={clicked ? { width: '100%' } : { width: '5%' }}
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

      {keyword === '' && (
        <section className={`post-feed container mt-md-5 pt-3`}>
          <BlogNew heading="Latest" posts={props.latestPosts} link="/blog/all" pageName="blog" />
        </section>
      )}

      {keyword === '' && (
        <section className="py-3 py-md-5" style={{ backgroundColor: '#f2f2f2' }}>
          <div className="post-feed">
            <FeaturedPosts heading="Featured Articles" posts={props.featuredPosts} />
          </div>
        </section>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-md-5 pt-5">
          <BlogNew
            heading="Tech"
            posts={props.techPosts}
            link="/blog/tag/tech"
            id="tech"
            pageName="blog"
          />
        </section>
      )}

      {keyword === '' && (
        <div className="pt-5 pb-4">
          <CTA
            title="Build the tech that powers an entire country."
            href="/jobs"
            hrefText="Apply Now"
          />
        </div>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-md-5 pt-5">
          <BlogNew
            heading="Data"
            posts={props.dataPosts}
            link="/blog/tag/data"
            id="data"
            pageName="blog"
          />
        </section>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-5">
          <BlogNew
            heading="Culture"
            posts={props.culturePosts}
            link="/blog/tag/culture"
            pageName="blog"
            id="culture"
          />
        </section>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-5">
          <BlogNew
            heading="Design"
            posts={props.designPosts}
            link="/blog/tag/design"
            pageName="blog"
            id="design"
          />
        </section>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-5">
          <BlogNew
            heading="Stories"
            posts={props.storiesPosts}
            link="/blog/tag/stories"
            pageName="blog"
            id="stories"
          />
        </section>
      )}

      {keyword === '' && (
        <section className="post-feed container mt-5">
          <BlogNew
            heading="News"
            posts={props.newsPosts}
            link="/blog/tag/news"
            id="news"
            pageName="blog"
          />
        </section>
      )}

      <section className="container py-5">
        {keyword !== '' && <h1 className="heading pb-4">Search Results for '{keyword}'</h1>}
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
                          <Moment format="MMM DD">{post.published_at}</Moment> | 5mins
                        </p>
                      </div>
                    </React.Fragment>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CommonCta mobile />
      {/* End CTA */}
    </div>
  );
}

Blog.getInitialProps = async () => {
  const latestPosts = await getLatestPosts();
  const tags = await getTags();
  const featuredPosts = await getFeaturedPosts();
  const techPosts = await getPosts('tech');
  const dataPosts = await getPosts('data');
  const culturePosts = await getPosts('culture');
  const newsPosts = await getPosts('news');
  const designPosts = await getPosts('design');
  const storiesPosts = await getPosts('stories');

  featuredPosts.forEach((post) => {
    post.featured = false;
  });
  techPosts.forEach((post) => {
    post.featured = false;
  });
  techPosts[0].featured = true;

  dataPosts.forEach((post) => {
    post.featured = false;
  });
  dataPosts[0].featured = true;

  newsPosts.forEach((post) => {
    post.featured = false;
  });
  newsPosts[0].featured = true;

  culturePosts.forEach((post) => {
    post.featured = false;
  });
  culturePosts[0].featured = true;

  designPosts.forEach((post) => {
    post.featured = false;
  });
  designPosts[0].featured = true;

  storiesPosts.forEach((post) => {
    post.featured = false;
  });
  storiesPosts[0].featured = true;

  // Featured artticles

  return {
    latestPosts,
    tags,
    featuredPosts,
    techPosts,
    dataPosts,
    newsPosts,
    culturePosts,
    designPosts,
    storiesPosts,
  };
};

export default Blog;
