document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    const titleFromPrompt = prompt("New title?");

    if (titleFromPrompt !== null) {
      edit(id, titleFromPrompt).then(() => {
        let titleFromHTML = e.target.closest("li").querySelector("p");
        titleFromHTML.textContent = titleFromPrompt;
      });
    }
  }

  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;

    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  }
});

async function edit(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
