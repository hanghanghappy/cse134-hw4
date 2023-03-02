const alert_button = document.getElementById("alert");

alert_button.addEventListener("click", () => {

    let dialog = document.getElementById("custom_dialog");

    dialog.innerHTML = "";

    let header = document.createElement("h2");
    header.textContent = "Alert";
    dialog.appendChild(header);

    let message = document.createElement("p");
    message.textContent = "Alert Clicked!";
    dialog.appendChild(message);

    let close_button = document.createElement("button");
    close_button.textContent = "Ok";
    dialog.appendChild(close_button);

    dialog.show();

    close_button.addEventListener("click", () => {
        dialog.innerHTML = "";
        dialog.close();
    })
});

const confirm_button = document.getElementById("confirm");

confirm_button.addEventListener("click", () => {
    
    let dialog = document.getElementById("custom_dialog");

    dialog.innerHTML = "";

    let header = document.createElement("h2");
    header.textContent = "Do you confirm this?";
    dialog.appendChild(header);

    let cancel_button = document.createElement("button");
    cancel_button.textContent = "Cancel";
    dialog.appendChild(cancel_button);

    cancel_button.addEventListener("click", () =>{
        dialog.innerHTML = "";
        dialog.close();
        const outputElement = document.getElementById("output");
        outputElement.innerHTML = `The value returned by the confirm method is: false`;
    })

    let ok_button = document.createElement("button");
    ok_button.textContent = "Ok";
    dialog.appendChild(ok_button);

    ok_button.addEventListener("click", () =>{
        dialog.innerHTML = "";
        dialog.close();
        const outputElement = document.getElementById("output");
        outputElement.innerHTML = `The value returned by the confirm method is: true`;
    })

    dialog.show();
})

const prompt_button = document.getElementById("prompt");

prompt_button.addEventListener("click", () => {
    
    let dialog = document.getElementById("custom_dialog");

    dialog.innerHTML = "";

    let header = document.createElement("h2");
    header.textContent = "Enter a message";
    dialog.appendChild(header);

    let user_input = document.createElement("input");
    dialog.appendChild(user_input);

    let cancel_button = document.createElement("button");
    cancel_button.textContent = "Cancel";
    dialog.appendChild(cancel_button);

    cancel_button.addEventListener("click", () =>{
        dialog.innerHTML = "";
        dialog.close();
        const outputElement = document.getElementById("output");
        outputElement.innerHTML = "User didn’t enter anything";
    })

    let ok_button = document.createElement("button");
    ok_button.textContent = "Ok";
    dialog.appendChild(ok_button);

    ok_button.addEventListener("click", () =>{
        dialog.innerHTML = "";
        dialog.close();
        const outputElement = document.getElementById("output");
        if (user_input.value == "" || user_input.value == null){
            outputElement.innerHTML = "User didn’t enter anything";
        }
        else{
            outputElement.innerHTML = `The value returned by the prompt method is: ${DOMPurify.sanitize(user_input.value)}`;
        }
    })

    dialog.show();
})

export {alert_button, confirm_button, prompt_button};