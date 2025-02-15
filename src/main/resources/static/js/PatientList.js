   //Working on this

    document.addEventListener("DOMContentLoaded", function () {
        fetchPatients();
    });

    function fetchPatients() {
        fetch("http://localhost:8086/patient/allpatients") 
            .then(response => {
                console.log("Patient response:", response); 
                return response.json(); 
            })
            .then(data => {
                console.log("Patient response data:", data);
                populatePatients(data);
            })
            .catch(error => console.error("Error fetching patients:", error));
    }
    

    function populatePatients(patients) {
        const tableBody = document.getElementById("patientsTableBody");
        tableBody.innerHTML = ""; // Clear previous data

        if (!patients || patients.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='7' class='text-center text-muted'>No patients found.</td></tr>";
            return;
        }

       

        patients.forEach((patient, index) => {
            const formattedPatientId = `PT${String(index + 1).padStart(3, "0")}`;
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>#${formattedPatientId || "N/A"}</td>
                <td>
                    <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2">
                            <img class="avatar-img rounded-circle" src="${patient.ImageUrl || 'img/default-avatar.jpg'}" alt="User Image">
                        </a>
                        <a href="profile.html">${patient.patientName || "Unknown"}</a>
                    </h2>
                </td>
                <td>${patient.age || "N/A"}</td>
                <td>${patient.address || "N/A"}</td>
                <td>${patient.phone || "N/A"}</td>
                <td>${patient.lastVisit || "N/A"}</td>
                <td class="text-right">${(patient.paid || 0).toFixed(2)}Rs</td>
            `;

            tableBody.appendChild(row);
        });
    }


    document.addEventListener("DOMContentLoaded", function () {
        const addPatientBtn = document.getElementById("addPatientBtn");
        const modal = document.getElementById("patientModal");
        const closeBtn = document.querySelector(".close");
        const savePatientBtn = document.getElementById("savePatientBtn");
    
        // Open Modal
        addPatientBtn.addEventListener("click", function () {
            modal.style.display = "block";
        });
    
        // Close Modal
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    
        // Close Modal if Click Outside
        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    
        // Save Patient Data
        savePatientBtn.addEventListener("click", function () {
            const name = document.getElementById("patientName").value;
            const age = document.getElementById("patientAge").value;
            const address = document.getElementById("patientAddress").value;
    
            if (name && age && address) {
                alert(`Patient Added:\nName: ${name}\nAge: ${age}\nAddress: ${address}`);
                modal.style.display = "none"; // Close modal after saving
            } else {
                alert("Please fill all fields.");
            }
        });
    });
    
    

