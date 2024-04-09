let savedOrders;

document.addEventListener('DOMContentLoaded', function() {
    const recordsPerPage = 5;
    let currentPage = 1;

    function displayOrders(currentPage, savedOrders) {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const paginatedOrders = savedOrders.slice(startIndex, endIndex);

        document.getElementById('orderTableBody').innerHTML = '';
        paginatedOrders.forEach((orderData, index) => {
            const orderTableRow = `
                <tr>
                    <td>${startIndex + index + 1}</td>
                    <td>${orderData.routeName}</td>
                    <td>${orderData.date}</td>
                    <td>${orderData.cost}</td>
                    <td>
                        <button type="button" class="btn btn-primary mx-auto viewBtn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Просмотр</button>
                        <button class="cancelBtn btn btn-danger">Отменить</button>
                    </td>
                </tr>
            `;
            document.getElementById('orderTableBody').innerHTML += orderTableRow;
        });

        document.querySelectorAll('.viewBtn').forEach((btn, index) => {
            btn.addEventListener('click', function() {
                viewOrder(index);
            });
        });

        document.querySelectorAll('.cancelBtn').forEach((btn, index) => {
            btn.addEventListener('click', function() {
                cancelOrder(startIndex + index, savedOrders);
            });
        });
    }

    savedOrders = sessionStorage.getItem('orders');
    if (savedOrders) {
        savedOrders = JSON.parse(savedOrders);

        const totalPages = Math.ceil(savedOrders.length / recordsPerPage);

        displayOrders(currentPage, savedOrders);

        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';
        const pagination = document.createElement('ul');
        pagination.classList.add('pagination');

        for (let i = 1; i <= totalPages; i++) {
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');

            const pageLink = document.createElement('button');
            pageLink.textContent = i;
            pageLink.classList.add('page-link');
            pageLink.addEventListener('click', function() {
                currentPage = i;
                displayOrders(currentPage, savedOrders);
            });

            pageItem.appendChild(pageLink);
            pagination.appendChild(pageItem);
        }

        paginationContainer.appendChild(pagination);
    }
});

function viewOrder(index) {
    const orderId = index;
    const orderData = savedOrders[orderId];

    const modalBody = document.getElementById('viewOrderModalBody');
    modalBody.innerHTML = `
        <p><strong>ФИО гида:</strong> ${orderData.guideName}</p>
        <p><strong>Название маршрута:</strong> ${orderData.routeName}</p>
        <p><strong>Дата экскурсии:</strong> ${orderData.date}</p>
        <p><strong>Время начала:</strong> ${orderData.startTime}</p>
        <p><strong>Длительность:</strong> ${orderData.duration} часа(ов)</p>
        <p><strong>Количество человек:</strong> ${orderData.peopleCount}</p>
        <p><strong>Дополнительные опции:</strong></p>
        <ul>
            <li>${orderData.metroTransfer ? 'Быстрый выезд гида (в течение часа).' : 'Быстрый выезд гида (в течение часа).'}</li>
            <li>${orderData.interactiveGuide ? 'Трансфер до ближайших станций метро после экскурсии.' : 'Трансфер до ближайших станций метро после экскурсии.'}</li>
        </ul>
        <p><strong>Итоговая стоимость:</strong> ${orderData.cost}₽</p>
    `;

    const viewOrderModal = new bootstrap.Modal(document.getElementById('viewOrderModal'));
    viewOrderModal.show();
}

function cancelOrder(orderId, savedOrders) {
    savedOrders.splice(orderId, 1);
    sessionStorage.setItem('orders', JSON.stringify(savedOrders));
    displayOrders(currentPage, savedOrders);
}