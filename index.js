$.ajax({
  url: "https://sportea.eu/v1/api.php?key=a38088a3a9ba7c256f6580413927a274",
  method: "GET",
  dataType: "json",
})
  .done(function (data) {
    const schedule = data[0].schedule;
    const displayDiv = $("#display");

    Object.keys(schedule).forEach((sport) => {
      const card = $('<div class="card mt-5 bg-body-tertiary"></div>');
      const cardHeader = $(`<div class="card-header"></div>`).text(
        sport.toUpperCase()
      );
      const cardBody = $('<div class="card-body table-responsive"></div>');
      const sportTable = $('<table class="table table-striped"></table>');

      displayDiv.append(card.append(cardHeader, cardBody.append(sportTable)));

      const tableHead = $("<thead></thead>").appendTo(sportTable);
      const headerRow = $("<tr></tr>").appendTo(tableHead);

      headerRow.append("<th>#</th>");
      headerRow.append("<th>Event Time</th>");
      headerRow.append("<th>Teams</th>");
      headerRow.append("<th class='text-center'>Link</th>");

      const tableBody = $("<tbody></tbody>").appendTo(sportTable);

      schedule[sport].forEach((event, index) => {
        const eventRow = $("<tr></tr>").appendTo(tableBody);

        eventRow.append(`<td> ${index + 1}</td>`);

        const eventTime = new Date(event.event_time * 1000);
        const formattedTime = eventTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        eventRow.append("<td>" + formattedTime + "</td>");
        eventRow.append(`<td>${event.teams}</td>`);

        eventRow.append(
          `<td class='text-center'> <a href="/sp.html?ch=${event.channel_id}" target="_blank"> <button class="btn btn-primary"> Watch Stream </button> </a>
          <a href="https://url-shotner101.blogspot.com/p/s.html?url=https://tahib-american.blogspot.com/p/stream.html?ch=${event.channel_id}" target="_blank"> <button class="btn btn-primary"> Watch Stream </button> </a>
          </td>`
        );

        $(".cursor-pointer").click(function () {
          $(this).addClass("text-danger");
        });
      });
    });
  })
  .fail(function () {
    console.error("Request failed");
  });

function copyToClipboard(ch_Id, title) {
  let copyUrl = encodeURI(
    `https://s.footy1.tk/re?redirect=${localStorage.getItem(
      "selectedUrl"
    )}?ch=${ch_Id}&match=${title}`
  );

  window.navigator.clipboard.writeText(copyUrl);
}
