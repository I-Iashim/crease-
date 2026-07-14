/**
 * admin.js
 * Talks to /api/admin/* and /api/products (see routes/admin.js,
 * routes/products.js). The dashboard checks /api/admin/session on load and
 * bounces to admin-login.html if the session isn't an admin session —
 * this is a real server-side check, not a client-side flag.
 */
(function(){
  "use strict";

  document.addEventListener("components:ready", () => {
    wireAdminLogin();
    guardDashboard();
  });

  function wireAdminLogin(){
    const form = document.getElementById("adminLoginForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.querySelector("#adminUser").value.trim();
      const password = form.querySelector("#adminPass").value;
      const errEl = document.getElementById("adminLoginError");
      errEl.hidden = true;
      try {
        await window.CEApi.adminLogin({ email, password });
        location.href = "admin-dashboard.html";
      } catch (err) {
        errEl.textContent = err.message || "Sign-in failed.";
        errEl.hidden = false;
      }
    });
  }

  async function guardDashboard(){
    const dash = document.getElementById("adminDashboard");
    if (!dash) return;
    try {
      const { isAdmin } = await window.CEApi.adminSession();
      if (!isAdmin){ location.href = "admin-login.html"; return; }
    } catch (err) {
      location.href = "admin-login.html";
      return;
    }
    wireDashboard();
  }

  function wireDashboard(){
    document.getElementById("adminLogoutBtn")?.addEventListener("click", async () => {
      await window.CEApi.adminLogout();
      location.href = "admin-login.html";
    });

    renderStats();
    renderProductTable();
    renderOrdersTable();
    wireAddProductForm();
    wireNav();
  }

  function wireNav(){
    const tabs = document.querySelectorAll(".admin-tab");
    tabs.forEach(tab => tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      document.querySelectorAll(".admin-panel").forEach(p => p.hidden = true);
      document.getElementById(tab.dataset.target).hidden = false;
    }));
  }

  async function renderStats(){
    try {
      const stats = await window.CEApi.adminStats();
      document.getElementById("statProducts").textContent = stats.totalProducts;
      document.getElementById("statOrders").textContent = stats.totalOrders;
      document.getElementById("statRevenue").textContent = `$${stats.revenue.toFixed(2)}`;
      document.getElementById("statLowStock").textContent = stats.lowStock;
    } catch (err) {
      window.ceToast && window.ceToast("Could not load dashboard stats");
    }
  }

  async function renderProductTable(){
    const tbody = document.getElementById("productTableBody");
    if (!tbody) return;
    let products = [];
    try {
      ({ products } = await window.CEApi.getProducts());
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="7" class="muted" style="padding:1.5rem;">Could not load products.</td></tr>`;
      return;
    }
    tbody.innerHTML = products.map((p) => `
      <tr>
        <td><img src="${p.images[0]}" alt="${p.name}" style="width:44px;height:56px;object-fit:cover;border-radius:6px;"></td>
        <td>${p.name}</td>
        <td style="text-transform:capitalize;">${p.category}</td>
        <td>$${p.price}</td>
        <td>${p.stock}</td>
        <td>${p.rating}</td>
        <td><button class="btn btn-sm btn-ghost" data-del="${p.id}">Delete</button></td>
      </tr>`).join("");

    tbody.querySelectorAll("[data-del]").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Delete this product?")) return;
        try {
          await window.CEApi.deleteProduct(btn.dataset.del);
          window.ceToast && window.ceToast("Product deleted");
          renderProductTable();
          renderStats();
        } catch (err) {
          window.ceToast && window.ceToast(err.message || "Could not delete product");
        }
      });
    });
  }

  function wireAddProductForm(){
    const form = document.getElementById("addProductForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = form.querySelector("#newProductName").value.trim();
      const category = form.querySelector("#newProductCategory").value;
      const price = Number(form.querySelector("#newProductPrice").value);
      const stock = Number(form.querySelector("#newProductStock").value);
      if (!name || !price) { window.ceToast && window.ceToast("Name and price are required"); return; }

      try {
        await window.CEApi.createProduct({
          name, category, price, stock,
          images: [`https://picsum.photos/seed/${encodeURIComponent(name)}/700/900`],
          desc: "Newly added product — description pending.",
        });
        form.reset();
        renderProductTable();
        renderStats();
        window.ceToast && window.ceToast("Product added");
      } catch (err) {
        window.ceToast && window.ceToast(err.message || "Could not add product");
      }
    });
  }

  async function renderOrdersTable(){
    const tbody = document.getElementById("orderTableBody");
    if (!tbody) return;
    let orders = [];
    try {
      ({ orders } = await window.CEApi.myOrders()); // admin session -> returns ALL orders
    } catch (err) {
      tbody.innerHTML = `<tr><td colspan="5" class="muted" style="padding:1.5rem;">Could not load orders.</td></tr>`;
      return;
    }
    if (!orders.length){
      tbody.innerHTML = `<tr><td colspan="5" class="muted" style="padding:1.5rem;">No orders placed yet.</td></tr>`;
      return;
    }
    tbody.innerHTML = orders.map(o => `
      <tr>
        <td>#${o.id}</td>
        <td>${new Date(o.createdAt).toLocaleDateString()}</td>
        <td>${o.customer ? o.customer.name : "—"}</td>
        <td>${o.items.reduce((s,i)=>s+i.qty,0)}</td>
        <td>$${o.total.toFixed(2)}</td>
        <td style="text-transform:capitalize;">${o.status}</td>
      </tr>`).join("");
  }
})();
