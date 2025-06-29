# Linktree Clone

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎯 What is this project?

<img width="1282" alt="Image" src="https://github.com/user-attachments/assets/2ef61af5-9173-4ef6-abc4-406c8241bca4" />

This project is a simplified, open-source version of the popular **Linktree** service. It creates a single, customizable page that centralizes all your important links (social media, portfolio, projects, etc.) in one place.

Think of it as a **digital business card**. Instead of handing out multiple cards or sending several links to someone, you share just one. When they access it, they'll see an organized list of all your other links, making it easy to access everything you want to show.

## ✨ Key Features

* **Links Page:** Displays a list of buttons, where each one redirects to a different URL.

    ![Image](https://github.com/user-attachments/assets/1f01d9f0-2c16-4d28-b349-d25b12c89d67)

* **Admin Panel:** A simple, protected page at `/admin` to dynamically add and remove links.

    ![Image](https://github.com/user-attachments/assets/31b23763-6d81-4a0d-8f68-f0a45b98c832)

* **JSON Storage:** Uses a `links.json` file as a simple "database," making the project lightweight and easy to manage.
* **Clean Front-end:** A minimalist and functional user interface that is easy to customize.

## 🛠️ Tech Stack

This project was built with the following technologies:

* **Back-end:**
    * **Node.js:** JavaScript runtime environment for the server.
    * **Express.js:** Framework for quickly and neatly building the web server and API routes.
* **Front-end:**
    * **HTML:** The structure of the web pages.
    * **CSS:** Styling to provide a pleasant appearance.
    * **JavaScript (Vanilla):** Dynamic page manipulation to fetch and display links, as well as interact with the admin panel.
* **Data:**
    * **JSON:** A lightweight format for storing and exchanging link data.

## 🚀 How to Run the Project (or Access it Online)

[Click here to access the live version](https://linktree-8eio.onrender.com). If the server needs to spin up due to the free hosting plan, please wait up to 1 minute.

To run this project on your machine, follow the steps below.

**Prerequisites:**
* You must have [Node.js](https://nodejs.org/en/) (which includes `npm`) installed.

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Bytt13/Linktree.git](https://github.com/Bytt13/Linktree.git)
    ```

2.  **Navigate to the project folder:**
    ```bash
    cd Linktree
    ```

3.  **Install the dependencies:**
    This command will read the `package.json` file and install everything the project needs to run (like Express).
    ```bash
    npm install
    ```

4.  **Start the server:**
    ```bash
    node server.js
    ```

5.  **Access in your browser:**
    * The links page will be available at: `http://localhost:3000`
    * The admin panel will be at: `http://localhost:3000/admin`

## 📂 Project Structure

Here is an overview of the most important files and folders:

```text
/
├── data/
│   └── links.json          # "Database" that stores the links.
├── node_modules/           # Folder where dependencies (Express) are installed.
├── public/
│   ├── admin.html          # Admin page for managing links.
│   ├── admin.js            # Front-end logic for the admin page.
│   ├── index.html          # Main page that displays links to visitors.
│   ├── script.js           # Front-end logic to fetch and display links.
│   └── style.css           # Main stylesheet.
├── .gitignore              # File that tells Git what to ignore (e.g., node_modules).
├── package-lock.json       # Exact version details of the dependencies.
├── package.json            # The project's "ID card": defines name, scripts, and dependencies.
└── server.js               # The heart of the project: the Express server that controls everything.
```
## 🔩 API Endpoints

The API is built to manage a list of links and is protected by a simple token-based authentication system.

### Authentication

To perform admin actions (add, edit, delete), you must first log in to obtain a token and then send this token in the `Authorization` header of each protected request.

---

### **1. Admin Login**

- `POST /api/login`
    - **Description:** Authenticates the admin user.
    - **Protection:** None.
    - **Request Body:**
        ```json
        {
          "password": "the_correct_password"
        }
        ```
    - **Success Response (200):** Returns an access token.
        ```json
        {
          "success": true,
          "token": "token-for-validation"
        }
        ```
    - **Failure Response (401):** Incorrect password.
        ```json
        {
          "success": false,
          "message": "Password Incorrect"
        }
        ```

---

### **2. Link Management**

#### **List all links**

- `GET /api/links`
    - **Description:** Returns a list of all currently saved links.
    - **Protection:** None. This endpoint is public.
    - **Success Response (200):** An array of objects, where each object is a link.
        ```json
        [
          {
            "id": 1678886400000,
            "title": "My Portfolio",
            "url": "[https://my-site.com](https://my-site.com)"
          }
        ]
        ```

#### **Add a new link**

- `POST /api/links`
    - **Description:** Creates and saves a new link.
    - **Protection:** **Yes.** Requires the token in the `Authorization` header.
    - **Request Body:**
        ```json
        {
          "title": "Title of the New Link",
          "url": "[https://new-link.com](https://new-link.com)"
        }
        ```
    - **Success Response (201):** Returns the newly created link object.

#### **Edit an existing link**

- `PUT /api/links/:id`
    - **Description:** Updates the title and URL of a specific link, identified by its `id`.
    - **Protection:** **Yes.** Requires the token in the `Authorization` header.
    - **URL Parameter:** `id` (the numeric identifier of the link to be edited).
    - **Request Body:**
        ```json
        {
          "title": "Updated Title",
          "url": "[https://updated-link.com](https://updated-link.com)"
        }
        ```
    - **Success Response (200):** `link edited successfully`
    - **Failure Response (404):** `Link not found`

#### **Delete a link**

- `DELETE /api/links/:id`
    - **Description:** Removes a specific link from the system, identified by its `id`.
    - **Protection:** **Yes.** Requires the token in the `Authorization` header.
    - **URL Parameter:** `id` (the numeric identifier of the link to be deleted).
    - **Success Response (200):** `link deleted successfully`

## 📝 How to Use + GIFs

1.  Start the server (`node server.js`).
2.  Open the admin page: `http://localhost:3000/admin`.
3.  Use the default password to log in (if needed).
4.  To **add a link**:
    * Fill in the "Link Title" field (the text that will appear on the button).
    * Fill in the "Link URL" field (the destination where the button will lead).
    * Click "Add Link".

    ![Jun-24-2025 14-34-16](https://github.com/user-attachments/assets/22ea7f47-5716-4ecf-bede-052fa9186553)

5.  To **remove a link**:
    * Click the "Delete" button next to the link you want to remove.

    ![Image](https://github.com/user-attachments/assets/6baab1a2-a4c9-480b-b0e6-12fce6adaf1f)

    Changes are automatically saved to the `links.json` file, and the main page will be updated for all visitors.

6.  To **edit a link**:
    * Click the "Edit" button next to the link you want to modify, and edit its title or URL, always keeping both fields filled.

    ![Image](https://github.com/user-attachments/assets/052234cd-f0fd-43cc-9fa6-9b71c220f5d3)

    ![Image](https://github.com/user-attachments/assets/89d68ca9-216c-40ad-8007-078e650d8e64)
