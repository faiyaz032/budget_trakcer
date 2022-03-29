let db;

const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function (event) {
   const db = event.target.result;
   db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function (event) {
   db = event.target.result;
};

request.onerror = function (event) {
   console.log(event.target.errorCode);
};

function saveTransactionOffline(record) {
   const transaction = db.transaction(['new_transaction'], 'readwrite');
   const budgetObjectStore = transaction.objectStore('new_transaction');
   budgetObjectStore.add(record);
}

function uploadTransaction() {
   const transaction = db.transaction(['new_transaction'], 'readwrite');
   const budgetObjectStore = transaction.objectStore('new_transaction');
   const getAll = budgetObjectStore.getAll();

   getAll.onsuccess = async function () {
      if (getAll.result.length > 0) {
         try {
            const response = await fetch('/api/transaction', {
               method: 'POST',
               body: JSON.stringify(getAll.result),
               headers: {
                  Accept: 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
               },
            });

            if (response.message) {
               throw new Error(response);
            }

            const transaction = db.transaction(['new_transaction'], 'readwrite');

            const budgetObjectStore = transaction.objectStore('new_transaction');

            budgetObjectStore.clear();

            alert('Transaction saved successfully on the database.');
         } catch (error) {
            console.log(error);
         }
      }
   };
}

window.addEventListener('online', uploadTransaction);
