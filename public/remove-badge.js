// Targeted Manus badge removal script
(function() {
  'use strict';
  
  function removeManusBadge() {
    // Target specific Manus badge elements
    const manusElements = document.querySelectorAll('a[href*="manus"], *[class*="manus"], *[id*="manus"]');
    manusElements.forEach(el => {
      if (el.textContent && (el.textContent.includes('Made with Manus') || el.textContent.includes('Create my website'))) {
        el.style.display = 'none !important';
        el.style.visibility = 'hidden !important';
        el.style.opacity = '0 !important';
        el.remove();
      }
    });
    
    // Remove elements with specific text content
    const textElements = document.querySelectorAll('*');
    textElements.forEach(el => {
      if (el.children.length === 0 && el.textContent) {
        const text = el.textContent.trim();
        if (text === 'Made with Manus' || text === 'Create my website' || text.includes('Made with Manus')) {
          const parent = el.parentElement;
          if (parent) {
            parent.style.display = 'none !important';
            parent.remove();
          }
        }
      }
    });
  }
  
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeManusBadge);
  } else {
    removeManusBadge();
  }
  
  // Run after window loads
  window.addEventListener('load', removeManusBadge);
  
  // Run periodically but less frequently
  setInterval(removeManusBadge, 3000);
  
})();

