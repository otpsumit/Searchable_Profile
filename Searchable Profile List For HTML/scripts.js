    const resultContainer = document.querySelector('.result-container');
    const divElements = resultContainer.querySelectorAll('.result-div');
    let lastSearchedIndex = -1;

    function search() {
      const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
      if (!searchInput) return; // If search input is empty, return without doing anything

      // Clear old search results
      divElements.forEach(div => {
        div.style.border = 'none';
        div.style.backgroundColor = 'transparent';
        resultContainer.appendChild(div); // Reset the order to the original
      });
      
      
   
      const searchResults = [];

      divElements.forEach(div => {
        const text = div.innerText.toLowerCase();
        if (text.includes(searchInput)) {
          searchResults.push(div);
          div.style.border = '2px solid black';
          div.style.borderRadius = '20px';
          div.style.backgroundColor = '#ffff';
        }
      });

      // Rotate the search results based on the last searched index
      const nextPosition = (lastSearchedIndex + 1) % searchResults.length;
      const reorderedResults = searchResults.slice(nextPosition).concat(searchResults.slice(0, nextPosition));

      // Reverse the search results array to show them in the top position
      reorderedResults.reverse().forEach(result => resultContainer.insertBefore(result, resultContainer.firstChild));

      // Update the last searched index for the next click
      lastSearchedIndex = nextPosition;
    }

    // Trigger search function on clicking the "Search" button
    document.getElementById('searchInput').addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        search();
        event.preventDefault(); // Prevent form submission
      }
    });

    // Open link when clicking on the result element
    function openLink(event) {
      const target = event.target.closest('.result-div');
      const link = target.getAttribute('data-link');
      if (link) {
        window.location.href = link; // Navigates to the link in the same window

        /* for open link in new window 
        window.open(link, '_blank'); // Opens the link in a new tab/window
        */
  }
    }


    // Show popup on div click
    document.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('result-div') && !target.closest('.popup')) {
        const popup = document.getElementById('popup');
        const popupContent = document.getElementById('popupContent');
        popupContent.textContent = target.innerText;
        popup.style.display = 'block';
        event.stopPropagation();
      }
    });

