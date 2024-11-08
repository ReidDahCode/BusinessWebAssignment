document.addEventListener('DOMContentLoaded', () => {
    const invoiceData = JSON.parse(sessionStorage.getItem('invoice'));
    if (invoiceData) {
        displayInvoice(invoiceData);
    } else {
        alert('No invoice data available.');
        window.location.href = 'services.html';
    }

    document.getElementById('cancel').addEventListener('click', () => {
        sessionStorage.removeItem('invoice');
        window.location.href = 'services.html';
    });

    document.getElementById('exit').addEventListener('click', () => {
        window.location.href = 'home.html'; // Redirect to home page
    });
});

function displayInvoice(invoice) {
    const invoiceDetails = document.getElementById('invoice-details');
    invoiceDetails.innerHTML = `
        <h3>Selected Services:</h3>
        <ul>
            ${invoice.selectedServices.map(service => `<li>${service.name} - $${service.price.toFixed(2)}</li>`).join('')}
        </ul>
        <p>Subtotal: $${invoice.subtotal.toFixed(2)}</p>
        <p>Discount: $${invoice.discount.toFixed(2)}</p>
        <p>Tax: $${invoice.tax.toFixed(2)}</p>
        <h3>Total: $${invoice.total.toFixed(2)}</h3>
    `;
}
