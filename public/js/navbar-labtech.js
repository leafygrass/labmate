/* adds outline design on active page in navigation bar */

var includes = $('[data-include]');
$.each(includes, function() {
    var file = 'partials/' + $(this).data('include') + '.html';
    $(this).load(file, function() {
       
        // handle dynamic profile image display on navigation bar
        const userId = localStorage.getItem('userId');
        
        if (userId) {
            fetch(`/api/user/details/${userId}`)
                .then(response => response.json())
                .then(userData => {
                    if (userData.image) {
                        // update the profile image src
                        const profileImg = document.getElementById('profile-img');
                        if (profileImg) {
                            profileImg.src = userData.image;
                        }
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
       
        var page = window.location.pathname.split("/").pop() || "index.html"; 

        // Remove `.html` for consistency
        var pageWithoutExt = page.replace(".html", "");

        /* TODO: add laboratories, reservation here */
        switch(pageWithoutExt) {      
            case 'labtech-home':
                document.getElementById("nav-home")?.classList.add("active");
                break;
            case 'labtech-laboratories':
                document.getElementById("nav-lab")?.classList.add("active");
                break;
            case 'labtech-reservations':
                document.getElementById("nav-reserve")?.classList.add("active");
                break;
            default:
                break;
        }
    });
});