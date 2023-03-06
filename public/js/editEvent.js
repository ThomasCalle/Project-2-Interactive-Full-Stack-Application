$("#editEvent").click(async (event) => {
    event.preventDefault();
    event.stopPropagation();

    let eventData = await fetch(`/event/${event.target.dataset.id}`, {
        method: "GET", 
        headers: { 'Content-Type': 'application/json' },
    });
    eventData = await eventData.json();

    $('input[name="id"]').val(eventData.id);
    $('input[name="name"]').val(eventData.name);
    $('input[name="description"]').val(eventData.description);
    $('input[name="due_date"]').val(eventData.due_date);
    $(`select[name="category"] option[value=${eventData.category.id}]`).attr('selected','selected');

});