$.ajax({
  url: "https://sportea.eu/v1/api.php?key=a38088a3a9ba7c256f6580413927a274",
  method: "GET",
  dataType: "json",
})
  .done(function (data) {
    const schedule = data[0].schedule;
    const displayDiv = $("#display");

    Object.keys(schedule).forEach((sport) => {
      document.getElementById("navbar-links").innerHTML += `
          <li class="nav-item">
          <a class="nav-link" href="#${sport}">${sport.toUpperCase()}</a>
        </li>
          
          `;

      const card = $(
        `<div class="card my-5 bg-body-tertiary" id="${sport}"></div>`
      );
      const cardHeader = $(
        `<div class="card-header d-flex justify-content-between"></div>`
      ).html(
        `<span> ${sport.toUpperCase()} </span>   <span> ${data[0].date} </span>`
      );
      const cardBody = $('<div class="card-body table-responsive"></div>');
      const sportTable = $('<table class="table table-striped"></table>');

      displayDiv.append(card.append(cardHeader, cardBody.append(sportTable)));

      const tableHead = $("<thead></thead>").appendTo(sportTable);
      const headerRow = $("<tr></tr>").appendTo(tableHead);

      headerRow.append("<th>#</th>");
      headerRow.append("<th>Event Time</th>");
      headerRow.append("<th>Teams</th>");
      headerRow.append("<th ></th>");

      const tableBody = $("<tbody></tbody>").appendTo(sportTable);

      schedule[sport].forEach((event, index) => {
        const eventRow = $("<tr class='align-middle'></tr>").appendTo(
          tableBody
        );

        eventRow.append(`<td> ${index + 1}</td>`);

        const eventTime = new Date(event.event_time * 1000);
        const formattedTime = eventTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        eventRow.append("<td>" + formattedTime + "</td>");
        eventRow.append(`<td >${event.teams}</td>`);

        eventRow.append(
          `<td > 

          <div class="btn-group w-100">
            <a href="http://v1.s2watch.xyz/p/s.html?ch=${event.channel_id}" class="btn btn-primary text-white w-100">
                  Watch Now 
                  </a>
              
                  <button class="btn btn-secondary copyBtn w-100" onclick="copyToClipboard('${event.channel_id}')">Copy</button> 
              </div>
                  
              </td>`
        );
      });
    });
  })
  .fail(function () {
    window.location.reload();
  });

function copyToClipboard(ch_Id) {
  let copyUrl = encodeURI(`http://v1.s2watch.xyz/p/s.html?ch=${ch_Id}`);

  window.navigator.clipboard.writeText(copyUrl);
}

$("body").on("click", ".copyBtn", function () {
  $(this).addClass("btn-danger");
});
