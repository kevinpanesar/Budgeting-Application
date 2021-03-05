window.onload = function () {

  let reset = document.getElementById('resetButton');
  let expenseTotal = document.getElementById('Expenses');
  let value;
  let budget = document.getElementById('budgetValue');
  let totalExpense = [];
  let balance = document.getElementById('balance');
  let totalAmountExpenses = document.getElementById('totalExpenseAmount');

  //Function used to update monthly budget section
  monthlyBudgetButton.onclick = () => {
    if (value == null) {

      value = document.getElementById('monthlyBudget').value;
      let num = parseInt(value, 10);

      if (isNaN(num) || num < 1) {
        alert('Please Enter A Number');
      }
      else {
        //Adding the budget value to the budget and remaining balance column
        budget.innerHTML = '$' + num;
        balance.innerHTML = '$' + num;
        //If user inserts expenses before entering monthly budget
        expenseTotal.innerHTML = '$' + totalExpense.reduce((a, b) => a + b, 0);
        balance.innerHTML = '$' + (value - totalExpense.reduce((a, b) => a + b, 0));
      }
    }
    else {
      alert("Please reset application to change monthly budget");
      return;
    }
  }

  //Function used to add expenses
  expenseButton.onclick = () => {

    let expense = document.getElementById('expense').value;
    let amount = document.getElementById('amount').value

    //Clear textbox after submission
    document.getElementById('expense').value = '';
    document.getElementById('amount').value = '';

    //updating total amount of expenses.
    totalAmountExpenses.innerHTML = 'Total Number of Expenses: ' + Number(totalExpense.length + 1);

    // Creating row to add to the table
    let tableRow = document.createElement('tr');

    //Input validation for expenses
    if (expense.match(/^[A-Za-z]+$/)) {

      //Creating and assigning expense name
      let expenseName = document.createElement('td');
      expenseName.innerHTML = expense;
      tableRow.appendChild(expenseName);
    }
    else {
      alert('Please enter only letters');
      return;
    }

    //Input validation for amount input
    if (isNaN(amount) || amount < 1) {
      alert('Please enter a number');
      return;
    }
    else {

      //Creating and assigning expense amount
      let expenseAmount = document.createElement('td');
      let value = document.getElementById('monthlyBudget').value;

      expenseAmount.innerHTML = '$' + amount;
      tableRow.appendChild(expenseAmount);

      //Pushing expenses into array and totaling values
      totalExpense.push(Number(amount));
      expenseTotal.innerHTML = '$' + totalExpense.reduce((a, b) => a + b, 0);
      balance.innerHTML = '$' + (value - totalExpense.reduce((a, b) => a + b, 0));

      //Tells user they have gone over there budget and turns remaining balance red
      if (value - totalExpense.reduce((a, b) => a + b, 0) < 0) {
        balance.style.color = 'red';
        alert('You have gone over your budget')
      }
    }


    //Creating delete button for table
    let expenseDeleteButton = document.createElement('button');
    let expenseDeleteButtonTD = document.createElement('td');
    expenseDeleteButtonTD.appendChild(expenseDeleteButton);

    expenseDeleteButton.addEventListener("click", function () {
      let value = document.getElementById('monthlyBudget').value;
      let i = expenseDeleteButtonTD.parentElement.rowIndex;
      document.getElementById('table').deleteRow(i);
      totalExpense.splice(i - 1, 1);
      expenseTotal.innerHTML = '$' + totalExpense.reduce((a, b) => a + b, 0);
      balance.innerHTML = '$' + (value - (totalExpense.reduce((a, b) => a + b, 0)));
      totalAmountExpenses.innerHTML = 'Total Number of Expenses: ' + Number(totalExpense.length);
    });


    //Adding table data to table row
    tableRow.appendChild(expenseDeleteButtonTD);
    expenseDeleteButton.innerHTML = 'Delete';
    document.getElementById('table').appendChild(tableRow);
  }

  //Resets the application
  reset.onclick = () => {
    window.location.reload();
  }
}
