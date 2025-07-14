// Define Student Info
const studentInfo = {
  name: "John Arcagua",
  major: "Robotics & Embedded Systems",
  email: "joharcag@uat.edu",
  graduation: "May 2025"
};

// Use JavaScript to insert content into html
document.getElementById("Name").textContent = `Name: ${studentInfo.name}`;
document.getElementById("Major").textContent = `Major: ${studentInfo.major}`;
document.getElementById("Email").textContent = `Email: ${studentInfo.email}`;
document.getElementById("Graduation").textContent = `Expected Graduation: ${studentInfo.graduation}`;
