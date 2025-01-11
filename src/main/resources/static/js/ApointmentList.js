
//Working on this

const apiUrl = "http://localhost:8086/api/doctor-with-patients";
const container = document.getElementById('doctor-patient-container');
// const messageDiv = document.getElementById('message');


// function trimAppointmentSlotByComma(appointmentSlot) {

//     const parts = appointmentSlot.split(',', 2);
//     if (parts.length === 2) {
//         return {
//             date: parts[0].trim(),  // Date part
//             time: parts[1].trim()   // Time part
//         };
//     } else {
//         return null;  // If the format doesn't match
//     }
// }



async function fetchDoctorPatientData() {
    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const { data } = await response.json();
            console.log("responseresponse", data)

            //	Display the message
            //	messageDiv.classList.add('message');
            //	messageDiv.innerText = data.message;

            data.forEach(doctor => {
                // Create a card container for each doctor
                const doctorCard = document.createElement('div');
                doctorCard.classList.add('datadiv', 'card');
                doctorCard.setAttribute('id', `doctor-${doctor.doctorId}`);

                // Define fallback for doctor's image
                const doctorImage = doctor.ImageUrl || '';

                // Build doctor table content
                const doctorTable = `
					<div class="card-body">
						<h5 class="card-title">${doctor.doctorName} - ${doctor.specialization}</h5>
						<div class="table-responsive">
							<table class="datatable table table-hover table-center mb-0">
								<thead>
									<tr>
										<th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_0"
													rowspan="1" colspan="1" aria-sort="ascending"
													aria-label="#: activate to sort column descending"
													style="width: 102.775px;">Doctor Name</th>
										<th>Speciality</th>
										<th>Patient Name</th>
										<th>Appointment Time</th>
										<th>Status</th>
										<th class="text-right">Amount</th>
									</tr>
								</thead>
								<tbody>
									${doctor.patients.length > 0
                        ? doctor.patients.map(patient => {
                            const patientImage = patient.ImageUrl || '';
                            const appointmentSlot = patient.ApointmentSlot || 'Not Scheduled';
                            return `
												<tr>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm mr-2">
																<img class="avatar-img rounded-circle" src="${doctorImage}" alt="Doctor Image">
															</a>
															<a href="profile.html">${doctor.doctorName}</a>
														</h2>
													</td>
													<td>${doctor.specialization}</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm mr-2">
																<img class="avatar-img rounded-circle" src="${patientImage}" alt="Patient Image">
															</a>
															<a href="profile.html">${patient.patientName}</a>
														</h2>
													</td>
													<td>
  ${(() => {
                                    if (!appointmentSlot) {


                                        // If appointmentSlot is null or undefined
                                        return 'Not booked yets';
                                    }
                                    if (appointmentSlot.includes(", ")) {
                                        const [date, time] = appointmentSlot.split(", ");
                                        return `${date} <span class="text-primary d-block">${time}</span>`;
                                    }
                                    return 'Not booked yet'; // Handle unexpected formats
                                })()}
</td>

	<td>
    <div class="status-toggle">
        <!-- Disable the checkbox to prevent manual toggling, and update it based on doctor.status -->
        <input type="checkbox" id="status_${doctor.doctorId}" class="check" ${doctor.status ? 'checked' : ''} disabled>
        <label for="status_${doctor.doctorId}" class="checktoggle"></label>
    </div>
</td>

													<td class="text-right">${patient.paid}rs</td>
												</tr>
											`;
                        }).join("")
                        : "<tr><td colspan='6'>No patients assigned</td></tr>"
                    }
								</tbody>
							</table>
						</div>
					</div>
				`;

                // Set the inner HTML of the doctor card and append it to the container
                doctorCard.innerHTML = doctorTable;
                container.appendChild(doctorCard);
            });
        } else {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        // messageDiv.classList.add('message');
        // messageDiv.innerText = `Failed to fetch data: ${error.message}`;
        console.log("Error while fetching the data", error)
    }
}

fetchDoctorPatientData();


