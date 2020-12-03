import { techFacts } from './data';
import Slider from 'react-slick';

const sliderSettings = {
  infinite: true,
  dots: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function TechFacts() {
  const facts = (xs) => {
    return techFacts.map((data, i) => (
      <div>
        <div
          className={`card text-white px-5 pt-5 border-0 mb-4 ${xs ? 'mx-1' : 'shadow'}`}
          style={{ backgroundColor: data.bgColor }}
          key={i}
        >
          <div className="card-body pb-0 pt-4">
            <div className="row align-items-center">
              <div className={`col-md-6 ${i % 2 == '0' ? 'order-first' : 'order-last'}`}>
                <h3 className="description heading-sm">{data.content}</h3>
              </div>
              <div className={`col-md-6`}>
                <img src={data.image} alt={data.content} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <div>
      <div className="pt-5 d-none d-md-block">{facts(false)}</div>
      <div className="d-md-none">
        <Slider {...sliderSettings}>{facts(true)}</Slider>
      </div>
    </div>
  );
}

export default TechFacts;
