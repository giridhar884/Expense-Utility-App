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
            clearFields();
        }
    };
    //xhr.onprogress(console.log("Add Transactions on progess called"));
    xhr.send(JSON.stringify(data));
});
//Function to display Credit Balance
function loadCreditBalance(creditBalance){
    document.getElementById("totalCredit").value="NA";
}
//Function to display Debit Balance
function loadDebitBalance(){
    const debitBalanceRequest = new XMLHttpRequest();
    debitBalanceRequest.open('POST', 'getCreditDebitAndBalances.php', true);
    debitBalanceRequest.setRequestHeader('Content-Type', 'application/json');
    debitBalanceRequest.onload = function () {
        if (debitBalanceRequest.status === 200) {
            console.log(this.responseText);
            const debitBalance = JSON.parse(this.responseText);
            document.getElementById("totalDebit").innerHTML=debitBalance;
            //loadCreditBalance(debiltBalance);
            //loadDebitBalance(debiltBalance);
            loadBalance();
        }else{
            console.log("Error Occured");
        }
    };
    var txnType="debit"
    debitBalanceRequest.send(JSON.stringify({txnType}));
}
//Function to display Total Balance
function loadCreditBalance(){
    console.log("Entered Load Credit balance");
    var txnType="credit";
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'getCreditDebitAndBalances.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (this.status === 200) {
            console.log(this.responseText);
            const creditBalance = JSON.parse(this.responseText);
            document.getElementById("totalCredit").innerHTML=creditBalance;
            //loadCreditBalance(creditBalance);
            // loadDebitBalance();
            loadBalance();
        }
    };
    
    xhr.send(JSON.stringify({txnType}));

    
}
function loadBalance(){
    //let credit=document.getElementById("totalCredit").textContent;
    //let debit=document.getElementById("totalDredit").textContent;

    let credit = document.getElementById("totalCredit").textContent;
    let debit= document.getElementById("totalDebit").textContent;
    console.log("Credit Balacne ="+credit);
    console.log("Debit balance ="+debit);
    // if(credit==null){
    //     credit=0;
    // }
    // if(debit==null){
    //     debit=0;
    // }
    document.getElementById("balance").innerHTML=credit-debit;
}
function loadCreditDebitAndBalance(){
    console.log("Entered loadCreditDebitAndBalance");
    loadCreditBalance();
    loadDebitBalance();
    //loadBalance();

}

function loadTransactions() {
    console.log("Load Transactions called");
    // Send an AJAX GET request to fetch transactions
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'getTransactions.php', true,txnType="credit");
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
    console.log("Delete Transaction Called");
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
function clearFields(){
    document.getElementById("expenseForm").reset();
}

// Load transactions on page load
document.addEventListener('DOMContentLoaded', loadTransactions);
//Load total Credit and debit and balance on Pageload
document.addEventListener('DOMContentLoaded', loadCreditDebitAndBalance);
txnTable=document.getElementById("transactionTable");
//txnTable.addEventListener('change',loadCreditDebitAndBalance);

//Experimental Code****************************************************

const mutationCallback = (mutationsList, observer) => {
    loadCreditBalance();
    loadDebitBalance();
    //loadBalance();
  };

  // Create a new MutationObserver instance with the callback function
  const observer = new MutationObserver(mutationCallback);

  // Set the options for the observer
  const config = {
    childList: true,  // Listen for changes to the direct children (rows)
    subtree: true,    // Also observe changes to all descendants (cells, etc.)
  };

  // Start observing the table for configured mutations
  observer.observe(txnTable, config);
