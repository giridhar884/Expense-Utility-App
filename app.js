document.getElementById('expenseForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const purpose = document.getElementById('purpose').value;
    const type = document.getElementById('type').value;
    const amount = document.getElementById('amount').value;

    const data = { date, purpose, type, amount };

    // Send an AJAX POST request to add a transaction
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'addTransaction.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status === 200) {
            loadTransactions();  // Reload transactions after adding
        }
    };
    xhr.send(JSON.stringify(data));
});

function loadTransactions() {
    // Send an AJAX GET request to fetch transactions
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'getTransactions.php', true);
    xhr.onload = function () {
        if (this.status === 200) {
            const transactions = JSON.parse(this.responseText);
            let output = '';

            transactions.forEach(function (transaction) {
                output += `
                    <tr>
                        <td>${transaction.date}</td>
                        <td>${transaction.purpose}</td>
                        <td>${transaction.type}</td>
                        <td>${transaction.amount}</td>
                        <td>
                            <button onclick="deleteTransaction(${transaction.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });

            document.getElementById('transactionList').innerHTML = output;
        }
    };
    xhr.send();
}

function deleteTransaction(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'deleteTransaction.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status === 200) {
            loadTransactions();
        }
    };
    xhr.send(JSON.stringify({ id }));
}

// Load transactions on page load
document.addEventListener('DOMContentLoaded', loadTransactions);
