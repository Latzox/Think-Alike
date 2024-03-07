const socket = io();

const roomInput = document.getElementById('roomInput');
const nameInput = document.getElementById('nameInput');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');
const roomStatus = document.getElementById('roomStatus');

joinButton.addEventListener('click', () => {
  const roomId = roomInput.value;
  const playerName = nameInput.value;
  socket.emit('joinRoom', { roomId, playerName });
});

leaveButton.addEventListener('click', () => {
  const roomId = roomInput.value;
  socket.emit('leaveRoom', { roomId, playerName: nameInput.value });
});

// When successfully joined a room
socket.on('joinedRoom', () => {
  document.getElementById('roomInput').style.display = 'none';
  document.getElementById('nameInput').style.display = 'none';
  document.getElementById('joinButton').style.display = 'none';
  document.getElementById('leaveButton').style.display = 'block'; // Show the leave button
  document.getElementById('roomStatus').style.display = 'block';
  document.getElementById('word-guess-container').style.display = 'inline';
});

// When successfully left a room
socket.on('leftRoom', () => {
  document.getElementById('roomInput').style.display = 'block'; // Adjust as per your original layout
  document.getElementById('nameInput').style.display = 'block';
  document.getElementById('joinButton').style.display = 'block';
  document.getElementById('leaveButton').style.display = 'none'; // Hide the leave button again
  document.getElementById('roomStatus').style.display = 'none';
  roomStatus.innerHTML = ``;
  const wordsTableBody = document.getElementById('words-table').getElementsByTagName('tbody')[0];
  wordsTableBody.innerHTML = ''; // Clear previous entries
  document.getElementById('word-guess-container').style.display = 'none';
});

socket.on('updateRoom', (room) => {
  // Update the room status display
  roomStatus.innerHTML = `Players in room: ${room.players.map(p => p.name).join(', ')}`;
  document.getElementById('roomStatus').style.display = 'block';
});

socket.on('roomFull', () => {
  alert('Room is full. Try another one.');
});

// Step 3.1: Handle form submission
document.getElementById('word-guess-form').addEventListener('submit', function (e) {
  const roomId = roomInput.value;
  e.preventDefault(); // Prevent the default form submission
  const word = document.getElementById('word-guess-input');
  socket.emit('submitWord', { roomId, word: word.value }); // Send the word value to the server
});

socket.on('wordsRevealed', (words) => {
  const wordsTableBody = document.getElementById('words-table').getElementsByTagName('tbody')[0];
  wordsTableBody.innerHTML = ''; // Clear previous entries
  words.forEach(({ player, word }) => {
    const row = wordsTableBody.insertRow();
    const playerCell = row.insertCell(0);
    const wordCell = row.insertCell(1);
    playerCell.textContent = player; // This displays the player ID. Consider mapping IDs to player names for readability.
    wordCell.textContent = word; // Ensure this is accessing the 'word' string property correctly.
  });
});