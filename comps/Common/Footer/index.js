import { useForm } from 'react-hook-form';
import Links from './Links';

function Footer(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log('apply form data', data);
  };

  return (
    <section className="py-5 footer">
      <div className="container pt-3 pt-md-0">
        <div className="row mx-0 text-white mt-md-5">
          <div className="col-md-6">
            <Links />
          </div>
          <div className="col-md-6 px-0 p-5 boder-pill contact" style={{ backgroundColor: '#000' }}>
            <p className="form-text">
              We'll strive to ensure you don’t mute us. Stories from our #SuperApp, straight to your
              WhatsApp.
            </p>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-transparent border px-3"
                  placeholder="Enter your Name"
                  id="name"
                  name="name"
                  ref={register({
                    required: 'Name is required',
                  })}
                />
                <div className="invalid-feedback pt-2 pl-3 d-block">
                  {!!errors.name && errors.name.message}
                </div>
              </div>
              <input
                className="form-control bg-transparent border px-3"
                placeholder="Enter your phone number here"
                type="number"
                id="phone"
                name="phone"
                ref={register({
                  required: 'Phone number is required',
                })}
              />
              <div className="invalid-feedback pt-2 pl-3 d-block">
                {!!errors.phone && errors.phone.message}
              </div>
              <button className="btn rounded-pill bg-green mt-4 px-4 text-white" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <p className="text-white pt-3 pt-md-5 mt-0 mt-md-5 text-center">
        {' '}
        Gojek tech | <span>{new Date().getFullYear()}</span> All Rights Reserved
      </p>
    </section>
  );
}

export default Footer;
