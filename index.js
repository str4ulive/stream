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
        `<div class="card mt-5 bg-body-tertiary" id="${sport}"></div>`
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
        const eventRow = $("<tr></tr>").appendTo(tableBody);

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
          `<td class='text-center'> 

          <div class=" d-flex gap-2 ">

            <a href="/sp.html?ch=${event.channel_id}" target="_blank"> 
              <button class="btn btn-primary rounded-0">Stream 1</button> 
            </a>
            <a href="https://s-url-shortener1364.blogspot.com/p/s.html?q=https://s-cr7str1364.blogspot.com/p/stream.html?ch=${event.channel_id}" target="_blank"> 
              <button class="btn btn-danger rounded-0 text-white">Stream 2</button> 
            </a>

            </div>


          </td>`
        );
      });
    });
  })
  .fail(function () {
    console.error("Request failed");
  });
