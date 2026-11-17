// Store Buddy's information in one object.
// Weight and happiness are numbers so JavaScript can do math with them.
var pet_info = {
  name: "Buddy",
  weight: 8,
  happiness: 5
};

// Remember whether a pet comment has appeared yet.
var hasShownPetComment = false;

// Wait until the page is ready before connecting the buttons.
$(function () {
  updatePetInfoInHtml();

  // Connect the existing buttons to their action functions.
  $(".treat-button").click(clickedTreatButton);
  $(".play-button").click(clickedPlayButton);
  $(".exercise-button").click(clickedExerciseButton);

  // Connect the Nap button.
  $(".nap-button").click(clickedNapButton);
});

// A treat increases happiness and weight.
function clickedTreatButton() {
  pet_info.happiness += 2;
  pet_info.weight += 1;

  finishAction("That treat was delicious. Thank you!");
}

// Playing increases happiness and decreases weight.
function clickedPlayButton() {
  if (petNeedsCare()) {
    showPetComment("Buddy needs care before he can play. Give him a treat first.");
    return;
  }

  pet_info.happiness += 2;
  pet_info.weight -= 1;

  finishAction("Playing with you is so much fun!");
}

// Exercise decreases happiness and weight.
function clickedExerciseButton() {
  if (petNeedsCare()) {
    showPetComment("Buddy needs care before he can exercise. Give him a treat first.");
    return;
  }

  pet_info.happiness -= 1;
  pet_info.weight -= 1;

  finishAction("Whew! I earned a rest after that workout.");
}

// A nap restores happiness but does not change weight.
function clickedNapButton() {
  pet_info.happiness += 3;

  finishAction("That nap made me feel refreshed!");
}

// Check the pet's values, keep them at zero or higher, and update the webpage.
function finishAction(message) {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();

  // Show a care message if either stat has reached zero.
  if (petNeedsCare()) {
    showPetComment("Buddy needs care. Give him a treat to restore his stats.");
  } else {
    showPetComment(message);
  }
}

// Return true if Buddy's weight or happiness is zero.
function petNeedsCare() {
  return pet_info.weight === 0 || pet_info.happiness === 0;
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

// Show Buddy's current information in the matching HTML elements.
function updatePetInfoInHtml() {
  $(".name").text(pet_info.name);
  $(".weight").text(pet_info.weight);
  $(".happiness").text(pet_info.happiness);
}

// Show Buddy's latest comment.
function showPetComment(message) {
  var $comment = $(".pet-comment");

  if (hasShownPetComment) {
    // Unique method 1: slideUp() makes the current message box slide up and hide.
    // 2000 means this animation takes 2 seconds.
    $comment.slideUp(2000, function () {
      // After the old message is hidden, replace it with the new message.
      $comment.text(message);

      // Unique method 2: slideDown() makes the box slide down and show the new message.
      // 2000 means this animation takes 2 seconds.
      $comment.slideDown(2000);
    });
  } else {
    // Put the first message in the box and slide it down into view.
    $comment.text(message);
    $comment.slideDown(2000);
    hasShownPetComment = true;
  }
}