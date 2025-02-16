const apiUrl1 = "http://localhost:8086/api/doctor-with-patients";
const tableBody = document.getElementById("doctor-table-body-index");

// Elements to display counts
const doctorCountElement = document.getElementById("doctor-count");
const patientCountElement = document.getElementById("patient-count");
const appointmentCountElement = document.getElementById("appointment-count");

async function fetchDoctorDetails() {
    try {
        const response = await fetch(apiUrl1);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { data } = await response.json();
        console.log("Fetched Doctor Data:", data);

        populateDoctorTable(data);
        updateCounts(data); // Update doctor, patient, and appointment counts
    } catch (error) {
        console.error("Error fetching doctor details:", error);
    }
}

// Function to generate star ratings
function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating
            ? `<i class="fas fa-star text-warning"></i>`  
            : `<i class="far fa-star text-warning"></i>`; 
    }
    return stars;
}

// Function to populate doctor table
function populateDoctorTable(doctorData) {
    tableBody.innerHTML = ""; 

    doctorData.forEach((doctor) => {
        let totalRating = 0;
        let ratingCount = 0;

        if (doctor.patients && doctor.patients.length > 0) {
            doctor.patients.forEach(patient => {
                if (patient.appointments && patient.appointments.length > 0) {
                    patient.appointments.forEach(appointment => {
                        if (appointment.reviews && appointment.reviews.rating) {
                            totalRating += appointment.reviews.rating;
                            ratingCount++;
                        }
                    });
                }
            });
        }

        let avgRating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;

        const doctorImage = doctor.ImageUrl || "img/doctors/default-doctor.jpg"; 

        // Create table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <h2 class="table-avatar">
                    <a href="profile.html" class="avatar avatar-sm mr-2">
                        <img class="avatar-img rounded-circle" src="${doctorImage}" alt="Doctor Image">
                    </a>
                    <a href="profile.html">${doctor.doctorName}</a>
                </h2>
            </td>
            <td>${doctor.specialization}</td>
            <td>${doctor.earnings.toFixed(2)}rs</td>
            <td>${generateStars(avgRating)}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to update the counts of doctors, patients, and appointments
function updateCounts(doctorData) {
    const doctorCount = doctorData.length;
    let patientCount = 0;
    let appointmentCount = 0;

    doctorData.forEach((doctor) => {
        if (doctor.patients) {
            patientCount += doctor.patients.length;

            doctor.patients.forEach(patient => {
                if (patient.appointments) {
                    appointmentCount += patient.appointments.length;
                }
            });
        }
    });

    // Display counts
    doctorCountElement.textContent = doctorCount;
    patientCountElement.textContent = patientCount;
    appointmentCountElement.textContent = appointmentCount;
}

// Fetch and populate doctor details
fetchDoctorDetails();
