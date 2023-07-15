import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero h-[60vh]" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Book Spot</h1>
      <p className="mb-5">book are its different chapters and sections, usually shown in a list at the beginning of the book. There is no initial list of contents. The content of something such as an educational course or a programme of action is the elements that it consists of.</p>
      <Link to='/login'>
      <button className="btn btn-primary">Get Started</button>
      </Link>
    </div>
  </div>
</div>
  );
};

export default Hero;
