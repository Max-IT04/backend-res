document.addEventListener('click', event => {
  const target = event.target;

  if (target.dataset.type === 'remove') {
    const id = target.dataset.id 

    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  }
})

async function remove (id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}