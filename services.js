const services = [ 
    { 
        name: "Resume Creation and Optimization", 
        price: 100, 
        description: "Start with an initial consultation to understand the client’s experience, strengths, and career goals. Offer formats and layouts tailored to their industry, emphasizing clarity and impact."
    },
    { 
        name: "Cover Letter Writing", 
        price: 50, 
        description: "Write custom cover letters that speak to the job posting, showcasing the client’s unique qualifications and aligning their experience with the job requirements."
    },
    { 
        name: "LinkedIn Profile Optimization", 
        price: 75, 
        description: "Enhance clients’ LinkedIn profiles to complement their resumes, with optimized language, skills, and a professional tone."
    },
    { 
        name: "Career Change Package", 
        price: 150, 
        description: "Tailored for those switching industries or roles, this package could include a resume rewrite, cover letter, and strategic career advice."
    }
];

const selectedServices = [];

document.querySelectorAll('.service-item input').forEach(input => {
    input.addEventListener('change', (e) => {
        const service = services.find(service => service.name === e.target.value);
        if (e.target.checked) {
            selectedServices.push(service);
        } else {
            const index = selectedServices.indexOf(service);
            if (index > -1) {
                selectedServices.splice(index, 1);
            }
        }
    });
});

document.getElementById('checkout').addEventListener('click', () => {
    if (selectedServices.length > 0) {
        calculateInvoice();
        window.location.href = 'invoice.html';
    } else {
        alert('Please select at least one service.');
    }
});

document.getElementById('exit').addEventListener('click', () => {
    window.close();
});

document.getElementById('cancel').addEventListener('click', () => {
    document.querySelectorAll('.service-item input').forEach(input => input.checked = false);
    selectedServices.length = 0;
});

function calculateInvoice() {
    const TAX_RATE = 0.07;
    const DISCOUNT_RATE = 0.1;

    const subtotal = selectedServices.reduce((total, service) => total + service.price, 0);
    const discount = subtotal * DISCOUNT_RATE;
    const tax = (subtotal - discount) * TAX_RATE;
    const total = subtotal - discount + tax;

    sessionStorage.setItem('invoice', JSON.stringify({
        selectedServices,
        subtotal,
        discount,
        tax,
        total
    }));
}
