import doctorOne from "./assets/doctor_3.png"
import doctorTwo from "./assets/doctor_5.png"

const specialties = [
  "Sports medicine",
  "Joint replacement",
  "Spine surgery",
  "Hand and wrist surgery",
  "Foot and ankle surgery",
  "Pediatric orthopaedics",
  "Pain management",
  "Physical therapy",
];

const claims = [
  "Our team of orthopaedic surgeons is highly skilled and experienced in all areas of orthopaedics.",
  "We offer a wide range of orthopaedic services, so you can get the care you need under one roof.",
  "We use the latest technology and treatment methods to provide you with the best possible outcome.",
  "We are committed to providing personalized care to each and every patient.",
  "We offer a variety of payment options to make our services affordable for everyone.",
];

const contact = [
  " Boulder Orthopedic Group",

  "123 Main Street",

  "Boulder, CO 80301",

  "(303) 555-1212",
];

const doctors = [
  {
    doctor: "Dr. Daniel Craig",
    bio: "Dr. Daniel Craig is a compassionate and patient-centered orthopedic surgeon with extensive experience in minimally invasive surgery and sports medicine. Dr. Craig specializes in minimally invasive surgery and has a particular interest in sports medicine. He is also a member of the American Academy of Orthopedic Surgeons and the American Board of Orthopedic Surgery.",
    school: "University of Utah Medicine",
    img: doctorTwo,
    id: 0
  },
  {
    doctor: "Dr. Ethan Adams",
    bio: " Dr. Ethan Adams is a well-respected orthopedic clinical doctor who is passionate about providing his patients with the highest quality of care and helping them achieve their best possible outcomes. Dr. Adams specializes in non-surgical treatments for orthopedic conditions, such as physical therapy, injections, and medications. He is also a member of the American College of Rheumatology and the American Board of Internal Medicine.",
    school: "University of Colorado Medicine",
    img: doctorOne,
    id:1
  }
];

export { specialties, claims, contact,doctors };
