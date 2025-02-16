const apiurl = "http://localhost:8086/reviews/allreviews";
const container = document.getElementById('review');

async function fetchreviewdata() {
    try {
        const response = await fetch(apiurl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("API response:", result); // Log full response for debugging

        // Check if result contains 'data' and it is an array
        if (!result || !result.data || !Array.isArray(result.data)) {
            console.error("Invalid API response format. Expected an array inside 'data':", result);
            return;
        }

        const reviews = result.data; // Now safe to extract

        // Clear existing content
        container.innerHTML = "";

        reviews.forEach(review => {
            const reviewCard = document.createElement("tr"); // Create row instead of div
            reviewCard.setAttribute("id", `review-${review.id}`);

            reviewCard.innerHTML = `
                <td>
                    <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2">
                            <img class="avatar-img rounded-circle" src="${review.patientimg || 'img/default-avatar.jpg'}" alt="User Image">
                        </a>
                        <a href="profile.html">${review.patient}</a>
                    </h2>
                </td>
                <td>
                    <h2 class="table-avatar">
                        <a href="profile.html" class="avatar avatar-sm mr-2">
                            <img class="avatar-img rounded-circle" src="${review.doctorimg || 'img/default-avatar.jpg'}" alt="User Image">
                        </a>
                        <a href="profile.html">${review.doctor}</a>
                    </h2>
                </td>
                <td>${generateStars(review.rating)}</td>
                <td>${review.description}</td>
                <td>${formatDate(review["date&time"])}</td>
                <td class="text-right">
                    <div class="actions">
                        <a class="btn btn-sm bg-danger-light" data-toggle="modal" href="#delete_modal" onclick="deleteReview('${review.id}')">
                            <i class="fe fe-trash"></i> Delete
                        </a>
                    </div>
                </td>`;

            container.appendChild(reviewCard);
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

// Utility function to generate stars based on rating
function generateStars(rating) {
    let stars = "";
    for (let i = 0; i < 5; i++) {
        stars += i < rating 
            ? `<i class="fas fa-star text-warning"></i>`  // Filled star
            : `<i class="far fa-star text-warning"></i>`; // Empty star
    }
    return stars;
}


// Utility function to format date
function formatDate(dateString) {
    if (!dateString) return "N/A"; // Handle missing date
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
}

// Call the function to fetch data
fetchreviewdata();
