document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".subtitle-list .subtitle-item");
  let currentIndex = 0;

  if (items.length === 0) return;

  // Установить первый элемент как видимый
  items[currentIndex].classList.add("visible");

  setInterval(() => {
    // Удаляем класс visible с текущего элемента
    items[currentIndex].classList.remove("visible");

    // Переходим к следующему элементу
    currentIndex = (currentIndex + 1) % items.length;

    // Добавляем класс visible к следующему элементу
    items[currentIndex].classList.add("visible");
  }, 20000); // 20 секунд
});
