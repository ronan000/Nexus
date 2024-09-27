<?php
if (is_null($_SESSION["guest"])) {
  header("Location: ../guest-login.php");
}
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Homepage</title>
    <link rel="stylesheet" href="res/css/styles.css">
    <link rel="icon" href="assets/img/favicon.png" type="image/x-icon">
    <link href="assets/img/favicon.png" rel="icon">
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    >
    <link
    href="https://fonts.googleapis.com/css?family=Inter"
    rel="stylesheet"
  />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    >
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js"
      integrity="sha512-k/KAe4Yff9EUdYI5/IAHlwUswqeipP+Cp5qnrsUjTPCgl51La2/JhyyjNciztD7mWNKLSXci48m7cctATKfLlQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    ></script>
    <!-- Boxicons CDN Link -->
    <link
      href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
      rel="stylesheet"
    >
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body data-rsssl="1">
    <nav>
      <div class="navbar">
        <i class="bx bx-menu"></i>
        <div class="logo">
          <a href="index.php">
            <img
              src="assets/img/logo.png"
              style="height: auto"
              alt="Kultoura Logo"
            >
          </a>
        </div>
        <div class="nav-links">
          <div class="sidebar-logo">
            <img
              src="assets/img/favicon.png"
              style="justify-content: center"
              alt="Kultoura Logo"
              class="logo-name"
            >
            <i class="bx bx-x"></i>
          </div>
          <ul class="links">
            <li>
              <a href="scanner.php" class="close-nav"
                ><i class="fa fa-chevron-circle-left"></i
              ></a>
            </li>
            <li><a href="scanner.php">Home</a></li>
            <li><a href="igorot-dances.php">Igorot Dances</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="index.php">Log out</a></li>
          </ul>
        </div>
        <div class="search-box">
          <i class="bx bx-search"></i>
          <div class="input-box">
            <input type="text" placeholder="Search...">
          </div>
        </div>
      </div>
    </nav>

    <script src="res/js/scripts.js"></script>
  </body>
</html>