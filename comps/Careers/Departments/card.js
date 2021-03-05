import { useRouter } from 'next/router';

function Card(props) {
  const { slug, bg, label, openings, index, bgType } = props;

  return (
    <a
      className={`card text-white department ${label} ${index < 2 ? ' highlight' : ''}`}
      style={{
        backgroundColor: `${bg}`,
        backgroundImage:
          bgType === 'img'
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${bg}) `
            : 'none',
      }}
      href={`/careers/all?d=${label}`}
    >
      <div className="card-body">
        <h2 className="head mb-0">{label}</h2>
        <p className="openings">{openings} Openings</p>
      </div>
    </a>
  );
}

export default Card;
