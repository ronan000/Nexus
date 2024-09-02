<?php
$host = "localhost";
$user = "root";
$password = "";
$database = "kultoura";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sectionQuery = "SELECT section_id, section_name FROM section";
$sectionResult = $conn->query($sectionQuery);
$sections = [];
if ($sectionResult->num_rows > 0) {
    while ($row = $sectionResult->fetch_assoc()) {
        $sections[] = $row;
    }
}

$catalogueQuery = "SELECT catalogue_id, catalogue_name FROM catalogue";
$catalogueResult = $conn->query($catalogueQuery);
$catalogues = [];
if ($catalogueResult->num_rows > 0) {
    while ($row = $catalogueResult->fetch_assoc()) {
        $catalogues[] = $row;
    }
}

$subcatalogueQuery = "SELECT subcat_id, subcat_name FROM subcatalogue";
$subcatalogueResult = $conn->query($subcatalogueQuery);
$subcatalogues = [];
if ($subcatalogueResult->num_rows > 0) {
    while ($row = $subcatalogueResult->fetch_assoc()) {
        $subcatalogues[] = $row;
    }
}

$conn->close();

echo json_encode([
    'sections' => $sections,
    'catalogues' => $catalogues,
    'subcatalogues' => $subcatalogues
]);
?>