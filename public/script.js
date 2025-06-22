//Function to load the links
async function loadLinks()
{
    //"Ask" the backend for the links
    const container = document.getElementById('links-container');
    const response = await fetch ('/api/links');
    const links = await response.json();

    //Clear any example contents
    container.innerHTML = '';

    //Create a button for each link
    links.forEach(link => {
        const button = document.createElement('a');
        button.href = link.url;
        button.target = '_blank'; //Open in a new tab
        button.className = 'link-button';
        button.innerText = link.title;
        container.appendChild(button);
    });
}

//load the links
loadLinks();