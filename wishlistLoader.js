document.addEventListener("DOMContentLoaded", () => {
    const wishlistGrid = document.getElementById("wishlistGrid");
    const searchInput = document.getElementById("searchInput");
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

    // const displayBooks = (books) => {
      
    //     wishlistGrid.innerHTML = ""
    //     let finalWishlist = JSON.parse(localStorage.getItem('finalwishlist')) || [];
      
    //     books.forEach((book, index) => {
    //       const { title, authors, formats, id, subjects } = book;
    //       const authorName = authors.length > 0 ? authors[0].name : "Unknown Author";
    //       const bookImage = formats["image/jpeg"] || "https://via.placeholder.com/150";
      
    //       const card = document.createElement("div");
    //       card.classList.add("card");
      
    //       const isInWishlist = finalWishlist.some((item) => item.id === book.id);
      
          
    //       card.innerHTML = `
    //         <div class="d-flex mb-5 align-items-center justify-right">
    //             <p class="wishpara">${
    //               isInWishlist ? "Remove from wishlist" : "Add to wishlist"
    //             }</p>
    //             <img id="wishicon-${index}" class="wishicon" src="${
    //               isInWishlist ? "./icons/love.png" : "./icons/unlove.png"
    //             }" alt="love icon">
    //         </div>
    //         <img src="${bookImage}" alt="${title}" />
    //         <h2>${title}</h2>
    //         <p>ID: ${id}</p>
    //         <p>Author: ${authorName}</p>
    //         <p>Genre: ${subjects[2]}</p>
    //       `;
      
    //       wishlistGrid.appendChild(card);
         
    //       const wishicon = document.getElementById(`wishicon-${index}`);
    //       const wishText = card.querySelector(".wishpara");
      
    //       wishicon.addEventListener("click", function () {
    //         let isID = finalWishlist.find((item) => item.id === book.id);
      
    //         if (isID) {
            
    //           finalWishlist = finalWishlist.filter((item) => item.id !== book.id);
    //           wishicon.src = "./icons/unlove.png"; 
    //           wishText.textContent = "Add to wishlist";
    //         } else {
             
    //           finalWishlist.push(book);
    //           wishicon.src = "./icons/love.png"; 
    //           wishText.textContent = "Remove from wishlist";
    //         }
      
    //         localStorage.setItem('finalwishlist', JSON.stringify(finalWishlist));
    //         fetchfinalwishlist()
    //       });
      
    //       setTimeout(() => {
    //         card.classList.add("fade-in");
    //       }, index * 100);
    //     });
    //   };
    
    const displayBooks = (books) => {
        wishlistGrid.innerHTML = "";
        let finalWishlist = JSON.parse(localStorage.getItem("finalwishlist")) || [];
      
        books.forEach((book, index) => {
          const { title, authors, formats, id, subjects ,bookshelves} = book;
          const authorName = authors.length > 0 ? authors[0].name : "Unknown Author";
          const bookImage = formats["image/jpeg"] || "https://via.placeholder.com/150";
      
          const card = document.createElement("div");
          card.classList.add("card");
      
          const isInWishlist = finalWishlist.some((item) => item.id === book.id);
      
          card.innerHTML = `
            <div class="d-flex mb-5 align-items-center justify-right">
                <p class="wishpara">${
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }</p>
                <img id="wishicon-${index}" class="wishicon" src="${
                  isInWishlist ? "./icons/love.png" : "./icons/unlove.png"
                }" alt="love icon">
            </div>
            <img src="${bookImage}" alt="${title}" class="book-image"/>
            <h2 class="book-title">${title}</h2>
            <p>ID: ${id}</p>
            <p>Author: ${authorName}</p>
            <p>Genre: ${subjects[2]}</p>
          `;
      
          wishlistGrid.appendChild(card);
      
          const wishicon = document.getElementById(`wishicon-${index}`);
          const wishText = card.querySelector(".wishpara");
      
          // Handle wishlist toggle
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
      
            localStorage.setItem("finalwishlist", JSON.stringify(finalWishlist));
            fetchfinalwishlist();
          });
      
          // Handle modal opening when the image or title is clicked
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
            modalGenre.textContent = `Genre: ${subjects}`;
            bookShelves.textContent = `BookShelves: ${bookshelves}`;
          };
      
          const closeModalFunc = () => {
            modal.classList.remove("fade-in");
            modal.style.display = "none";
          };
      
          card.querySelector(".book-image").addEventListener("click", () => {
            modal.style.display = "flex";
            openModal();
          });
      
          card.querySelector(".book-title").addEventListener("click", () => {
            modal.style.display = "flex";
            openModal();
          });
      
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
      
    
    
      const filterBooks = (searchTerm) => {
        return allBooks.filter((book) => {
          return book.title.toLowerCase().includes(searchTerm);
        });
      };
      const filterBooksBySubject = (optionValue, copyofallbooks) => {
        return copyofallbooks.filter((book) => book.subjects[2] === optionValue);
      };

     
    
    const handleSubjectChange = () => {
      const selectedSubject = dropdown.value;
      localStorage.setItem("selectedSubjectwishlist", selectedSubject); 
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
  
 
  
    if (!wishlistGrid) {
      console.error("wishlistGrid element not found in the DOM.");
      return;
    }
    
    // Call this function when loading the page to display wishlist from localStorage
    function fetchfinalwishlist() {
      // Get final wishlist from local storage or set it to an empty array if not available
      let final = JSON.parse(localStorage.getItem('finalwishlist')) || [];
  
      // Get the persisted selected subject or set it to an empty string if not available
      let persistanseletedvalue = localStorage.getItem("selectedSubjectwishlist") || "";
  
      // Check if a persistent selection exists and is not an empty string
      if (persistanseletedvalue !== "") {
          persitentseletion(); // Call the function to handle persistent selection
      } else {
          // If no persistent selection, proceed with displaying the full wishlist
          localStorage.setItem('finalwishlist', JSON.stringify(final));
          displayBooks(final); // Function to display books on the page
          allBooks = final;
  
          // Extract unique subjects from the books and filter out undefined values
          mybooks = [
              ...new Set(
                  allBooks
                  .map((book) => book.subjects ? book.subjects[2] : undefined) // Handle undefined subjects safely
                  .filter((subject) => subject !== undefined) // Filter out undefined subjects
              ),
          ];
  
          // Populate the dropdown with the unique subjects
          populateDropdown(mybooks);
          console.log("Final wishlist:", final);
      }
  }
  
    
    fetchfinalwishlist();
    
    function persitentseletion (){
      dropdown.value=localStorage.getItem("selectedSubjectwishlist")
      let persistanseletedvalue = localStorage.getItem("selectedSubjectwishlist")
      if(persistanseletedvalue){
        if (persistanseletedvalue !== "") {
          let copyofallbooks = allBooks;
          const filteredBooks = filterBooksBySubject(
            persistanseletedvalue,
            copyofallbooks
          );
          displayBooks(filteredBooks);
          console.log("filteredbookformperselect");
        } else {
          displayBooks(allBooks);
          
          console.log("allbooks");
        }
      }else{
        dropdown.value=""
      }
    }
  
    persitentseletion()
    function searchinputpersist() {
      const savedSearchTerm = localStorage.getItem("searchtermwishlist");
      searchInput.value = savedSearchTerm || ""; // Set input field with saved value or empty string
      
      if (savedSearchTerm && savedSearchTerm !== "") {
        // If there's a saved search term, filter and display the books
        const filteredBooks = filterBooks(savedSearchTerm);
        displayBooks(filteredBooks);
      } else {
        // If no search term is saved, display all books
        displayBooks(allBooks);
      }
    
      // Add event listener to capture and save new search terms
      searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        localStorage.setItem("searchtermwishlist", searchTerm); // Save new search term
        
        if (searchTerm === "") {
          // If search term is empty, display all books
          displayBooks(allBooks);
        } else {
          // Filter and display books based on search term
          const filteredBooks = filterBooks(searchTerm);
          displayBooks(filteredBooks);
        }
      });
    }
    
    searchinputpersist()
  });