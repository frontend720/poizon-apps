import React from "react";
import { specialties, claims, contact, doctors } from "../data";
import { Wrapper, Title, SubHeading, ListComponent, Text } from "../StyleSheet";
import therapist from "../assets/studio.jpeg";

export default function Homepage() {
  return (
    <Wrapper color="#5c5c7c23" padding="62px">
      <Title style={{ color: "#444444" }} padding="36px 0px">
        Your Partner in Orthopaedic Care
      </Title>
      <ul className="nav">
        <li>Home</li>
        <li>Scheduling</li>
        <li className="title_text">Boulder Orthopaedic</li>
        <li>About</li>
        <li>Insurance</li>
        
      </ul>
      <header className="hero">
        <h2 className="practice_name">Boulder Orthopaedic Group</h2>
      </header>
      <Text>
        Welcome to Boulder Orthopedic Group, where we provide comprehensive
        orthopaedic care to patients of all ages and activity levels. Our team
        of experienced and board-certified orthopaedic surgeons is dedicated to
        helping you achieve your best possible outcome, whether you are
        recovering from an injury or managing a chronic condition.
      </Text>
      <div className="spacer">
        <div className="cta_btn">
          <label htmlFor="">Call us Today! (303) 555-1212</label>
        </div>
      </div>

      {/* <div className="spacer"></div> */}
      <section>
        <SubHeading margin="24px 0px">
          Why Choose Boulder Orthopedic Group?
        </SubHeading>
        <div className="container">
          <ul className="claims">
            {claims.map((claim) => (
              <li>{claim}</li>
            ))}
          </ul>
          <img style={{ width: "30%" }} src={therapist} alt="" />
        </div>
        <div className="spacer"></div>
        <SubHeading margin="24px 0px" htmlFor="">
          Schedule an Appointment Today
        </SubHeading>
        <Text>
          If you are experiencing pain or discomfort, or if you have any
          questions about your orthopaedic health, please schedule an
          appointment with Boulder Orthopedic Group today. We are here to help
          you get back to living your life to the fullest.
        </Text>
      </section>
      <section>
        <SubHeading margin="24px 0px">
          We offer a wide range of orthopaedic services, including:
        </SubHeading>
        <ul className="specialties">
          {specialties.map((specialty) => (
            <li>{specialty}</li>
          ))}
        </ul>
      </section>
      <div className="spacer">
        <div className="cta_btn">
          <label htmlFor="">Call us Today! (303) 555-1212</label>
        </div>
      </div>
      <section>
        <form className="contact-form" action="">
          <Text>Contact Us</Text>
          <input placeholder="Full Name" type="text" />
          <input type="text" placeholder="Phone Number" />
          <textarea
            placeholder="Message"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <button className="contact_btn" style={{ width: "50%" }}>
            Submit
          </button>
        </form>
      </section>
      <footer className="footer">
        <SubHeading color="#2c2c2c" margin="24px 0px">
          Contact Information
        </SubHeading>
        <ul className="contacts">
          {contact.map((info) => (
            <li>{info}</li>
          ))}
        </ul>
      </footer>
    </Wrapper>
  );
}
