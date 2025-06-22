//Wait the page load completely
document.addEventListener('DOMContentLoaded', () => {

//-----------------------------HTML SELECTORS-----------------------------
    const loginSection = document.getElementById('login-section');
    const adminPanel = document.getElementById('admin-panel');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('#login-section button');
    const form = document.getElementById('form-add');
    const linkIdInput = document.getElementById('link-id');
    const linktTitleInput = document.getElementById('link-title');
    const URL_input = document.getElementById('link-url');
    const mainButton = document.getElementById('main-button');
    const linksContainer = document.getElementById('current-links');
//-----------------------------LOGIN--------------------------------------
/**
 * Verify if the user has already logged, to avoid do repeated logins
 */
    function checkLoginStatus()
    {
        if(sessionStorage.getItem('token'))
        {
            //if has the token, hide the login panel, and show the admin panel
            loginSection.style.display = 'none';
            adminPanel.style.display = 'block';
            loadLinksAdm();
        }
        else
        {
            //show the login panel and hide the admin panel, in case of no tokens
            loginSection.style.display = 'block';
            adminPanel.style.display = 'none';
        }
    }
/**
* Try do the login sending the password to the backend
*/
    async function doLogin()
    {
        const password = passwordInput.value;
        try {
            const response = await fetch(`/api/login`, {
                method:'POST', 
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({password})
            });

            if(response.ok)
            {
                const data = await response.json();
                //if logged, keep the token
                sessionStorage.setItem('token', data.token);
                checkLoginStatus();
            }
            else
            {
                alert('Password Incorrect');
            }

        } catch (error) {
            console.error('Login Error: ', error);
            alert('An error has occured with the server communication');
        }
    }
//-----------------------------------CRUD------------------------------------
/**
 * Search the links in the backend and show them
 */
    async function loadLinksAdm()
    {
        try {
            const response = await fetch('/api/links', {cache : 'no-cache'});
            const links = await response.json();
            linksContainer.innerHTML = ''; //clear the current list, before add new

            links.forEach(link => {
                const div = document.createElement('div');            
                //Create the html for each item in the list
                div.className = 'link-item-adm';
                div.innerHTML = 
                `
                    <span><strong>${link.title}</strong><br><small>${link.url}</small></span>
                    <div class = "actions">
                        <button onclick = "startEdit(${link.id}, '${link.title.replace(/'/g, "\\'")}', '${link.url.replace(/'/g, "\\'")}')">Edit</button>
                        <button onclick = "deleteLink(${link.id})" class = delete>Delete</button>
                    </div>
                `;

                linksContainer.appendChild(div);
            });
        } catch (error) {
            console.error('Error loading the links: ', error);
        }
    }  
/**
 * Prepare the form for the edit
 * @param {number} id - id of the link
 * @param {string} title  - title of the link
 * @param {string} url - url of the link
 */
    window.startEdit = function(id, title, url)
    {
        linkIdInput.value = id;
        linktTitleInput.value = title;
        URL_input.value = url;
        mainButton.innerText = 'Save';
        form.ScrollIntoView({behavior:'smooth'}); //scroll the page to the form

        linktTitleInput.classList.add('input-highlighted');
        URL_input.classList.add('input-highlighted');

        setTimeout(() => {
            linktTitleInput.classList.remove('input-highlighted');
            URL_input.classList.remove('input-highlighted');
        }, 500);
    }
/**
 * Clear the form
 */
    function resetForm()
    {
        linkIdInput.value = '';
        linktTitleInput.value = '';
        URL_input.value = '';
        mainButton.innerText = 'Add link';
        linktTitleInput.focus(); //point the cursor to the title inputfield
    }
/**
 * Function that decides if the action is save or add
 */
    async function addOrSave()
    {
        const id = linkIdInput.value;
        const title = linktTitleInput.value;
        const url = URL_input.value;

        if(!title || !url)
        {
            alert('Please fill the camps of title or url');
            return;
        }
        
        //if the id exists, edit
        if(id)
        {
            await fetch(`/api/links/${id}`, {
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':sessionStorage.getItem('token')
                },
                body:JSON.stringify({title, url})
            });
        }
        else
        {
            //if not, add a new link
            await fetch('/api/links', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':sessionStorage.getItem('token')
                },
                body:JSON.stringify({title, url})
            });
        }

        resetForm();
        loadLinksAdm();
    }
/**
 * Ask permission to delete
 * @param {number} id - id of the link
 */
    window.deleteLink = async function(id)
    {
        if(confirm('Are you sure you want to delete this link? this action cannot be reverted')) {
            try {
                await fetch(`/api/links/${id}`, {
                    method:'DELETE',
                    headers:{'Authorization':sessionStorage.getItem('token')}
                });
                loadLinksAdm();
            } catch (error) {
                console.error('Error deleting the link: ', error);
            }
        }
    }
//------------------------------EVENT LISTENERS------------------------------
    loginButton.addEventListener('click', doLogin);
    mainButton.addEventListener('click', addOrSave);
    //Allow do login pressing enter in the password field
    passwordInput.addEventListener('keypress', (event) => {
        if(event.key == 'Enter')
        {
            doLogin();
        }
    });
    /**
     * Verify if the edit need to be continued
     */
    function handleCancelOnClear() {
        const isEditing = linkIdInput.value !== '';
        const areInputsEmpty = linktTitleInput.value.trim() === '' && URL_input.value.trim() === '';

        if(isEditing && areInputsEmpty) resetForm();

        linktTitleInput.addEventListener('input', handleCancelOnClear);
        URL_input.addEventListener('input', handleCancelOnClear);
    }
//------------------------------INITIAL EXECUTION-----------------------------
    //Verify the login
    checkLoginStatus();
    //Allow the functions to be globally used
    window.startEdit = startEdit;
    window.deleteLink = deleteLink;
});