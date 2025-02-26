const apiUrl1 = "http://localhost:8086/api/doctor-with-patients";
const tableBody = document.getElementById("doctor-table-body-index");
const patientTableBody = document.getElementById("patient-table-body-index");

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
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const responseData = await response.json();
        let doctorData = responseData.data || [];
        doctorData = indexFunction(doctorData);

        console.log("Fetched Doctor Data:", doctorData);
        populateDoctorTable(doctorData);
        populatePatientTable(doctorData);
        updateCounts(doctorData);
    } catch (error) {
        console.error("Error fetching doctor details:", error);
    }
}

function generateStars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
        i < rating
            ? '<i class="fas fa-star text-warning"></i>'
            : '<i class="far fa-star text-warning"></i>'
    ).join('');
}

function calculateDoctorEarnings(doctor) {
    let totalEarnings = 0.00;
    doctor.patients?.forEach(patient => {
        patient.appointments?.forEach(appointment => {
            console.log("Appointment found for:", patient.patientName, appointment);
            totalEarnings += parseFloat(appointment.paid) || 0;
            console.log("Paid ammount:", appointment.paid,"Total paid ammount counting:", totalEarnings)
        });
        console.log("Total Earnings", totalEarnings)
    });
    return totalEarnings.toFixed(2);
}


function populateDoctorTable(doctorData) {
    tableBody.innerHTML = "";

    doctorData.forEach((doctor) => {
        let totalRating = 0, ratingCount = 0;

        doctor.patients?.forEach(patient => {
            patient.reviews?.forEach(review => {
                if (review.rating !== undefined && review.rating !== null) {
                    totalRating += review.rating;
                    ratingCount++;
                }
            });
        });

        const avgRating = ratingCount > 0 ? Math.round(totalRating / ratingCount) : 0;
        const doctorImage = doctor.ImageUrl || "img/doctors/default-doctor.jpg";
        const totalEarnings = calculateDoctorEarnings(doctor);

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
            <td>${doctor.specialization || "N/A"}</td>
            <td>${totalEarnings}rs</td>
            <td>${generateStars(avgRating)}</td>
        `;
        tableBody.appendChild(row);
    });
}

function populatePatientTable(doctorData) {
    patientTableBody.innerHTML = "";

    doctorData.forEach((doctor) => {
        const patientMap = new Map();

        doctor.patients?.forEach((patient) => {
            const totalPaid = patient.appointments?.reduce((sum, appointment) => sum + (parseFloat(appointment.paid) || 0), 0) || 0;

            if (patientMap.has(patient.patientName)) {
                patientMap.get(patient.patientName).totalPaid += totalPaid;
            } else {
                patientMap.set(patient.patientName, { ...patient, totalPaid });
            }
        });

        patientMap.forEach((patient) => {
            const patientImage = patient.ImageUrl || "img/patients/default-patient.jpg";
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2">
                            <img class="avatar-img rounded-circle" src="${patientImage}" alt="Patient Image">
                        </a>
                        <a href="profile.html">${patient.patientName || "N/A"}</a>
                    </h2>
                </td>
                <td>${patient.phone || "N/A"}</td>
                <td>${patient.lastVisit || "N/A"}</td>
                <td class="text-right">${patient.totalPaid.toFixed(2)}rs</td>
            `;
            patientTableBody.appendChild(row);
        });
    });
}

function updateCounts(doctorData) {
    const doctorCount = doctorData.length;
    let patientCount = 0, appointmentCount = 0, totalEarnings = 0.00;

    doctorData.forEach((doctor) => {
        patientCount += doctor.patients?.length || 0;
        doctor.patients?.forEach((patient) => {
            appointmentCount += patient.appointments?.length || 0;
            patient.appointments?.forEach((appointment) => {
                totalEarnings += parseFloat(appointment.paid) || 0;
                console.log("--Doctor earn ammount counting continous --", appointment.paid, totalEarnings)
            });
        });
    });
    console.log("Doctor total earning: ", totalEarnings)

    doctorCountElement.textContent = doctorCount;
    patientCountElement.textContent = patientCount;
    appointmentCountElement.textContent = appointmentCount;
    earningsCountElement.textContent = `${totalEarnings.toFixed(2)}rs`;
}

fetchDoctorDetails();
