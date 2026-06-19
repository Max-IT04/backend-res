document.addEventListener("click", async (event) => {
  const target = event.target;

  // ====== УДАЛЕНИЕ ======
  if (target.dataset.type === "remove") {
    const id = target.dataset.id;
    try {
      await remove(id);
      target.closest("li").remove();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Не удалось удалить заметку");
    }
  }

  // ====== РЕДАКТИРОВАНИЕ ======
  if (target.dataset.type === "edit") {
    const id = target.dataset.id;
    const noteElement = document.getElementById(`note-${id}`);

    if (!noteElement) {
      console.error("Note element not found for id:", id);
      return;
    }

    const currentTitle = noteElement.textContent;
    const newTitle = prompt("Введите новое название заметки:", currentTitle);

    if (newTitle === null || newTitle.trim() === "") {
      return;
    }

    try {
      console.log("Updating note:", { id, newTitle });
      await updateNote(id, newTitle.trim());
      noteElement.textContent = newTitle.trim();
    } catch (error) {
      console.error("Update error:", error);
      alert("Не удалось обновить заметку");
    }
  }
});

// ====== ФУНКЦИИ ДЛЯ ЗАПРОСОВ ======
async function remove(id) {
  const response = await fetch(`/${id}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
  return response.json();
}

async function updateNote(id, title) {
  console.log("Sending PUT request:", { id, title });

  const response = await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server response:", errorText);
    throw new Error(`Update failed: ${response.status}`);
  }

  return response.json();
}
