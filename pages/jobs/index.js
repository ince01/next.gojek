import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Navbar from '~/../../comps/Navbar';
import JobsList from '../../comps/Careers/JobsList/index';
import Departments from '../../comps/Careers/Departments';
import Teams from '../../comps/Careers/Teams';
import { CTA } from '../../comps/BlogNew/cta';

function Jobs(props) {
  const router = useRouter();
  const params = router.query;
  const recentjobs = props.data;

  function handleChange(val) {
    router.query = {};
    router.push('/jobs', { shallow: true });
  }

  return (
    <div className="text-center text-md-left">
      <Head>
        <title>Gojek | Careers</title>
      </Head>
      <Navbar whiteNav />

      <div className="yellow-bg-gradient"></div>
      {/* banner and jobs section */}
      <JobsList
        data={recentjobs}
        showAllJobs={false}
        // selectedDepartment={params.d}
        onSelectFilter={handleChange}
      />

      {/* Departments */}
      <section className="bg-black full-height py-md-5" id="departments">
        <Departments data={recentjobs} />
      </section>
      {/* End Departments */}

      {/* Teams */}
      {/* <section id="teams" className="full-height align-items-center py-5">
        <Teams data={recentjobs} />
      </section> */}
      {/* End Teams */}

      {/* CTA */}

      <section className="joinus-cta">
        <div className="px-5 pt-4 d-none d-md-block">
          <div className="container">
            <div className="ctaPurple cta-jobs p-5">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-4">
                  <img
                    className="img-fluid mx-auto d-block"
                    src="/img/blog-cta.jpg"
                    alt="Read Gojek blogs"
                  />
                </div>
                <div className="col-lg-5">
                  <h1 className={`text-white mb-5 ctaTitle`}>Read stories from our blog</h1>
                  <a href="/blogs" className="ctaLink">
                    Read More <i className="fas fa-long-arrow-alt-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End CTA */}
    </div>
  );
}

// to fetch the jobs description
export async function getServerSideProps(ctx) {
  let apiUrl =
    'https://api.lever.co/v0/postings/gojek?department=Design&department=Engineering&department=People and Culture&department=Program Management&department=Product&department=Science';
  // 'https://api.lever.co/v0/postings/gojek?department=Design&department=Engineering&department=People and Culture&department=Program Management&department=Product&department=Science&limit=10';
  // if (ctx.query.d) {
  //   apiUrl = `https://api.lever.co/v0/postings/gojek?department=${ctx.query.d}`;
  // }

  try {
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      return { props: { data } };
    } else {
      return await { props: { data: [] } };
    }
  } catch (error) {
    // Network error
    return { props: { data: [] } };
  }

  // Get all jobs
}

export default Jobs;
