document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".sidebar");
  const toggleBtn = document.getElementById("toggleSidebar");
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("projectModal");
  const projectForm = document.getElementById("projectForm");

  // -------- Sidebar toggle --------
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // -------- Collapse sidebar by default on mobile --------
  if (window.innerWidth <= 768) {
    sidebar.classList.add("collapsed");
  }

  // -------- Tab switching --------
  tabs.forEach((tab) => {
    ta
