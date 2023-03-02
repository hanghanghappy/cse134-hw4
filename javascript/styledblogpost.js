// This function creates a new blog post and adds it to the list of posts
function post_init(title, date, summary){

    // Get the container for the list of posts
    const blogs = document.getElementById("blogs");
    let li = document.createElement("li");

    // Create a <p> element to display the title, date, and summary of the post
    const post_text = document.createElement("p");
    post_text.title = title;
    post_text.innerHTML = `${title} (${date})` + "<br>" +  `${summary}`;

    // Styling for the edit and delete buttons
    const edit_button = document.createElement("button");
    edit_button.style.backgroundImage = 'url("images/pencil.png")'; 
    edit_button.style.width = "25px";
    edit_button.style.height = "25px";
    edit_button.style.backgroundColor = "white";
    edit_button.style.marginRight = "10px";
    const delete_button = document.createElement("button");
    delete_button.style.backgroundImage = 'url("images/trash.png")'; 
    delete_button.style.width = "25px";
    delete_button.style.height = "25px";
    delete_button.style.backgroundColor = "white";

    // This function opens a dialog box where the user can edit the post
    edit_button.addEventListener("click", () => {
        const template = document.getElementById("dialog_template");
        const dialog_area = document.getElementById("dialog_area");
        dialog_area.innerHTML = "";
        const clone = template.content.cloneNode(true);
        dialog_area.appendChild(clone);
        
        const dialog_opener = document.getElementById("custom_dialog");
        dialog_opener.show();

        // Styling for the dialog form
        dialog_opener.style.width = "400px";
        dialog_opener.style.border = "2px solid gray";
        dialog_opener.style.borderRadius = "5px";
    
        const inputElements = dialog_opener.querySelectorAll("input, textarea");
        inputElements.forEach((inputElement) => {
            inputElement.style.display = "block";
            inputElement.style.width = "100%";
            inputElement.style.marginBottom = "10px";
            inputElement.style.padding = "5px";
            inputElement.style.fontSize = "15px";
            inputElement.style.border = "1px solid gray";
            inputElement.style.borderRadius = "5px";
        });    

        const original_title = post_text.title;

        const save_button = document.getElementById("save");
        save_button.addEventListener("click", () => {
            const title = document.getElementById("title");
            const date = document.getElementById("date");
            const summary = document.getElementById("summary");

            // If the edited title is the same, skip the check for existing titles in localStorage
            if (original_title == title.value){
                localStorage.removeItem(post_text.title);
                const arr = [title.value, date.value, summary.value];
                localStorage.setItem(title.value, JSON.stringify(arr));
                post_text.title = title.value;
                post_text.innerHTML = `${title.value} (${date.value})` + "<br>" + `${summary.value}`;

                const dialog_opener = document.getElementById("dialog_area");
                dialog_opener.innerHTML = "";
                const temp_msg = document.getElementById("temp_msg");
                temp_msg.innerHTML = "";
            }
            else{
                // Checking if the post title exists in localStorage
                if (!checkDuplicate(title.value)){

                    // Saving the edited post
                    localStorage.removeItem(post_text.title);
                    const arr = [title.value, date.value, summary.value];
                    localStorage.setItem(title.value, JSON.stringify(arr));
                    post_text.title = title.value;
                    post_text.innerHTML = `${title.value} (${date.value})` +  "<br>" +  `${summary.value}`;
    
                    const dialog_opener = document.getElementById("dialog_area");
                    dialog_opener.innerHTML = "";
                }
                else{
                    // Displaying an error message if the post title already exists
                    const template = document.getElementById("duplicate_template");
                    const temp_msg = document.getElementById("temp_msg");
                    temp_msg.innerHTML = "";
                    const clone = template.content.cloneNode(true);
                    temp_msg.appendChild(clone);
                    const duplicate_opener = document.getElementById("duplicate_dialog");
                    duplicate_opener.show();
                    const duplicate_ok_button = document.getElementById("duplicate_ok_button");
                    
                    duplicate_ok_button.addEventListener("click", () => {
                        temp_msg.innerHTML = "";
                    })
                }
            }
        })

        const cancel_button = document.getElementById("cancel");
        cancel_button.addEventListener("click", () => {
            const dialog_opener = document.getElementById("dialog_area");
            dialog_opener.innerHTML = "";
            const temp_msg = document.getElementById("temp_msg");
            temp_msg.innerHTML = "";
        })
    })
        
    // This function removes the post from the list of posts and from localStorage
    delete_button.addEventListener("click", () => {
        localStorage.removeItem(post_text.title);
        li.remove();
        const dialog_opener = document.getElementById("dialog_area");
        dialog_opener.innerHTML = "";
    })

    // Add the post to the container
    li.appendChild(post_text);
    li.appendChild(edit_button);
    li.appendChild(delete_button);
    blogs.appendChild(li);

    const listItems = document.querySelectorAll("li");
    listItems.forEach(item => {
        item.style.borderRadius = "5px";
        item.style.backgroundColor = "#E0E0E0";
    })
}

// This function checks if a blog post with the same title already exists in localStorage
function checkDuplicate(title){
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        if (title == value[0]){
            return true;
        }
    }
    return false;
}

export{post_init, checkDuplicate};