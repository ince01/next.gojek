import Stories from 'react-insta-stories';
import bannerImage from '~/../../static/banner.png';

function StoriesSection() {
  //   const stories = [
  //     {
  //       url: 'https://www.gojek.io/images/impact-stories/arif.jpg',
  //     },
  //     {
  //       url: 'https://www.gojek.io/images/impact-stories/nuridah.jpg',
  //     },
  //     {
  //       url: 'https://www.gojek.io/images/impact-stories/heru.jpg',
  //     },
  //     {
  //       url: 'https://www.gojek.io/images/impact-stories/sumani.jpg',
  //     },
  //   ];

  const stories = [
    'https://www.gojek.io/images/impact-stories/arif.jpg',

    'https://www.gojek.io/images/impact-stories/nuridah.jpg',

    'https://www.gojek.io/images/impact-stories/heru.jpg',

    'https://www.gojek.io/images/impact-stories/sumani.jpg',
  ];

  return <Stories stories={stories} defaultInterval={3000} width={'100%'} loader={<div />} loop />;
}

export default StoriesSection;
