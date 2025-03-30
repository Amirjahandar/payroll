function displayImage() {
    const year = 1403;
    const month = 10;
    
    fetch(`/payroll/${year}/${month}/`, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',  // برای اطمینان از درخواست AJAX
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.image_base64) {
            document.getElementById("paySlipImage").src = "data:image/png;base64," + data.image_base64;
            document.getElementById("paySlipImage").style.display = "block";
        } else {
            alert("تصویر یافت نشد!");
        }
    })
    .catch(error => console.error("خطا در دریافت تصویر:", error));
}


// -----------------------------------------------

// Persian months array
const persianMonths = [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

// Get current Persian year
function getCurrentPersianYear() {
    const today = new Date();
    const gregorianYear = today.getFullYear();
    const gregorianMonth = today.getMonth() + 1;
    
    // Rough estimation of Persian year
    // This is a simple approximation - for precise conversion you'd need a proper library
    let persianYear = gregorianYear - 621;
    if (gregorianMonth < 3) {
        persianYear--;
    }
    
    return persianYear;
}

// Initialize select elements
function initializeSelects() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const currentYear = getCurrentPersianYear();
    
    // Populate years (5 years before and after current year)
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === currentYear) {
            option.selected = true;
        }
        yearSelect.appendChild(option);
    }
    
    // Populate months
    persianMonths.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = month;
        monthSelect.appendChild(option);
    });
}

// Update selected date display
function updateSelectedDate() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const selectedDateElement = document.getElementById('selectedDate');
    
    const year = yearSelect.value;
    const monthIndex = parseInt(monthSelect.value) - 1;
    const monthName = persianMonths[monthIndex];
    
    selectedDateElement.textContent = `${year} / ${monthName}`;
}

// Download image function
async function downloadImage() {
    const img = document.getElementById('displayImage');
    try {
        const response = await fetch(img.src);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'calendar-image.jpg';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}

// Print image function
function printImage() {
    window.print();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeSelects();
    updateSelectedDate();
    
    // Add event listeners
    document.getElementById('yearSelect').addEventListener('change', updateSelectedDate);
    document.getElementById('monthSelect').addEventListener('change', updateSelectedDate);
    
    document.getElementById('submitBtn').addEventListener('click', () => {
        const year = document.getElementById('yearSelect').value;
        const month = document.getElementById('monthSelect').value;
        console.log(`Selected Date: ${year}/${month}`);
        
        // Show image section
        document.getElementById('imageSection').style.display = 'block';
    });
});