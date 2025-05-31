tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1a237e',
                secondary: '#ffcdd2'
            },
            borderRadius: {
                'none': '0px',
                'sm': '4px',
                DEFAULT: '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '20px',
                '2xl': '24px',
                '3xl': '32px',
                'full': '9999px',
                'button': '8px'
            }
        }
    }
}


function downloadCV(button) {
    const downloadText = button.querySelector('.download-text');
    const loadingSpinner = button.querySelector('.loading-spinner');
    downloadText.textContent = 'Downloading...';
    loadingSpinner.classList.remove('hidden');
    button.disabled = true;
    fetch('assets/files/my_cv.docx')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my_cv.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            downloadText.textContent = 'Download CV';
            loadingSpinner.classList.add('hidden');
            button.disabled = false;
        })
        .catch(error => {
            console.error('Download failed:', error);
            downloadText.textContent = 'Download Failed';
            setTimeout(() => {
                downloadText.textContent = 'Download CV';
                loadingSpinner.classList.add('hidden');
                button.disabled = false;
            }, 2000);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        console.log('Form submitted:', Object.fromEntries(formData));
        form.reset();
    });
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
