
document.addEventListener("DOMContentLoaded", () => {
  const bookGrid = document.getElementById("bookGrid");
  const searchInput = document.getElementById("searchInput");
  const loadingSpinner = document.getElementById("loadingSpinner");
  const nextpage = document.getElementById("nextpage");
  const prevpage = document.getElementById("prevpage");
  const dropdown = document.getElementById("drpdwn");
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
  });
  let mybooks = [];
  let allBooks = [];
  
  const booksPerPage = 20; 
  let currentPage = 1;
  let clickedwishicon = false;
  let allgenres = [];

  
  const populateDropdown = (genres) => {
    dropdown.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = ""; 
    defaultOption.textContent = "Filter by genre"; 
    dropdown.appendChild(defaultOption); 

 
    genres.forEach((genre) => {
      if (genre) {
     
        const option = document.createElement("option");
        option.value = genre; 
        option.textContent = genre; 
        dropdown.appendChild(option); 
      }
    });
  };
  let FinalWishList=[]

  const fetchBooks = async (page = 1, searchterm = "") => {
    loadingSpinner.classList.remove("hidden");
   
    console.log("Final Wishlist:", FinalWishList);
    let cpage = parseInt(localStorage.getItem("currentpagenumber"), 10);

    if (Number.isNaN(cpage) || cpage <= 0) {
      cpage = 1;
      localStorage.setItem("currentpagenumber", cpage);
    }
   
    
    if (cpage == 1) {
      prevpage.classList.add("hidden");
    }
    if (cpage > 1) {
      prevpage.classList.remove("hidden");
    } 
    try {
      let url = `https://gutendex.com/books/?page=${cpage}`;

      const response = await fetch(url);
      let data = await response.json();
 
    allBooks = data.results
  
      
      loadingSpinner.classList.add("hidden");

     
      const totalBooks = data.count; 

      mybooks = [
        ...new Set(
          data.results
            .map((book) => book.subjects[2])
            .filter((subject) => subject !== undefined) 
        ),
      ];
      

      populateDropdown(mybooks);
      displayBooks(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubjectChange = () => {
    const selectedSubject = dropdown.value;
    if (selectedSubject !== "") {
      let copyofallbooks = allBooks;
      const filteredBooks = filterBooksBySubject(
        selectedSubject,
        copyofallbooks
      );
      displayBooks(filteredBooks);
      console.log(filteredBooks);
    } else {
      displayBooks(allBooks);
      console.log(allBooks);
    }
  };
  document
    .getElementById("drpdwn")
    .addEventListener("change", handleSubjectChange);

  nextpage.addEventListener("click", function () {
    currentPage++;
    localStorage.setItem("currentpagenumber", currentPage);
    loadingSpinner.classList.remove("hidden");
    bookGrid.innerHTML = "";
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
    fetchBooks(currentPage);
  });
  prevpage.addEventListener("click", function () {
    currentPage--;
    localStorage.setItem("currentpagenumber", currentPage);
    prevpage.classList.remove("hidden");
    loadingSpinner.classList.remove("hidden");
    bookGrid.innerHTML = "";
    fetchBooks(currentPage);
  });
 
  
  const displayBooks = (books) => {
    bookGrid.innerHTML = ""; 
    let finalWishlist = JSON.parse(localStorage.getItem('finalwishlist')) || []; 
  
    books.forEach((book, index) => {
        const { title, authors, formats, id, subjects,bookshelves } = book;
        const authorName = authors.length > 0 ? authors[0].name : "Unknown Author";
        const bookImage = formats["image/jpeg"] || "https://via.placeholder.com/150";
  
        const card = document.createElement("div");
        card.classList.add("card");
  
       
        const isInWishlist = finalWishlist.some((item) => item.id === book.id);
  
       
        card.innerHTML = `
            <div class="d-flex mb-5 align-items-center justify-right">
                <p class="wishpara">${isInWishlist ? "Remove from wishlist" : "Add to wishlist"}</p>
                <img id="wishicon-${index}" class="wishicon" src="${isInWishlist ? "./icons/love.png" : "./icons/unlove.png"}" alt="love icon">
            </div>
            <img src="${bookImage}" alt="${title}" class="book-image" />
            <h2 class="book-title">${title}</h2>
            <p>ID: ${id}</p>
            <p>Author: ${authorName}</p>
            <p>Genre: ${subjects[2]}</p>
        `;
  
        bookGrid.appendChild(card);
  
        const wishicon = document.getElementById(`wishicon-${index}`);
        const wishText = card.querySelector(".wishpara");
  
        wishicon.addEventListener("click", function () {
            let isID = finalWishlist.find((item) => item.id === book.id);
  
            if (isID) {
                finalWishlist = finalWishlist.filter((item) => item.id !== book.id);
                wishicon.src = "./icons/unlove.png"; 
                wishText.textContent = "Add to wishlist";
            } else {
           
                finalWishlist.push(book);
                wishicon.src = "./icons/love.png";
                wishText.textContent = "Remove from wishlist";
            }
  
            localStorage.setItem('finalwishlist', JSON.stringify(finalWishlist));
            fetchfinalwishlist(); 
        });
  
        const modal = document.getElementById("bookModal");
        const modalImage = document.getElementById("modalBookImage");
        const modalTitle = document.getElementById("modalBookTitle");
        const modalID = document.getElementById("modalBookID");
        const modalAuthor = document.getElementById("modalBookAuthor");
        const modalGenre = document.getElementById("modalBookGenre");
        const bookShelves = document.getElementById("bookShelves");
        const closeModal = document.querySelector(".close-modal");
  
        const openModal = () => {
            modal.classList.add("fade-in");
            modalImage.src = bookImage;
            modalTitle.textContent = title;
            modalID.textContent = `ID: ${id}`;
            modalAuthor.textContent = `Author: ${authorName}`;
            modalGenre.textContent = `<b>Genre:</b> ${subjects}`;
            bookShelves.textContent = `BookShelves: ${bookshelves}`;
            modal.style.display = "flex"; 
        };
  
        const closeModalFunc = () => {
            modal.classList.remove("fade-in");
            modal.style.display = "none";
        };
  
        card.querySelector(".book-image").addEventListener("click", openModal);
        card.querySelector(".book-title").addEventListener("click", openModal);
  
        closeModal.addEventListener("click", closeModalFunc);
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModalFunc();
            }
        });
        setTimeout(() => {
            card.classList.add("fade-in");
        }, index * 100);
    });
};


  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    currentPage = 1; 
    const filteredBooks = filterBooks(searchTerm); 
  });

 
  const filterBooks = (searchTerm) => {
    return allBooks.filter((book) => {
      return book.title.toLowerCase().includes(searchTerm);
    });
  };
  const filterBooksBySubject = (optionValue, copyofallbooks) => {
    return copyofallbooks.filter((book) => book.subjects[2] === optionValue);
  };

 
  fetchBooks(1);

 
  
  function fetchfinalwishlist() {
    let wishlistArrlocal = JSON.parse(localStorage.getItem('wishlist')) || [];
    let final = JSON.parse(localStorage.getItem('finalwishlist')) || [];
  
    wishlistArrlocal.forEach((book) => {
      const existsInFinal = final.find((item) => item.id === book.id);
      if (!existsInFinal) {
        final.push(book);
      }
    });
    localStorage.setItem('finalwishlist', JSON.stringify(final));
    
    console.log("Final wishlist:", final);
  }
  
  fetchfinalwishlist();
});
