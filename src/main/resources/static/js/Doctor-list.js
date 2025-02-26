const apiUrl1 = "http://localhost:8086/api/doctor-with-patients";
const container = document.getElementById('doctor-container');

// Function to fetch doctor details
async function fetchDoctorDetails() {
    try {
        const response = await fetch(apiUrl1);
        if (response.ok) {
            const { data } = await response.json(); // Destructuring data from response
            console.log("Fetched Doctor Data:", data);

            // Call the function to populate the table
            populateDoctorTable(data);
        } else {
            console.error("Failed to fetch doctor details:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching doctor details:", error);
    }
}

// Function to populate the table with doctor details
function populateDoctorTable(doctorData) {
    const tableBody = document.getElementById("doctor-table-body");

    tableBody.innerHTML = ""; // Clear existing rows

    doctorData.forEach((doctor) => {
        const row = document.createElement("tr"); // Changed to "tr" for table rows

         // Define fallback for doctor's image
         const doctorImage = doctor.ImageUrl || '';

        row.innerHTML = `
            <td>
                <h2 class="table-avatar">
                    <a href="/profile" class="avatar avatar-sm mr-2">
                        <img class="avatar-img rounded-circle" src="${doctorImage}" alt="Doctor Image">
                    </a>
                    <a href="/profile">${doctor.doctorName}</a>
                </h2>
            </td>
            <td>${doctor.specialization || "N/A"}</td>
            <td>${doctor.memberSince ? new Date(doctor.memberSince).toLocaleDateString() : "N/A"} 
                <br><small>${doctor.memberSince ? new Date(doctor.memberSince).toLocaleTimeString() : ""}</small>
            </td>
            <td>${doctor.Earnings ? doctor.Earnings.toFixed(2) : "0.00"}rs</td>
            <td>
                <div class="status-toggle">
                    <input type="checkbox" id="status_${doctor.doctorId}" class="check" ${doctor.status ? 'checked' : ''}>
                    <label for="status_${doctor.doctorId}" class="checktoggle">checkbox</label>
                </div>
            </td>
            <td class="text-right">
                <div class="actions">
                    <a class="btn btn-sm bg-success-light" data-toggle="modal" href="/edit_specialities_details">
                        <i class="fe fe-pencil"></i> Edit
                    </a>
                    <a data-toggle="modal" href="#delete_modal" class="btn btn-sm bg-danger-light">
                        <i class="fe fe-trash"></i> Delete
                    </a>
                </div>
            </td>
        `;

        tableBody.appendChild(row); // Append the newly created row to the table body
    });
}

// Call the function to fetch and populate the doctor details
fetchDoctorDetails();
