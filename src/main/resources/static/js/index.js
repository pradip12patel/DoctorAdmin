const apiUrl1 = "http://localhost:8086/api/doctor-with-patients";
const tableBody = document.getElementById("doctor-table-body-index");

const doctorCountElement = document.getElementById("doctor-count");
const patientCountElement = document.getElementById("patient-count");
const appointmentCountElement = document.getElementById("appointment-count");
const earningsCountElement = document.getElementById("earning-count");

function indexFunction(dataArray) {
    return dataArray.map((item, index) => ({ ...item, index }));
}

async function fetchDoctorDetails() {
    try {
        const response = await fetch(apiUrl1);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        let doctorData = responseData.data || [];

        doctorData = indexFunction(doctorData);

      //  console.log("------------Fetched Doctor Data with Index:-----------", doctorData);

        populateDoctorTable(doctorData);
        updateCounts(doctorData);
    } catch (error) {
        console.error("Error fetching doctor details:", error);
    }
}

function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating
            ? `<i class="fas fa-star text-warning"></i>`
            : `<i class="far fa-star text-warning"></i>`;
    }
    return stars;
}


function calculateDoctorEarnings(doctor) {
    let totalEarnings = parseFloat(doctor.earnings) || 0;
    //   console.log(totalEarnings, "doctor total earings")
    if (doctor.patients && doctor.patients.length > 0) {
        doctor.patients.forEach(patient => {
            if (patient.appointments && patient.appointments.length > 0) {
                patient.appointments.forEach(appointment => {
                    totalEarnings += parseFloat(appointment.paid) || 0;
                    //         console.log(totalEarnings, "____________doctor total earings")
                });
            }
        });
    }

    return totalEarnings.toFixed(2);
}


function populateDoctorTable(doctorData) {
    tableBody.innerHTML = "";

    doctorData.forEach((doctor) => {
        let totalRating = 0;
        let ratingCount = 0;

        if (doctor.patients && doctor.patients.length > 0) {
            doctor.patients.forEach(patient => {
                // Check appointments for logging purposes
                if (patient.appointments && patient.appointments.length > 0) {
                    patient.appointments.forEach(appointment => {
                        console.log("Appointment found:", appointment);
                    });
                } else {
                    console.log("No appointments found for this patient:", patient.patientName);
                }
        
                if (patient.reviews && patient.reviews.length > 0) {
                    patient.reviews.forEach(review => {
                        console.log("Review found:", review);
                        if (review.rating !== undefined && review.rating !== null) {
                            totalRating += review.rating;
                            ratingCount++;
                        }
                    });
                } else {
                    console.log("No reviews found for this patient:", patient.patientName);
                }
            });
        
            console.log("Total Rating:", totalRating, "Rating Count:", ratingCount);
            const averageRating = ratingCount > 0 ? (totalRating / ratingCount).toFixed(1) : "No ratings yet";
            console.log("Average Rating:", averageRating);
        } else {
            console.log("No patients found for this doctor:", doctor.doctorName);
        }
        

        let avgRating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;
        const doctorImage = doctor.ImageUrl || "img/doctors/default-doctor.jpg";
        const totalEarnings = calculateDoctorEarnings(doctor);


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
            <td>$${totalEarnings}</td>  <!-- Fixed total earnings -->
            <td>${generateStars(avgRating)}</td>
        `;

        tableBody.appendChild(row);
    });
}

function updateCounts(doctorData) {
    const doctorCount = doctorData.length;
    let patientCount = 0;
    let appointmentCount = 0;
    let totalEarnings = 0;

    doctorData.forEach((doctor) => {
        if (doctor.patients && doctor.patients.length > 0) {
            patientCount += doctor.patients.length;

            doctor.patients.forEach((patient) => {
                if (patient.appointments && patient.appointments.length > 0) {
                    appointmentCount += patient.appointments.length;

                    patient.appointments.forEach((appointment) => {
                        totalEarnings += parseFloat(appointment.paid) || 0;
                        console.log(totalEarnings, appointment.paid, "doctor earnings11")
                    });
                }
            });
        }

        //  totalEarnings += parseFloat(doctor.earnings) || 0;

        console.log(totalEarnings, "doctor ---- total earings22")
    });
    console.log(totalEarnings, "doctor total ------earings33")
    if (doctorCountElement) doctorCountElement.textContent = doctorCount;
    if (patientCountElement) patientCountElement.textContent = patientCount;
    if (appointmentCountElement) appointmentCountElement.textContent = appointmentCount;
    if (earningsCountElement) earningsCountElement.textContent = `${totalEarnings.toFixed(2)}rs`;

}

fetchDoctorDetails();
