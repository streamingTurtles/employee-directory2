const profileForm = document.querySelector('.form-signin form');

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const response = await fetch('/api/directory', {
    method: 'POST',    
    /*
    // removed in 4.2.4 because:
    // Since we're now using multer to parse the form data, we need to send 
    // it along as multipart/form-data instead of application/x-www-form-urlencoded.
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(new FormData(profileForm)),
    */

    // added in at 4.2.4, 
    // the multipart/form-data in replacement of application/x-www-form-urlencoded
    body: new FormData(profileForm)
})

  const results = await response.json();

  if (results.error) {
    alert(results.error);
  } else {
    location.replace('/directory');
  }
});
