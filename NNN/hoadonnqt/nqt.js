function generateInvoice() {
    const form = document.getElementById('invoiceForm');
    const table = document.getElementById('invoiceTable');

    let tableHTML = `
        <tr>
            <th>Thông tin</th>
            <th>Giá trị</th>
        </tr>
    `;

    for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];
        if (element.tagName !== 'BUTTON') {
            tableHTML += `
                <tr>
                    <td>${element.previousElementSibling.textContent}</td>
                    <td>${element.value}</td>
                </tr>
            `;
        }
    }

    tableHTML += `
        <tr>
            <th colspan="2">Danh sách sản phẩm</th>
        </tr>
        <tr>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Thành tiền</th>
        </tr>
    `;

    let totalAmount = 0;
    const products = document.querySelectorAll('#productList li');
    products.forEach(product => {
        const inputs = product.querySelectorAll('input');
        const name = inputs[0].value;
        const quantity = parseInt(inputs[1].value);
        const price = parseFloat(inputs[2].value);
        const subtotal = quantity * price;
        totalAmount += subtotal;

        tableHTML += `
            <tr>
                <td>${name}</td>
                <td>${quantity}</td>
                <td>${price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
                <td>${subtotal.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
            </tr>
        `;
    });

    tableHTML += `
        <tr>
            <th colspan="3">Tổng cộng</th>
            <td class="total-amount">${totalAmount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>
        </tr>
    `;

    table.innerHTML = tableHTML;

    // Thêm thông báo mà không hiển thị hóa đơn ngay
    alert("Hóa đơn đã được lưu.");
    
    // Chờ cho đến khi người dùng bấm vào nút để xem hóa đơn
    const invoiceContainer = document.getElementById('invoiceContainer');
    invoiceContainer.style.display = 'none'; // Ẩn hóa đơn
}
