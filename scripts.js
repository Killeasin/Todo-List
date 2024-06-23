document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const headerHeight = document.querySelector('header').offsetHeight;
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation item based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        document.querySelectorAll('nav ul li a').forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));
            if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Form validation
    const form = document.querySelector('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            return;
        }

        // Additional validation logic (e.g., email format validation)

        // Submit form (replace with actual submission logic)
        console.log('Form submitted:', { name, email, message });
        form.reset();
    });
});