document.addEventListener('DOMContentLoaded', function () {
    const addLinkBtn = document.getElementById('show-add-link-popup');
    const addLinkPopup = document.getElementById('add-link-popup');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    addLinkBtn.addEventListener('click', function () {
        addLinkPopup.style.display = 'flex';
        populateCategories();
    });

    closeBtn.addEventListener('click', function () {
        addLinkPopup.style.display = 'none';
    });

    cancelBtn.addEventListener('click', function () {
        addLinkPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == addLinkPopup) {
            addLinkPopup.style.display = 'none';
        }
    });

    const addLinkForm = document.getElementById('add-link-form');
    addLinkForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('link-id').value;
        const category = document.getElementById('category').value;
        const linkName = document.getElementById('link-name').value;
        const linkUrl = document.getElementById('link-url').value;

        let links = JSON.parse(localStorage.getItem('links')) || [];

        if (id) {
            // Update existing link
            links = links.map(link => link.id === id ? { id, category, linkName, linkUrl } : link);
        } else {
            // Add new link
            const newLink = { id: Date.now().toString(), category, linkName, linkUrl };
            links.push(newLink);
        }

        localStorage.setItem('links', JSON.stringify(links));

        // Close popup
        addLinkPopup.style.display = 'none';
        addLinkForm.reset();
        loadLinks();
    });

    function populateCategories() {
        const categorySelect = document.getElementById('category');
        categorySelect.innerHTML = '';
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    function loadCategories() {
        const categoriesGrid = document.getElementById('categories-grid');
        categoriesGrid.innerHTML = '';
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'grid-item';
            categoryDiv.innerText = category;
            categoryDiv.addEventListener('click', function () {
                window.location.href = `category.html?category=${encodeURIComponent(category)}`;
            });
            categoriesGrid.appendChild(categoryDiv);
        });
    }

    loadCategories();
});
