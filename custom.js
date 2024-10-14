document.addEventListener("DOMContentLoaded", () => {
    const bookGrid = document.getElementById("bookGrid");
    const searchInput = document.getElementById("searchInput");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const nextpage = document.getElementById("nextpage");
    const prevpage = document.getElementById("prevpage");

    const booksPerPage = 20; // Number of books per page
    let currentPage = 1; // Current page
    
    // Fetch books for the specified page
    const fetchBooks = async (page = 1) => {
        loadingSpinner.classList.remove('hidden'); 
        if(page == 1){
            prevpage.classList.add('hidden');
    
        }
        if(page > 1){
            prevpage.classList.remove('hidden');
        }// Show loading
        try {
            let url = `https://gutendex.com/books/?page=${page}`; // Use the page number in the URL
            
            const response = await fetch(url);
            const data = await response.json();

            // Hide loading spinner
            loadingSpinner.classList.add('hidden');

            // Store books data
            const totalBooks = data.count; // Total number of books

            // Display books and setup pagination based on the fetched data
            displayBooks(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    
    nextpage.addEventListener("click", function() {
        currentPage++
        loadingSpinner.classList.remove('hidden');
        bookGrid.innerHTML = ''; 
        fetchBooks(currentPage)

        // fetchBooks(); // Call the function when clicked
      });
      prevpage.addEventListener("click", function() {
        
        
            currentPage--
            prevpage.classList.remove('hidden');
            loadingSpinner.classList.remove('hidden');
            bookGrid.innerHTML = ''; 
            fetchBooks(currentPage)

        

        // fetchBooks(); // Call the function when clicked
      });

    

    // Display books for the current page
    const displayBooks = (books) => {
        bookGrid.innerHTML = ''; 
            books.forEach((book, index) => {
                const { title, authors, formats,id,subjects } = book;
                const authorName = authors.length > 0 ? authors[0].name : "Unknown Author";
               
                const bookImage = formats['image/jpeg'] || 'https://via.placeholder.com/150';
    
                const card = document.createElement("div");
                card.classList.add("card");
    
                card.innerHTML = `
                    <img src="${bookImage}" alt="${title}" />
                    <h2>${title}</h2>
                    <p>ID: ${id}</p>
                    <p>Author: ${authorName} </p>
                    <p>Genre: ${subjects[2]} </p>
                    <img src="./icons/unlove.png" alt="love icon">
                `;
    
                bookGrid.appendChild(card);
    
                // Add fade-in animation after small delay to create smooth effect
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }

        
    

    // Setup pagination based on the number of books
    

    // Search function
    searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        currentPage = 1;  // Fetch books with the search term
    });

    // Initial fetch
    fetchBooks(1);
});
