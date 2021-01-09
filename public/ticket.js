const createTicket = (newOrder, schedule, movie, date) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
  <title>Ticket</title>
</head>
<body>
  
<div class="card" style="width: 250px">
    <img class="card-img-top"
      src="${movie.imgUrl}"
      alt="SPIDER-MAN: INTO THE SPIDER-VERSE" style="width:100%">
    <div class="card-body">
      <h4 class="card-title">
        ${movie.title}
      </h4>
      <p class="card-text" margin="0">Cinema: <span class="black">
          ${schedule.cinema}
        </span>
      </p>
      <p class="card-text">Date & Time: <span class="black">
          ${date}
        </span>
      </p>
      <p class="card-text">Seat(s): <span class="black">
          ${newOrder.seats.join(', ')} </span></p>
      <p class="card-text">Seat Quantity: <span class="black">${
        newOrder.seats.length
      }</span></p>
      <p class="card-text">Ticket Price: <span class="black">${
        schedule.price
      }</span> </p>
      <p class="card-text">Total: <span class="black">${
        newOrder.seats.length * schedule.price
      }</span></p>
    </div>
  </div>

<style>
@import url(' https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
html,
body {
  font-family: 'Poppins', sans-serif;
  width: 100%;
  height: 400px;
  background-size: cover;
  color: #93a7a6;
}
.center {
  padding-top: 10px;
  padding-bottom: 10px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.h4,
h4 {
  text-align: center;
}
.h5,
h5 {
  text-align: center;
  margin-bottom: 0;
}
.p {
  margin-bottom: 0;
  margin-top: 0;
  margin: 0;
}
.card {
  margin: 0 auto;
  float: none;
  padding-bottom: 0px;
  margin-top: 30px;
  margin-bottom: 0px;
}
.card-text {
  margin-bottom: 0rem;
}

.black {
  color: #444;
}
</style>
</body>
</html>`;

module.exports = createTicket;
