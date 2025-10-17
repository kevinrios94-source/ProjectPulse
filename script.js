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
    tab.addEventListener("click", () => {
      // Remove active from all tabs and content
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active to clicked tab and its content
      tab.classList.add("active");
      const selectedTab = tab.getAttribute("data-tab");
      document.getElementById(selectedTab).classList.add("active");
    });
  });

  // -------- Modal open/close --------
  openModalBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // -------- Optional: Close modal on background click --------
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // -------- Optional: Handle form submission --------
  projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect data (for future use)
    const name = document.getElementById("projectName").value;
    const type = document.getElementById("projectType").value;
    const category = document.getElementById("projectCategory").value;
    const status = document.getElementById("projectStatus").value;
    const estCost = document.getElementById("projectEstimated").value;
    const expCost = document.getElementById("projectExpensed").value;

    console.log("New Project:", { name, type, category, status, estCost, expCost });

    // Clear form and close modal
    projectForm.reset();
    modal.classList.add("hidden");

    const categoryLabels = {
  a: "On Hold",
  b: "Next 1 Month",
  c: "Next 3 Months",
  d: "Next 6 Months",
  e: "Next 1 Year",
  f: "Next Few Years",
  g: "Done"
};


    // You could insert a new project card here in future
  });
});
