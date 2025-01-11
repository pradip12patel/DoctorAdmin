/*
Author       : Dreamguys
Template Name: Doccure - Bootstrap Admin Template
Version      : 1.0
*/

(function($) {
    "use strict";
	
	// Variables declarations
	
	var $wrapper = $('.main-wrapper');
	var $pageWrapper = $('.page-wrapper');
	var $slimScrolls = $('.slimscroll');
	
	// Sidebar
	
	var Sidemenu = function() {
		this.$menuItem = $('#sidebar-menu a');
	};
	
	function init() {
		var $this = Sidemenu;
		$('#sidebar-menu a').on('click', function(e) {
			if($(this).parent().hasClass('submenu')) {
				e.preventDefault();
			}
			if(!$(this).hasClass('subdrop')) {
				$('ul', $(this).parents('ul:first')).slideUp(350);
				$('a', $(this).parents('ul:first')).removeClass('subdrop');
				$(this).next('ul').slideDown(350);
				$(this).addClass('subdrop');
			} else if($(this).hasClass('subdrop')) {
				$(this).removeClass('subdrop');
				$(this).next('ul').slideUp(350);
			}
		});
		$('#sidebar-menu ul li.submenu a.active').parents('li:last').children('a:first').addClass('active').trigger('click');
	}
	
	// Sidebar Initiate
	init();
	
	// Mobile menu sidebar overlay
	
	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
		$wrapper.toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});
	
	// Sidebar overlay
	
	$(".sidebar-overlay").on("click", function () {
		$wrapper.removeClass('slide-nav');
		$(".sidebar-overlay").removeClass("opened");
		$('html').removeClass('menu-opened');
	});
	
	// Page Content Height
	
	if($('.page-wrapper').length > 0 ){
		var height = $(window).height();	
		$(".page-wrapper").css("min-height", height);
	}
	
	// Page Content Height Resize
	
	$(window).resize(function(){
		if($('.page-wrapper').length > 0 ){
			var height = $(window).height();
			$(".page-wrapper").css("min-height", height);
		}
	});
	
	// Select 2
	
    if ($('.select').length > 0) {
        $('.select').select2({
            minimumResultsForSearch: -1,
            width: '100%'
        });
    }
	
	// Datetimepicker
	
	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({
			format: 'DD/MM/YYYY',
			icons: {
				up: "fa fa-angle-up",
				down: "fa fa-angle-down",
				next: 'fa fa-angle-right',
				previous: 'fa fa-angle-left'
			}
		});
		$('.datetimepicker').on('dp.show',function() {
			$(this).closest('.table-responsive').removeClass('table-responsive').addClass('temp');
		}).on('dp.hide',function() {
			$(this).closest('.temp').addClass('table-responsive').removeClass('temp')
		});
	}

	// Tooltip
	
	if($('[data-toggle="tooltip"]').length > 0 ){
		$('[data-toggle="tooltip"]').tooltip();
	}
	
    // Datatable

    if ($('.datatable').length > 0) {
        $('.datatable').DataTable({
            "bFilter": false,
        });
    }
	
	// Email Inbox

	if($('.clickable-row').length > 0 ){
		$(document).on('click', '.clickable-row', function() {
			window.location = $(this).data("href");
		});
	}

	// Check all email
	
	$(document).on('click', '#check_all', function() {
		$('.checkmail').click();
		return false;
	});
	if($('.checkmail').length > 0) {
		$('.checkmail').each(function() {
			$(this).on('click', function() {
				if($(this).closest('tr').hasClass('checked')) {
					$(this).closest('tr').removeClass('checked');
				} else {
					$(this).closest('tr').addClass('checked');
				}
			});
		});
	}
	
	// Mail important
	
	$(document).on('click', '.mail-important', function() {
		$(this).find('i.fa').toggleClass('fa-star').toggleClass('fa-star-o');
	});
	
	// Summernote
	
	if($('.summernote').length > 0) {
		$('.summernote').summernote({
			height: 200,                 // set editor height
			minHeight: null,             // set minimum height of editor
			maxHeight: null,             // set maximum height of editor
			focus: false                 // set focus to editable area after initializing summernote
		});
	}
	
    // Product thumb images

    if ($('.proimage-thumb li a').length > 0) {
        var full_image = $(this).attr("href");
        $(".proimage-thumb li a").click(function() {
            full_image = $(this).attr("href");
            $(".pro-image img").attr("src", full_image);
            $(".pro-image img").parent().attr("href", full_image);
            return false;
        });
    }

    // Lightgallery

    if ($('#pro_popup').length > 0) {
        $('#pro_popup').lightGallery({
            thumbnail: true,
            selector: 'a'
        });
    }
	
	// Sidebar Slimscroll

	if($slimScrolls.length > 0) {
		$slimScrolls.slimScroll({
			height: 'auto',
			width: '100%',
			position: 'right',
			size: '7px',
			color: '#ccc',
			allowPageScroll: false,
			wheelStep: 10,
			touchScrollStep: 100
		});
		var wHeight = $(window).height() - 60;
		$slimScrolls.height(wHeight);
		$('.sidebar .slimScrollDiv').height(wHeight);
		$(window).resize(function() {
			var rHeight = $(window).height() - 60;
			$slimScrolls.height(rHeight);
			$('.sidebar .slimScrollDiv').height(rHeight);
		});
	}
	
	// Small Sidebar

	$(document).on('click', '#toggle_btn', function() {
		if($('body').hasClass('mini-sidebar')) {
			$('body').removeClass('mini-sidebar');
			$('.subdrop + ul').slideDown();
		} else {
			$('body').addClass('mini-sidebar');
			$('.subdrop + ul').slideUp();
		}
		setTimeout(function(){ 
			mA.redraw();
			mL.redraw();
		}, 300);
		return false;
	});
	$(document).on('mouseover', function(e) {
		e.stopPropagation();
		if($('body').hasClass('mini-sidebar') && $('#toggle_btn').is(':visible')) {
			var targ = $(e.target).closest('.sidebar').length;
			if(targ) {
				$('body').addClass('expand-menu');
				$('.subdrop + ul').slideDown();
			} else {
				$('body').removeClass('expand-menu');
				$('.subdrop + ul').slideUp();
			}
			return false;
		}
	});

	
})(jQuery);


	const apiUrl = "http://localhost:8086/api/doctor-with-patients";
	const container = document.getElementById('doctor-patient-container');
	// const messageDiv = document.getElementById('message');

	
function trimAppointmentSlotByComma(appointmentSlot) {
    
    const parts = appointmentSlot.split(',', 2); 
    if (parts.length === 2) {
        return {
            date: parts[0].trim(),  // Date part
            time: parts[1].trim()   // Time part
        };
    } else {
        return null;  // If the format doesn't match
    }
}



	async function fetchDoctorPatientData() {
		try {
			const response = await fetch(apiUrl);
			if (response.ok) {
				const {data} = await response.json();
				console.log("responseresponse", data)
  
			//	Display the message
			//	messageDiv.classList.add('message');
			//	messageDiv.innerText = data.message;
  
				// Display doctors and their patients
				data.forEach(doctor => {
					// Create doctor card
					const doctorCard = document.getElementsByClassName('datadiv')[0];
					// doctorCard.classList.add('card');
					doctorCard.setAttribute('id', `doctor-${doctor.doctorId}`); // Add a unique ID for the doctor
  
					// Add doctor details and patient list inside the table
					const doctorTable = `
						<div class="card-body">
							<div class="table-responsive">
								<table class="datatable table table-hover table-center mb-0">
									<thead>
										<tr>
											<th>Doctor Name</th>
											<th>Speciality</th>
											<th>Patient Name</th>
											<th>Apointment Time</th>
											<th>Status</th>
											<th class="text-right">Amount</th>
										</tr>
									</thead>
									<tbody>
										${doctor.patients.length > 0
											? doctor.patients.map(patient => `

												<tr>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm mr-2">
																<img class="avatar-img rounded-circle" src="${doctor.ImageUrl}" alt="Doctor Image">
															</a>
															<a href="profile.html">${doctor.doctorName}</a>
														</h2>
													</td>
													<td>${doctor.specialization}</td>
													<td>
														<h2 class="table-avatar">
															<a href="profile.html" class="avatar avatar-sm mr-2">
																<img class="avatar-img rounded-circle" src="${patient.ImageUrl}" alt="Patient Image">
															</a>
															<a href="profile.html">${patient.patientName}</a>
														</h2>
													</td>
													<td>${patient.ApointmentSlot} <span class="text-primary d-block">${patient.ApointmentSlot}</span></td>
													<td>
														<div class="status-toggle">
															<input type="checkbox" id="status_${patient.patientId}" class="check" ${patient.status === 'completed' ? 'checked' : ''}>
															<label for="status_${patient.patientId}" class="checktoggle">checkbox</label>
														</div>
													</td>
													<td class="text-right">$${patient.paid}</td>
												</tr>
											`).join("")
											: "<tr><td colspan='6'>No patients assigned</td></tr>"
										}
									</tbody>
								</table>
							</div>
						</div>
					`;

					// Append doctor table to the container
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


	// Function to trim the appointment slot by the first comma
function trimAppointmentSlotByComma(appointmentSlot) {
    // Split the string at the first comma
    const parts = appointmentSlot.split(',', 2); // Split into 2 parts at the first comma
    if (parts.length === 2) {
        return {
            date: parts[0].trim(),  // Date part
            time: parts[1].trim()   // Time part
        };
    } else {
        return { date: "", time: "" };  // In case format doesn't match
    }
}


  