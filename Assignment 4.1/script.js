function processHeroInfo() {
    // Get the Hero Name
    let txtName = document.getElementById("txtName");
    // Get the Race type
    let txtRace = document.getElementById("txtRace");
    // Get the Class type
    let txtClass = document.getElementById("txtClass");
    // Get the Weapon type
    let txtWeapons = document.getElementById("txtWeapons");

    // Get output divs
    let divOutput = document.getElementById("divOutput");
    let divHeroInfo = document.getElementById("divHeroInfo");

    // Display the Hero Info on the page
    divHeroInfo.innerHTML = "Name: " + txtName.value + "<br>Race: " + txtRace.value + "<br>Class: "
        + txtClass.value + "<br>Weapons: " + txtWeapons.value;

    // Show output section
    divOutput.style.display = "block";

    // Clear input fields
    txtName.value = "";
    txtRace.value = "";
    txtClass.value = "";
    txtWeapons.value = "";

    return false; // Prevent default form submission
} 
