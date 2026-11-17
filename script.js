// Store the pet's information in one object.
// Weight and happiness are numbers so we can do math with them.
var pet_info = {
  name: "Milo",
  weight: 8,
  happiness: 5
};

// Remember whether a pet comment has already appeared.
var hasShownPetComment = false;

// Wait until the page elements are ready before connecting the buttons.
$(function () {
  updatePetInfoInHtml();

  // Connect the existing buttons to their action functions.
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);

  // Connect the new Nap button.
  $(".nap-button").click(clickedNapButton);
});

// A treat increases both happiness and weight.
function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;

  checkAndUpdatePetInfoInHtml();
  showPetComment("That treat was delicious. Thank you!");
}

// Playing increases happiness and uses some weight.
function clickedPlayButton() {
  pet_info.happiness += 2;
  pet_info.weight -= 1;

  checkAndUpdatePetInfoInHtml();
  showPetComment("Playing with you is so much fun!");
}

// Exercise decreases both happiness and weight.
function clickedExerciseButton() {
  pet_info.happiness -= 1;
  pet_info.weight -= 1;

  checkAndUpdatePetInfoInHtml();
  showPetComment("Whew! I earned a rest after that workout.");
}

// A nap restores happiness without changing weight.
function clickedNapButton() {
  pet_info.happiness += 3;

  checkAndUpdatePetInfoInHtml();
  showPetComment("That nap made me feel refreshed!");
}

// Check the pet's values, then update the numbers shown on the page.
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

// Keep weight and happiness from going below zero.
function checkWeightAndHappinessBeforeUpdating() {
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
}

// Put the current pet information into the matching HTML elements.
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
}

// Show the pet's latest comment.
function showPetComment(message) {
  var $comment = $(".pet-comment");

  if (hasShownPetComment) {
    // Unique method 1: slideUp() hides the previous comment with a sliding motion.
    $comment.slideUp(200, function () {
      $comment.text(message);

      // Unique method 2: slideDown() reveals the new comment with a sliding motion.
      $comment.slideDown(300);
    });
  } else {
    $comment.text(message);

    // Show the first comment with a sliding motion.
    $comment.slideDown(300);
    hasShownPetComment = true;
  }
}