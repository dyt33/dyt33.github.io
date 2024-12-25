document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchAttractions');
    const priceFilter = document.getElementById('priceFilter');
    const timeFilter = document.getElementById('timeFilter');
    const attractionCards = document.querySelectorAll('.attraction-card');

    // 搜索功能
    searchInput.addEventListener('input', filterAttractions);
    priceFilter.addEventListener('change', filterAttractions);
    timeFilter.addEventListener('change', filterAttractions);

    function filterAttractions() {
        const searchTerm = searchInput.value.toLowerCase();
        const priceRange = priceFilter.value;
        const timeRange = timeFilter.value;

        attractionCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const price = getPrice(card);
            const time = getOpeningTime(card);
            
            const matchesSearch = title.includes(searchTerm);
            const matchesPrice = matchesPriceRange(price, priceRange);
            const matchesTime = matchesTimeRange(time, timeRange);

            if (matchesSearch && matchesPrice && matchesTime) {
                card.classList.remove('filtered');
            } else {
                card.classList.add('filtered');
            }
        });

        updateEmptyState();
    }

    function getPrice(card) {
        const priceText = card.querySelector('.attraction-info').textContent;
        const match = priceText.match(/(\d+)元/);
        return match ? parseInt(match[1]) : 0;
    }

    function getOpeningTime(card) {
        const timeText = card.querySelector('.attraction-info').textContent;
        return timeText.match(/\d{1,2}:\d{2}/g) || [];
    }

    function matchesPriceRange(price, range) {
        if (range === 'all') return true;
        if (range === 'free') return price === 0;
        if (range === '0-50') return price > 0 && price <= 50;
        if (range === '50-100') return price > 50 && price <= 100;
        if (range === '100+') return price > 100;
        return true;
    }

    function matchesTimeRange(times, range) {
        if (range === 'all') return true;
        if (!times.length) return false;

        const openTime = parseInt(times[0].split(':')[0]);
        if (range === 'morning' && openTime < 12) return true;
        if (range === 'afternoon' && openTime >= 12 && openTime < 18) return true;
        if (range === 'night' && openTime >= 18) return true;
        return false;
    }

    function updateEmptyState() {
        const visibleCards = document.querySelectorAll('.attraction-card:not(.filtered)');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabPanes.forEach(pane => {
            const hasVisibleCards = pane.querySelector('.attraction-card:not(.filtered)');
            const emptyState = pane.querySelector('.empty-state') || createEmptyState();
            
            if (!hasVisibleCards) {
                if (!pane.contains(emptyState)) {
                    pane.querySelector('.row').appendChild(emptyState);
                }
                emptyState.style.display = 'block';
            } else if (pane.contains(emptyState)) {
                emptyState.style.display = 'none';
            }
        });
    }

    function createEmptyState() {
        const div = document.createElement('div');
        div.className = 'col-12 text-center empty-state py-5';
        div.innerHTML = `
            <i class="fas fa-search fa-3x text-muted mb-3"></i>
            <h3 class="text-muted">未找到符合条件的景点</h3>
            <p class="text-muted">请尝试其他搜索条件</p>
        `;
        return div;
    }
}); 