document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const enrollmentYearInput = document.getElementById('enrollmentYear');

    const API_BASE = 'https://my-library-production.up.railway.app'; // Change this if your backend URL changes in production

    // Pre-fill enrollment year
    if (enrollmentYearInput) {
        enrollmentYearInput.value = new Date().getFullYear();
    }

    if (!registrationForm) return;

    registrationForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Client-side validation
        if (!data.firstName || !data.firstName.trim()) {
            alert('First name is required!');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(data.firstName.trim())) {
            alert('First name can only contain letters and spaces!');
            return;
        }

        if (!data.lastName || !data.lastName.trim()) {
            alert('Last name is required!');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(data.lastName.trim())) {
            alert('Last name can only contain letters and spaces!');
            return;
        }

        if (!data.studentId || !data.studentId.trim()) {
            alert('Student ID is required!');
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(data.studentId.trim())) {
            alert('Student ID can only contain letters and numbers!');
            return;
        }

        if (data.password !== data.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (data.password.length < 8) {
            alert('Password must be at least 8 characters long!');
            return;
        }

        const currentYear = new Date().getFullYear();
        if (data.enrollmentYear < 2000 || data.enrollmentYear > currentYear) {
            alert('Please enter a valid enrollment year!');
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/register-student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Registration submitted successfully! ' + result.message);
                window.location.href = 'student-login.html';
            } else {
                alert('Registration failed: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Network or Server Error:', error);
            alert('Could not connect to the registration server.');
        }
    });
});


