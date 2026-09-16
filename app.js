const state = {
  page: "overview",
  projects: [
    {name:"Website Redesign", owner:"Abeer Gul", status:"Active", due:"Sep 20", progress:72},
    {name:"Mobile App MVP", owner:"Sarah Khan", status:"Planning", due:"Oct 02", progress:25},
    {name:"Q3 Marketing", owner:"Hamza Ali", status:"Completed", due:"Sep 10", progress:100},
    {name:"Analytics Portal", owner:"Abeer Gul", status:"Active", due:"Oct 12", progress:54},
    {name:"Brand Refresh", owner:"Maya Noor", status:"Planning", due:"Oct 28", progress:15},
  ],
  team: [
    {name:"Abeer Gul", email:"abeer@example.com", role:"Owner", status:"Active"},
    {name:"Sarah Khan", email:"sarah@example.com", role:"Designer", status:"Active"},
    {name:"Hamza Ali", email:"hamza@example.com", role:"Developer", status:"Active"},
    {name:"Maya Noor", email:"maya@example.com", role:"Marketing", status:"Invited"},
  ],
  activity: [
    ["AG","Abeer created the Website Redesign project","12 minutes ago"],
    ["SK","Sarah changed Mobile App MVP to Planning","48 minutes ago"],
    ["HA","Hamza completed a task in Q3 Marketing","2 hours ago"],
    ["MN","Maya was invited to the workspace","Yesterday"],
    ["AG","Abeer updated workspace settings","Yesterday"]
  ]
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function showToast(message){
  const el=document.createElement("div"); el.className="toast"; el.textContent=message;
  $("#toastRegion").appendChild(el); setTimeout(()=>el.remove(),3000);
}
function isLoggedIn(){return localStorage.getItem("nexa_auth")==="1";}
function setAuth(v){localStorage.setItem("nexa_auth",v?"1":"0");}
function renderAuth(){
  $("#authView").classList.toggle("hidden",isLoggedIn());
  $("#appView").classList.toggle("hidden",!isLoggedIn());
  if(isLoggedIn()) renderPage();
}
function switchAuth(mode){
  $$(".auth-tab").forEach(b=>{b.classList.toggle("active",b.dataset.auth===mode);b.setAttribute("aria-selected",b.dataset.auth===mode)});
  $("#authName").classList.toggle("hidden",mode!=="signup"); $("#nameLabel").classList.toggle("hidden",mode!=="signup");
  $("#authName").required=mode==="signup"; $("#authPassword").autocomplete=mode==="signup"?"new-password":"current-password";
  $("#authSubmitText").textContent=mode==="signup"?"Create account":"Sign in"; $("#authError").textContent="";
}
function renderStats(){
  const stats=[["Active projects","12","+16.8%"],["Team members","24","+8.2%"],["Tasks completed","184","+24.5%"],["Monthly usage","78%","+5.4%"]];
  $("#statsGrid").innerHTML=stats.map((s,i)=>`<article class="stat-card"><div class="stat-top"><span>${s[0]}</span><span class="stat-icon">${["▣","♙","✓","◒"][i]}</span></div><div class="stat-value">${s[1]}</div><span class="stat-change">↗ ${s[2]} vs last month</span></article>`).join("");
}
function renderActivity(target){
  $(target).innerHTML=state.activity.map(a=>`<div class="activity-item"><div class="activity-avatar">${a[0]}</div><div><p>${a[1]}</p><time>${a[2]}</time></div></div>`).join("");
}
function projectRows(items){
  if(!items.length)return `<div class="empty"><strong>No projects found</strong>Try changing your search or filter.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>Project</th><th>Owner</th><th>Status</th><th>Due date</th><th>Progress</th><th>Action</th></tr></thead><tbody>${items.map((p,i)=>`<tr><td><strong>${p.name}</strong></td><td>${p.owner}</td><td><span class="status ${p.status.toLowerCase()}">${p.status}</span></td><td>${p.due}</td><td>${p.progress}%</td><td><button class="text-btn" data-edit="${i}">Manage</button></td></tr>`).join("")}</tbody></table></div>`;
}
function renderProjects(){
  const q=($("#projectSearch")?.value||"").toLowerCase(), f=$("#projectFilter")?.value||"all";
  const items=state.projects.filter(p=>(f==="all"||p.status===f)&&p.name.toLowerCase().includes(q));
  $("#projectTable").innerHTML=projectRows(items);
  $$("#projectTable [data-edit]").forEach(b=>b.onclick=()=>openProjectModal(Number(b.dataset.edit)));
}
function renderTeam(){
  const q=($("#teamSearch")?.value||"").toLowerCase();
  const items=state.team.filter(m=>(m.name+" "+m.email+" "+m.role).toLowerCase().includes(q));
  $("#teamTable").innerHTML=items.length?`<div class="table-wrap"><table class="data-table"><thead><tr><th>Member</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>${items.map((m,i)=>`<tr><td><strong>${m.name}</strong></td><td>${m.email}</td><td>${m.role}</td><td><span class="status active">${m.status}</span></td><td><button class="text-btn" data-member="${i}">Edit</button></td></tr>`).join("")}</tbody></table></div>`:`<div class="empty"><strong>No team members found</strong>Try another search term.</div>`;
}
function renderPage(){
  const t=$("#"+state.page+"Template"); const content=$("#pageContent");
  if(!t){state.page="overview";return renderPage();}
  content.innerHTML=""; content.appendChild(t.content.cloneNode(true));
  $("#pageTitle").textContent=state.page[0].toUpperCase()+state.page.slice(1);
  $$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===state.page));
  if(state.page==="overview"){renderStats();renderActivity("#activityList");$("#recentProjects").innerHTML=projectRows(state.projects.slice(0,3));$("#barChart").innerHTML=[48,68,55,82,72,92].map((v,i)=>`<div class="bar-wrap"><div class="bar" style="height:${v}%"></div><small>${["Apr","May","Jun","Jul","Aug","Sep"][i]}</small></div>`).join("");}
  if(state.page==="projects"){renderProjects();$("#projectSearch").oninput=renderProjects;$("#projectFilter").onchange=renderProjects;}
  if(state.page==="team"){renderTeam();$("#teamSearch").oninput=renderTeam;}
  if(state.page==="activity")renderActivity("#fullActivity");
  if(state.page==="settings")$("#settingsForm").onsubmit=e=>{e.preventDefault();showToast("Settings saved successfully");};
  content.focus();
}
function navigate(page){state.page=page;renderPage();if($("#sidebar").classList.contains("open"))$("#sidebar").classList.remove("open");}
function openModal(html){
  $("#modalRoot").innerHTML=html;$("#modalRoot").classList.add("open");$("#modalRoot").setAttribute("aria-hidden","false");
  $(".modal-close")?.focus();
}
function closeModal(){ $("#modalRoot").classList.remove("open");$("#modalRoot").setAttribute("aria-hidden","true");$("#modalRoot").innerHTML=""; }
function openProjectModal(index=null){
  const p=index!==null?state.projects[index]:{name:"",owner:"Abeer Gul",status:"Planning",due:"",progress:0};
  openModal(`<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-header"><div><h2 id="modalTitle">${index===null?"Create project":"Manage project"}</h2><p>Use this form to update workspace project data.</p></div><button class="modal-close" aria-label="Close">×</button></div><form id="projectForm"><label>Project name<input name="name" required value="${p.name}"></label><label>Owner<input name="owner" required value="${p.owner}"></label><label>Status<select name="status"><option ${p.status==="Planning"?"selected":""}>Planning</option><option ${p.status==="Active"?"selected":""}>Active</option><option ${p.status==="Completed"?"selected":""}>Completed</option></select></label><label>Due date<input name="due" required value="${p.due}"></label><div class="modal-actions"><button type="button" class="secondary-btn modal-close">Cancel</button><button class="primary-btn">Save project</button></div></form></div>`);
  $$(".modal-close").forEach(b=>b.onclick=closeModal);
  $("#projectForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const obj={name:f.get("name"),owner:f.get("owner"),status:f.get("status"),due:f.get("due"),progress:index===null?0:p.progress};if(index===null)state.projects.unshift(obj);else state.projects[index]=obj;closeModal();renderPage();showToast(index===null?"Project created":"Project updated");};
}
function openInviteModal(){
  openModal(`<div class="modal" role="dialog" aria-modal="true" aria-labelledby="inviteTitle"><div class="modal-header"><div><h2 id="inviteTitle">Invite team member</h2><p>Send a workspace invitation.</p></div><button class="modal-close" aria-label="Close">×</button></div><form id="inviteForm"><label>Name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Role<select name="role"><option>Developer</option><option>Designer</option><option>Marketing</option></select></label><div class="modal-actions"><button type="button" class="secondary-btn modal-close">Cancel</button><button class="primary-btn">Send invite</button></div></form></div>`);
  $$(".modal-close").forEach(b=>b.onclick=closeModal);
  $("#inviteForm").onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);state.team.push({name:f.get("name"),email:f.get("email"),role:f.get("role"),status:"Invited"});closeModal();renderPage();showToast("Invitation sent");};
}
function openSearch(){
  openModal(`<div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><div><h2>Global search</h2><p>Search projects, people, and workspace activity.</p></div><button class="modal-close" aria-label="Close">×</button></div><input id="globalSearch" autofocus placeholder="Type to search..."><div id="globalResults" class="empty"><strong>Start typing</strong>Results will appear here.</div></div>`);
  $$(".modal-close").forEach(b=>b.onclick=closeModal);
  $("#globalSearch").oninput=e=>{const q=e.target.value.toLowerCase();const results=[...state.projects.map(p=>p.name),...state.team.map(t=>t.name)].filter(x=>x.toLowerCase().includes(q));$("#globalResults").innerHTML=results.length?results.map(x=>`<p>${x}</p>`).join(""):`<div class="empty"><strong>No results</strong>Try a different search term.</div>`};
}
document.addEventListener("click",e=>{
  const nav=e.target.closest("[data-page]");if(nav)navigate(nav.dataset.page);
  const action=e.target.closest("[data-action]");if(action&&action.dataset.action==="new-project")openProjectModal();if(action&&action.dataset.action==="invite")openInviteModal();
});
$$(".auth-tab").forEach(b=>b.onclick=()=>switchAuth(b.dataset.auth));
$("#authForm").onsubmit=e=>{e.preventDefault();const email=$("#authEmail").value.trim(),pass=$("#authPassword").value;$("#authError").textContent="";if(!email||!email.includes("@"))return $("#authError").textContent="Please enter a valid email address.";if(pass.length<6)return $("#authError").textContent="Password must contain at least 6 characters.";setAuth(true);renderAuth();showToast("Welcome to NexaFlow");};
$("#logoutBtn").onclick=()=>{setAuth(false);renderAuth();showToast("Signed out successfully");};
$("#openSidebar").onclick=()=>$("#sidebar").classList.add("open");$("#closeSidebar").onclick=()=>$("#sidebar").classList.remove("open");
$("#searchBtn").onclick=openSearch;$("#notificationBtn").onclick=()=>showToast("You have 3 unread notifications");
$("#profileBtn").onclick=()=>showToast("Profile menu — demo action");
$("#modalRoot").onclick=e=>{if(e.target.id==="modalRoot")closeModal()};
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();if(isLoggedIn())openSearch();}if(e.key==="Escape")closeModal();});
renderAuth();
