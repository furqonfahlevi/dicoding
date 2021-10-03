document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("form");
  const autoReset = document.getElementsByClassName("reset-btn");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addNewBook();
    autoReset[0].click();
  });

  if (checkStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data saved successfully.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
