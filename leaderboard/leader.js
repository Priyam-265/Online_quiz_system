        document.querySelectorAll('.time-filter').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.time-filter').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
        document.querySelectorAll('.pagination-btn').forEach(button => {
            button.addEventListener('click', function() {
                document.querySelectorAll('.pagination-btn').forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
        const searchInput = document.querySelector('.search-box input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.leaderboard-row');
            rows.forEach(row => {
                const username = row.querySelector('.username').textContent.toLowerCase();
                if (username.includes(searchTerm)) {
                    row.style.display = 'grid';
                } else {
                    row.style.display = 'none';
                }
            });
        });
        const rows = document.querySelectorAll('.leaderboard-row');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.01)';
                this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
            row.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // === CATEGORY FILTER FUNCTIONALITY ADDED HERE ===
        const categoryCheckboxes = document.querySelectorAll('#cat1, #cat2, #cat5, #cat6');
        const leaderboardRows = document.querySelectorAll('.leaderboard-row');

        function filterLeaderboard() {
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.id === "cat1" ? "science" 
          : cb.id === "cat2" ? "history" 
          : cb.id === "cat5" ? "generalknowledge"
          : cb.id === "cat6" ? "coding" 
          : "");

            leaderboardRows.forEach(row => {
                const category = row.getAttribute('data-category');
                if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                    row.style.display = "grid";
                } else {
                    row.style.display = "none";
                }
            });
             // Collect visible rows **after filtering**
    const visibleRows = Array.from(leaderboardRows).filter(row => row.style.display !== "none");

    // Renumber ranks
    visibleRows.forEach((row, index) => {
        const rankDiv = row.querySelector(".rank");
        if (index === 0) {
            rankDiv.innerHTML = '<span class="medal gold">1</span>';
        } else if (index === 1) {
            rankDiv.innerHTML = '<span class="medal silver">2</span>';
        } else if (index === 2) {
            rankDiv.innerHTML = '<span class="medal bronze">3</span>';
        } else {
            rankDiv.textContent = (index + 1).toString();
        }
    });
}
        
        // === Renumber ranks dynamically after filtering ===
let visibleRows = Array.from(leaderboardRows).filter(r => r.style.display !== "none");
visibleRows.forEach((row, index) => {
    const rankDiv = row.querySelector('.rank');
    // keep medals for top 3
    if (index === 0) {
        rankDiv.innerHTML = '<span class="medal gold">1</span>';
    } else if (index === 1) {
        rankDiv.innerHTML = '<span class="medal silver">2</span>';
    } else if (index === 2) {
        rankDiv.innerHTML = '<span class="medal bronze">3</span>';
    } else {
        rankDiv.textContent = (index + 1).toString();
    }
});


        categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterLeaderboard));
        filterLeaderboard();

        // === Celebration animation remains unchanged ===
        const celebrateBtn = document.getElementById('celebrate-btn');
        const celebrationContainer = document.getElementById('celebration');
        celebrateBtn.addEventListener('click', function() {
            celebrationContainer.innerHTML = '';
            const text = document.createElement('div');
            text.className = 'celebration-text';
            text.textContent = 'Congratulations!';
            celebrationContainer.appendChild(text);
            for (let i = 0; i < 5; i++) {
                const popper = document.createElement('div');
                popper.className = 'popper';
                popper.style.left = `${20 + i * 15}%`;
                celebrationContainer.appendChild(popper);
                for (let j = 0; j < 20; j++) {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti-piece';
                    confetti.style.left = `${20 + i * 15}%`;
                    confetti.style.bottom = '0';
                    celebrationContainer.appendChild(confetti);
                }
            }
            anime({ targets: '.popper', opacity: [0, 1], duration: 300, easing: 'easeOutQuad',
                complete: function() {
                    anime({ targets: '.popper', translateY: -100, opacity: [1, 0],
                        duration: 800, delay: anime.stagger(100), easing: 'easeOutQuad' });
                }
            });
            anime({ targets: '.confetti-piece',
                translateY: function() { return anime.random(-300, -500); },
                translateX: function() { return anime.random(-200, 200); },
                rotate: function() { return anime.random(-360, 360); },
                opacity: [0, 1, 0],
                duration: 2000,
                delay: anime.stagger(50, {start: 300}),
                easing: 'easeOutQuad'
            });
            anime({ targets: '.celebration-text',
                opacity: [0, 1], translateY: [50, 0], scale: [0.5, 1],
                duration: 1500, easing: 'easeOutElastic(1, .8)',
                complete: function() {
                    anime({ targets: '.celebration-text',
                        opacity: 0, delay: 1000, duration: 500, easing: 'easeInQuad' });
                }
            });
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = `${Math.random() * 100}%`;
                confetti.style.backgroundColor = ['#d7b98f', '#c9aa7a', '#8b7355', '#f9e076'][Math.floor(Math.random() * 4)];
                celebrationContainer.appendChild(confetti);
                anime({ targets: confetti,
                    translateY: function() { return anime.random(-300, -100); },
                    translateX: function() { return anime.random(-50, 50); },
                    rotate: function() { return anime.random(-360, 360); },
                    opacity: [0, 1, 0], duration: 3000, delay: anime.random(0, 1000), easing: 'easeOutQuad'
                });
            }
        });
    