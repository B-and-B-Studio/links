document.addEventListener('DOMContentLoaded', function () {
    function loadLinks() {
        const linksList = document.getElementById('links-list');
        linksList.innerHTML = '';
        const links = JSON.parse(localStorage.getItem('links')) || [];
        links.sort((a, b) => a.category.localeCompare(b.category));
        links.forEach(link => {
            const linkDiv = document.createElement('div');
            linkDiv.className = 'link';
            linkDiv.innerHTML = `
                <a href="${link.linkUrl}" target="_blank">${link.linkName}</a>
                <button class="edit-link-btn" data-id="${link.id}">Edit</button>
                <button class="delete-link-btn" data-id="${link.id}">Delete</button>
            `;
            linksList.appendChild(linkDiv);

            const editBtn = linkDiv.querySelector('.edit-link-btn');
            const deleteBtn = linkDiv.querySelector('.delete-link-btn');

            editBtn.addEventListener('click', function () {
                const id = editBtn.getAttribute('data-id');
                const linkData = links.find(link => link.id === id);
                document.getElementById('link-id').value = linkData.id;
                document.getElementById('category').value = linkData.category;
                document.getElementById('link-name').value = linkData.linkName;
                document.getElementById('link-url').value = linkData.linkUrl;
                document.getElementById('show-add-link-popup').click();
            });

            deleteBtn.addEventListener('click', function () {
                const id = deleteBtn.getAttribute('data-id');
                const updatedLinks = links.filter(link => link.id !== id);
                localStorage.setItem('links', JSON.stringify(updatedLinks));
                loadLinks();
            });
        });
    }

    loadLinks();
});
