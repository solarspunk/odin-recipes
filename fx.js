document.addEventListener('DOMContentLoaded', function() {
    // Create the cursor dot that's always visible
    const cursorDot = document.body.appendChild(document.createElement('div'));
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #333;
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 10000;
    `;
    
    // Create the dimming overlay
    const dimOverlay = document.body.appendChild(document.createElement('div'));
    dimOverlay.className = 'dim-overlay';
    dimOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 9998;
    `;
    
    // Create the spotlight cutout (this will create a hole in the dimming overlay)
    const spotlightHole = document.body.appendChild(document.createElement('div'));
    spotlightHole.className = 'spotlight-hole';
    spotlightHole.style.cssText = `
        position: fixed;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: #fff;
        pointer-events: none;
        transform: translate(-50%, -50%) scale(10);
        mix-blend-mode: destination-out;
        z-index: 9999;
        transition: transform 0.3s ease;
    `;
    
    // Move cursor elements with mouse
    document.addEventListener('mousemove', function(e) {
        cursorDot.style.left = e.pageX + 'px';
        cursorDot.style.top = e.pageY + 'px';
        
        spotlightHole.style.left = e.pageX + 'px';
        spotlightHole.style.top = e.pageY + 'px';
    });
    
    // Handle hover effects on messages
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        message.addEventListener('mouseenter', function() {
            // Start with large spotlight covering the whole page
            spotlightHole.style.transform = 'translate(-50%, -50%) scale(10)';
            // Show dim overlay
            dimOverlay.style.opacity = '1';
            // After a small delay, shrink spotlight to normal size
            setTimeout(function() {
                spotlightHole.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            document.body.style.cursor = 'pointer';
        });
        
        message.addEventListener('mouseleave', function() {
            // Expand spotlight to cover whole page again
            spotlightHole.style.transform = 'translate(-50%, -50%) scale(10)';
            // Delay hiding the overlay until animation completes
            setTimeout(function() {
                dimOverlay.style.opacity = '0';
            }, 200);
            document.body.style.cursor = 'default';
        });
    });
});