import { post_init, checkDuplicate } from "./blogpost.js";

window.addEventListener('DOMContentLoaded', init);

function init(){
    let create_button = document.getElementById("create_button");
    create_button.addEventListener("click", create_post);

    // Looping through localStorage and initializing each post
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
        post_init(value[0], value[1], value[2]);
    }
}

// Function to create a new post
function create_post(){
    const temp_msg = document.getElementById("temp_msg");
    temp_msg.innerHTML = "";
    // Getting the dialog template and dialog area and clearing the dialog area
    const template = document.getElementById("dialog_template");
    const dialog_area = document.getElementById("dialog_area");
    dialog_area.innerHTML = "";
    const clone = template.content.cloneNode(true);
    dialog_area.appendChild(clone);
    const dialog_opener = document.getElementById("custom_dialog");
    dialog_opener.show();

    const save_button = document.getElementById("save");
    const cancel_button = document.getElementById("cancel");

    save_button.addEventListener("click", () => {

        // Getting the input values for the title, date, and summary fields
        const title = document.getElementById("title");
        const date = document.getElementById("date");
        const summary = document.getElementById("summary");

        // Checking if the post title exists in localStorage
        if (!checkDuplicate(title.value)){
            post_init(title.value, date.value, summary.value);

            // Saving the new post to localStorage
            const arr = [title.value, date.value, summary.value];
            localStorage.setItem(title.value, JSON.stringify(arr));
    
            const dialog_opener = document.getElementById("dialog_area");
            dialog_opener.innerHTML = "";
            const temp_msg = document.getElementById("temp_msg");
            temp_msg.innerHTML = "";
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
    })

    cancel_button.addEventListener("click", () => {
        const dialog_opener = document.getElementById("dialog_area");
        dialog_opener.innerHTML = "";
    })
}