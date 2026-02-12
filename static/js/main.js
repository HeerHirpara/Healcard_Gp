// Auto-dismiss alerts after 1.5 seconds
function autoDismissAlerts() {
    const alerts = document.querySelectorAll('.alert-success, .alert-danger');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.classList.add('alert-fade-out');
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 1500);
    });
}

// JavaScript functions for doctor dashboard functionality

function showPatientsList() {
    window.location.href = '/doctor/patients';
}

function consultPatients() {
    window.location.href = '/doctor/notifications';
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        fetch(`/cancel_appointment/${appointmentId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Appointment cancelled successfully');
                location.reload();
            } else {
                alert('Error cancelling appointment: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error cancelling appointment');
        });
    }
}

function showAppointmentDetails(appointmentId) {
    // This could be implemented to show appointment details modal
    console.log('Show appointment details for:', appointmentId);
}

// Function for deleting appointments by date (called from notifications page)
function deleteAppointmentsByDate(event) {
    event.preventDefault();

    const dateInput = document.getElementById('deleteDate');
    const selectedDate = dateInput.value;

    if (!selectedDate) {
        alert('Please select a date');
        return;
    }

    if (confirm(`Are you sure you want to delete all appointments for ${selectedDate}?`)) {
        fetch('/delete_appointments_by_date', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `date=${selectedDate}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                location.reload();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error deleting appointments');
        });
    }
}
