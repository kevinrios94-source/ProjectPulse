// Tab Switching Logic
// -------- Tab Switching Logic --------
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    const targetId = tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');
  });
});

// -------- Modal Open/Close Logic --------
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');

// Auto-collapse on load (mobile)
window.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('collapsed');
  }
});

// Toggle collapse on button click
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});




// Add/Edit/Delete functionality can go here in the future
// For example: dynamically add new project cards to the DOM
