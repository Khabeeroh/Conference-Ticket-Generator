let container = document.getElementById('container')
let popUpMessage = document.getElementById('popup')
const announceBtn = document.getElementById('announceBtn')
let generateBtn = document.getElementById('generateBtn')
const emailMessage = document.getElementById('emailMessage')
const uploadMessage = document.getElementById('upload-message')
const fileInput = document.forms["myForm"]["file"];
let uploadedImageSrc = "";
const dropzoneWrapper = document.getElementById('dropzone-wrapper');
const previewImg = document.getElementById('uploadImg-preview');
const removeBtn = document.getElementById('btn-remove');

fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
        return;
    }

    if (file.size > 500 * 1024) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedImageSrc = e.target.result;
        previewImg.src = uploadedImageSrc;
        dropzoneWrapper.classList.add('has-image');
    };
    reader.readAsDataURL(file);
});

removeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  fileInput.value = "";
  previewImg.src = "";
  
  dropzoneWrapper.classList.remove('has-image');
});

generateBtn.addEventListener('click', function () {
    let email = document.forms['myForm']['email'].value.trim()
    let fullName = document.getElementById('fname').value.trim()
    let gitUserName = document.getElementById('gitUserName').value.trim()
    let avatarImage = uploadedImageSrc;
    let currentDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    emailMessage.innerHTML = ''
    if (email === '' || !email.includes('@')) {
        emailMessage.innerHTML = `
            <svg class="icon-info" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
            </svg>
            <p>Please enter a valid email address</p>
        `
        return
    }

    if (!uploadedImageSrc) {
    uploadMessage.innerHTML = `
        <div class="uploadError" style="color: hsl(7, 88%, 67%);">
            <svg class="icon-info" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 8a6 6 0 1 0 12 0A6 6 0 0 0 2 8Z" />
                <path fill="currentColor" d="M8.004 10.462V7.596ZM8 5.57v-.042Z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M8.004 10.462V7.596M8 5.569v-.042" />
            </svg>
            <p>File is too large.  Please upload an image under 500KB</p>
        </div>
    `;
    return;
}
        const ticketMarkup = `
        <div class="ticket-container">
           <div class="ticket-heading">
                 <h1>Congrats, <span class="ticket-fname" style="color: hsl(7, 88%, 67%);">${fullName}</span>! Your ticket is ready.</h1>
                <p>We've emailed your ticket to <span class="ticket-email" style="color: hsl(7, 88%, 67%);">${email}</span> and will send updates in the run up to the event.</p>
           </div>
            <div class="ticket">
                <div class="userBio left">
                    <div class="userDate">
                        <img src="images/logo-full.svg" alt="">
                        <p>${currentDate} / Oyo State, Nigeria</p>
                    </div>

                    <div class="user-details">
                        <img src="${avatarImage}" alt="User avatar">
                        <div class="ticketInfor">
                            <p class="fname">${fullName}</p>
                            <div class="git">
                                <img class="" src="images/icon-github.svg" alt="">
                                <p>${gitUserName}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <p>#01609</p>
                </div>
            </div>
        </div>
    `
    sessionStorage.setItem('ticketMarkup', ticketMarkup)
    window.location.href = 'ticket.html'
})
    


// localStorage.clear()
window.addEventListener('load', () => {
    const hasSeenPopup = localStorage.getItem('popupShown') === 'true'

    if (!hasSeenPopup) {
        setTimeout(() => {
            popUpMessage.style.display = 'block'
            container.style.opacity = 0.3
            localStorage.setItem('popupShown', 'true')
        }, 1000)
    }
})

if (announceBtn) {
    announceBtn.addEventListener('click', function () {
        popUpMessage.style.display = 'none'
        container.style.opacity = 1
        localStorage.setItem('popupShown', 'true')
    })
}

