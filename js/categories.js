document.addEventListener('DOMContentLoaded', function () {
    const addCategoryBtn = document.getElementById('show-add-category-popup');
    const addCategoryPopup = document.getElementById('add-category-popup');
    const closeBtn = document.querySelector('.close-btn');
    const cancelCategoryBtn = document.getElementById('cancel-category-btn');
    const exportCategoriesBtn = document.getElementById('export-categories');
    const importCategoriesInput = document.getElementById('import-categories');
    const importCategoriesBtn = document.getElementById('import-categories-btn');

    addCategoryBtn.addEventListener('click', function () {
        addCategoryPopup.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function () {
        addCategoryPopup.style.display = 'none';
    });

    cancelCategoryBtn.addEventListener('click', function () {
        addCategoryPopup.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target == addCategoryPopup) {
            addCategoryPopup.style.display = 'none';
        }
    });

    const addCategoryForm = document.getElementById('add-category-form');
    addCategoryForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const categoryId = document.getElementById('category-id').value;
        const categoryName = document.getElementById('category-name').value;

        let categories = JSON.parse(localStorage.getItem('categories')) || [];

        if (categoryId) {
            // Update existing category
            categories = categories.map(cat => cat === categoryId ? categoryName : cat);
        } else {
            // Add new category
            if (!categories.includes(categoryName)) {
                categories.push(categoryName);
            }
        }

        localStorage.setItem('categories', JSON.stringify(categories));

        // Close popup
        addCategoryPopup.style.display = 'none';
        addCategoryForm.reset();
        loadCategories();
    });

    function loadCategories() {
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = '';
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'grid-item';
            categoryDiv.innerHTML = `
                <span>${category}</span>
                <button class="edit-category-btn" data-category="${category}">Edit</button>
                <button class="delete-category-btn" data-category="${category}">Delete</button>
            `;
            const editBtn = categoryDiv.querySelector('.edit-category-btn');
            const deleteBtn = categoryDiv.querySelector('.delete-category-btn');

            editBtn.addEventListener('click', function () {
                const category = editBtn.getAttribute('data-category');
                document.getElementById('category-id').value = category;
                document.getElementById('category-name').value = category;
                addCategoryPopup.style.display = 'flex';
            });

            deleteBtn.addEventListener('click', function () {
                deleteCategory(category);
            });

            categoryDiv.querySelector('span').addEventListener('click', function () {
                window.location.href = `category.html?category=${encodeURIComponent(category)}`;
            });

            categoriesList.appendChild(categoryDiv);
        });
    }

    function deleteCategory(category) {
        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories = categories.filter(cat => cat !== category);
        localStorage.setItem('categories', JSON.stringify(categories));

        let links = JSON.parse(localStorage.getItem('links')) || [];
        links = links.filter(link => link.category !== category);
        localStorage.setItem('links', JSON.stringify(links));

        loadCategories();
    }

    exportCategoriesBtn.addEventListener('click', function () {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        const blob = new Blob([JSON.stringify(categories)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'categories.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    importCategoriesBtn.addEventListener('click', function () {
        importCategoriesInput.click();
    });

    importCategoriesInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const categories = JSON.parse(e.target.result);
            localStorage.setItem('categories', JSON.stringify(categories));
            loadCategories();
        };
        reader.readAsText(file);
    });

    loadCategories();
});
