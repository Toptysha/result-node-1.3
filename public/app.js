document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "edit") {
    const id = e.target.dataset.id;
    let liParent = e.target.closest("li");
    let titleFromHTML = e.target.closest("li").querySelector("p").textContent;

    let copyLiParent = liParent.cloneNode(true);

    liParent.innerHTML = ``;

    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("value", titleFromHTML);
    liParent.appendChild(input);

    let divButtons = document.createElement("div");
    liParent.appendChild(divButtons);

    let acceptButton = document.createElement("button");
    acceptButton.setAttribute("class", "btn btn-success m-1");
    acceptButton.textContent = "Accept";
    divButtons.appendChild(acceptButton);
    acceptButton.addEventListener("click", (event) => {
      let titleFromInput = input.value;

      let newLiParent = event.target.closest("li");

      edit(id, titleFromInput).then(() => {
        newLiParent.innerHTML = copyLiParent.innerHTML;
        let titleForHTML = newLiParent.querySelector("p");
        titleForHTML.textContent = titleFromInput;
      });
    });

    let cancelButton = document.createElement("button");
    cancelButton.setAttribute("class", "btn btn-danger m-1");
    cancelButton.textContent = "Cancel";
    divButtons.appendChild(cancelButton);
    cancelButton.addEventListener("click", (event) => {
      let newLiParent = event.target.closest("li");
      newLiParent.innerHTML = copyLiParent.innerHTML;
    });
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
