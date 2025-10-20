# ProjectPulse
Home project orginizer 
 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/README.md b/README.md
index 74cd3f4c1175a86375fb9ea1737c3e320658b436..9095f2c59ca6903e0ec39167e3d47f38de64c856 100644
--- a/README.md
+++ b/README.md
@@ -1,2 +1,15 @@
 # ProjectPulse
-Home project orginizer 
+
+ProjectPulse is a lightweight home project organizer that runs entirely in the browser. It helps you keep track of renovation, maintenance, and vendor quote tasks with sortable lists and quick editing tools.
+
+## Features
+- Sidebar navigation with tabbed content areas for Renovations, Maintenance, and Vendor Quotes.
+- Modal-driven workflows for creating, editing, and deleting projects.
+- LocalStorage persistence so tasks remain available between sessions.
+- Sorting controls that let you reorder projects by type, timeline, or status.
+
+## Getting Started
+Open `index.html` in any modern browser. No additional build steps or tooling are required.
+
+## Testing
+This repository does not include an automated test suite or build pipeline. As a result, there are no commands to execute for validation, so the "Testing" section of pull requests is marked as "Not run". Manual testing can be performed by interacting with the UI in the browser.
 
EOF
)
