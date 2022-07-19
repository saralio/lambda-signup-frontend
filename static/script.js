/*TODO: [SAR-119] email validation failing for email ids with custom domain */
function validateEmail(text) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/.test(text)) {
        return (true)
    } else {
        return (false)
    }
}


async function postFormDataAsJson({ baseUrl, formData }) {
    var plainFormData = Object.fromEntries(formData.entries());
    var emailId = plainFormData['emailId']
    var emailSendTime = plainFormData['emailSendTime']
    var emailSendTimeZoneOffset = new Date().getTimezoneOffset()*-1
    var emailSendTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

    if(emailSendTimeZoneOffset == null || emailSendTimeZone == null) {
        emailSendTimeZoneOffset = '+330'
        emailSendTimeZone = 'Asia/Calcutta'
    }

    var subscribeButton = document.getElementById("registerLink")
    var registerSuccessText = document.getElementById("registerSuccessText")
    var registerUnsuccessText = document.getElementById("registerUnSuccessfulText")
    var emailCheck = document.getElementById("emailCheck")

    if (!validateEmail(plainFormData.emailId)) {
        emailCheck.style.display = "block"
        // subscribeButton.style.display = "none"
        throw new Error("incorrect email provided, can't register")
    }

    url = baseUrl + "?" + "emailId=" + emailId + '&emailSendTimeZone=' + emailSendTimeZone + '&emailSendTimeZoneOffset=' + emailSendTimeZoneOffset
    url = emailSendTime == '' ? url : url + "&emailSendTime=" + emailSendTime
    const response = await fetch(url);

    if (response.ok) {
        subscribeButton.style.display = "none"
        registerSuccessText.style.display = "block"
        registerUnsuccessText.style.display = "none"
        emailCheck.style.display = "none"
        return response.json();
    } else {
        subscribeButton.style.display = "none"
        registerSuccessText.style.display = "none"
        registerUnsuccessText.style.display = "block"
        emailCheck.style.display = "none"
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    
}


async function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.getElementById("register-new-user");
    const baseUrl = document.getElementById("registerLink").getAttribute('href');

    try {
        const formData = new FormData(form);
        const responseData = await postFormDataAsJson({ baseUrl, formData });
        console.log({ responseData });
    } catch (error) {
        console.error(error);
    }
}

const subscribeEvent = document.getElementsByClassName('subscribe');
subscribeEvent.item(0).addEventListener("click", handleFormSubmit);