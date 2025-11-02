import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div>
    
      <section
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1727419522509-2c2b393ee16b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxjdXRlJTIwdmV0ZXJpbmFyaWFuJTIwYW5pbWFsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600')",
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-center">
          <h1 className="fw-bold">Welcome to VetConnect</h1>
          <p>
            Find trusted veterinarians, book appointments, and ensure your pet's
            health — all in one place.
          </p>
          <Link to="/vets" className="btn btn-primary btn-lg">
            Explore Vets
          </Link>
        </div>
      </section>

    
      <section className="featured-vets container my-5">
        <h2 className="text-center mb-4">Featured Veterinarians</h2>
        <div className="row g-4">
          {[
            {
              name: "Dr.Oliver Bearman",
              specialty: "Livestock Care Expert",
              img: "https://vetoman.com/wp-content/uploads/2016/11/member_1-1.jpg",
            },
            {
              name: "Dr. Elena Mwende",
              specialty: "Small Animal Specialist",
              img: "https://i.pinimg.com/736x/81/27/9c/81279c034918445fbe4d9e1a4c8e9efb.jpg",
            },
            {
              name: "Dr. Yusuf Ahmed",
              specialty: "Veterinary Pharmacy",
              img: "https://img.freepik.com/premium-photo/portrait-smiling-young-muslim-male-veterinarian-standing-outside-hospital-looking_321831-18449.jpg",
            },
          ].map((vet, index) => (
            <div className="col-md-4" key={index}>
              <div className="card shadow-sm vet-card h-100">
                <img
                  src={vet.img}
                  alt={vet.name}
                  className="card-img-top"
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-pink fw-bold">{vet.name}</h5>
                  <p className="card-text text-muted">{vet.specialty}</p>
                  <Link to="/vets" className="btn btn-outline-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="why-choose py-5 text-center">
        <div className="container">
          <h2 className="text-green fw-bold mb-4">Why Choose VetConnect?</h2>
          <div className="row g-4">
            {[
              {
                title: "Trusted Experts",
                text: "Every vet on our platform is verified, experienced, and passionate about animal health.",
              },
              {
                title: "Convenient Booking",
                text: "Schedule appointments with ease — anytime, anywhere.",
              },
              {
                title: "Affordable Care",
                text: "Get transparent pricing and accessible services for your pets.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="choose-card shadow-sm h-100">
                  <h5 className="text-pink fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="testimonials-section">
        <div className="container text-center">
          <h2 className="text-pink fw-bold mb-5">What Pet Owners Say</h2>
          <div className="row g-4">
            {[
              {
                name: "Liam W.",
                review:
                  "I booked Dr. Winfred through VetConnect — she treated my dog perfectly! The app made it so easy.",
                img: "https://randomuser.me/api/portraits/men/31.jpg",
              },
              {
                name: "Sarah M.",
                review:
                  "Amazing service! Found a vet for my rabbit within minutes and got instant feedback.",
                img: "https://randomuser.me/api/portraits/women/45.jpg",
              },
              {
                name: "Brian K.",
                review:
                  "Affordable, fast, and reliable! VetConnect helped me schedule a checkup without any stress.",
                img: "https://randomuser.me/api/portraits/men/76.jpg",
              },
            ].map((t, index) => (
              <div className="col-md-4" key={index}>
                <div className="testimonial-card bg-white shadow-sm">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="testimonial-img mx-auto"
                  />
                  <p className="text-muted fst-italic">"{t.review}"</p>
                  <h6 className="fw-bold text-green mt-3">{t.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}

export default Home;
