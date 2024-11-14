/*
Задание 1
Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

Реализуйте геттер allBooks, который возвращает текущий список книг.

Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.
*/

class Library {
    #bookList = [];

    constructor (initialBooks = []) {
        if(!Array.isArray(initialBooks)) throw new Error("Список книг должен быть массивом");
        const hasDuplicates = initialBooks.some((book, index, arr) => arr.findIndex(b => b.name === book.name) !== index);

        if(hasDuplicates) throw new Error("В списке есть повторяющиеся книги");
        
        this.#bookList = initialBooks;
    }

    get allBooks() {
        return this.#bookList;
    }

    addBook(book) {
        //Проверяем есть ли в массиве книга с таким же наименованием
        if(this.#bookList.some(obj => obj.name === book.name)) throw new Error("Книга с таким наименованием уже есть");
        this.#bookList.push({id: Math.round(Math.random() * 1000000), ...book});
    }

    removeBook(title) {
        //Длина массива до удаления
        const initialLength = this.#bookList.length;

        //В массив #bookList записываем отфильтрованный массив в который попадут все книги имена которой не равны искомой
        this.#bookList = this.#bookList.filter(book => book.name !== title);

        // Если изначальная величина массива равна длине обновленного после перезаписи массива, то пробрасываем ошибку
        if (this.#bookList.length === initialLength) throw new Error(`Книги с названием ${title} не существует`);
    }

    //Проверяем наличие книги по наименованию
    hasBook(title) {
        return this.#bookList.some(obj => obj.name === title)
    }
}

console.log("Задание 1");

const library = new Library();

const library2 = new Library([{name: "Kolob", description: "lorem24"}, {name: "Kolobok", description: "lorem24"}]);

library.addBook({name: "Kolobok", description: "lorem24"});
library.addBook({name: "kolo", description: "lorem24"});
library.removeBook("kolo");

console.log(library2.allBooks)


/*

Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
{
product: "Apple iPhone 13",
reviews: [
{
id: "1",
text: "Отличный телефон! Батарея держится долго.",
},
{
id: "2",
text: "Камера супер, фото выглядят просто потрясающе.",
},
],
},
{
product: "Samsung Galaxy Z Fold 3",
reviews: [
{
id: "3",
text: "Интересный дизайн, но дорогой.",
},
],
},
{
product: "Sony PlayStation 5",
reviews: [
{
id: "4",
text: "Люблю играть на PS5, графика на высоте.",
},
],
},
];

Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.
*/


const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: "2",
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

const reviewDiplayContainer = document.querySelector('.reviewDiplayBox');
const addReviewForm = document.querySelector('.addReviewForm');
const inputReviewText = document.querySelector('#reviewText');
const errorMsgContainer = document.querySelector('.errorMessage__container');
const productSelect = document.querySelector('.productSelect');


const submitReviewBtn = document.querySelector('#submitReview');
submitReviewBtn.addEventListener('click', addReviewHandler);

//Функция для рендера списка отзывов из массива данных.
function renderReviews() {
    reviewDiplayContainer.innerHTML = '';
    initialData.forEach((productData) => {
        const productContainer = document.createElement('div');
        productContainer.classList.add('product__container');

        const productTitle = document.createElement('h2');
        productTitle.classList.add('product__title');
        productTitle.textContent = productData.product;
        
        const productReviewsContainer = document.createElement('ul');
        productReviewsContainer.classList.add('productReviews___list');

        productData.reviews.forEach((review) => {
            const reviewItem = document.createElement('li');
            reviewItem.classList.add('productReviews___item');

            const reviewId = document.createElement('span');
            reviewId.classList.add('productReviews___id');
            reviewId.textContent = `id ${review.id}:`;

            const reviewText = document.createElement('p');
            reviewText.classList.add('productReviews___text');
            reviewText.textContent = review.text;

            reviewItem.append(reviewId, reviewText);
            productReviewsContainer.appendChild(reviewItem);
        })

        productContainer.appendChild(productTitle);
        productContainer.appendChild(productReviewsContainer);
        reviewDiplayContainer.appendChild(productContainer);
    })
}


function addReview(productName, reviewText) {
    if(reviewText.length < 50 || reviewText > 500) throw new Error("Отзыв должен быть длиной от 50 до 500 символов");

    const productData = initialData.find((prod) => prod.product === productName);
    if (productData) {
        const newReview = {
            id: Date.now(),
            text: reviewText
        }
        productData.reviews.push(newReview);
    }
}

//Обработчик кнопки "Добавить отзыв"
function addReviewHandler() {
  const selectedProducts = productSelect.value;
  const review = inputReviewText.value.trim();
  
  try {
    addReview(selectedProducts, review);
    inputReviewText.value = ''; //Очистка поля ввода
    errorMsgContainer.textContent = ''; // Очистка дива для ошибок
    renderReviews();
  } catch(err) {
    errorMsgContainer.textContent = err.message;
  }
}

function initProductSelect() {
  productSelect.innerHTML = "";
  initialData.forEach((productData) => {
    const option = document.createElement('option');
    option.value = productData.product;
    option.textContent = productData.product;
    productSelect.appendChild(option);
  })
}

function init() {
  initProductSelect();
  renderReviews();
}

init();


