// ==========================================
// CIRCULAR QUEUE - MUSIC PLAYLIST MANAGER
// ==========================================

const CAPACITY = 10;

const songs = [
    "Song A",
    "Song B",
    "Song C",
    "Song D",
    "Song E",
    "Song F",
    "Song G",
    "Song H",
    "Song I",
    "Song J"
];

// Circular Queue
let queue = new Array(CAPACITY).fill(null);

let front = -1;
let rear = -1;
let count = 0;

let nextSongIndex = 0;
let playingIndex=-1;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const queueContainer = document.getElementById("queue");

const frontDisplay = document.getElementById("front-value");
const rearDisplay = document.getElementById("rear-value");
const sizeDisplay = document.getElementById("size-value");
const stateDisplay = document.getElementById("state-value");

const currentSongDisplay =
    document.getElementById("current-song");

const currentStatus =
    document.getElementById("current-status");

const heroSong =
    document.getElementById("hero-song");

const message =
    document.getElementById("message");

const operationText =
    document.getElementById("operation-text");


// ==========================================
// DISPLAY QUEUE
// ==========================================

function renderQueue() {

    queueContainer.innerHTML = "";

    for (let i = 0; i < CAPACITY; i++) {

        const slot = document.createElement("div");

        slot.classList.add("queue-slot");

        // Filled position
        if (queue[i] !== null) {

            slot.classList.add("filled");

            slot.innerHTML = `
                <div class="slot-index">${i}</div>
                <div class="slot-song">${queue[i]}</div>
            `;

            // FRONT
            if (i === front) {
                slot.classList.add("front-slot");
            }
            if (i === playingIndex) {
    slot.classList.add("playing-slot");
}

            // REAR
            if (i === rear) {
                slot.classList.add("rear-slot");
            }

        }

        // Empty position
        else {

            slot.innerHTML = `
                <div class="slot-index">${i}</div>
                <div class="slot-song">Empty</div>
            `;
        }

        queueContainer.appendChild(slot);
    }


    // ======================================
    // UPDATE FRONT
    // ======================================

    frontDisplay.textContent =
        front === -1 ? "-" : front;


    // ======================================
    // UPDATE REAR
    // ======================================

    rearDisplay.textContent =
        rear === -1 ? "-" : rear;


    // ======================================
    // UPDATE SIZE
    // ======================================

    sizeDisplay.textContent =
        `${count} / ${CAPACITY}`;


    // ======================================
    // UPDATE STATE
    // ======================================

    if (count === 0) {

        stateDisplay.textContent = "EMPTY";

    }

    else if (count === CAPACITY) {

        stateDisplay.textContent = "FULL";

    }

    else {

        stateDisplay.textContent = "AVAILABLE";
    }
}


// ==========================================
// ADD SONG - ENQUEUE
// ==========================================

function addSong() {

    // Check FULL condition
    if (count === CAPACITY) {

        message.textContent =
            "🔴 Queue is FULL!";

        operationText.textContent =
            "All 10 positions are occupied. Play the playlist to continue.";

        return;
    }


    // Get next song
    const song = songs[nextSongIndex];


    // ======================================
    // FIRST INSERTION
    // ======================================

    if (count === 0) {

        front = 0;
        rear = 0;

    }

    // ======================================
    // NEXT INSERTION
    // ======================================

    else {

        rear = (rear + 1) % CAPACITY;
    }


    // Insert song
    queue[rear] = song;

    count++;


    // Move to next song
    nextSongIndex =
        (nextSongIndex + 1) % songs.length;


    // ======================================
    // UPDATE MESSAGE
    // ======================================

    message.textContent =
        `✨ ${song} added successfully!`;

    operationText.textContent =
        `Enqueue: ${song} was inserted at Rear = ${rear}.`;


    currentStatus.textContent =
        "Song added to playlist";


    renderQueue();
}


// ==========================================
// PLAY SONG - REPEATING CIRCULAR PLAYLIST
// ==========================================

function playSong() {

    // Check EMPTY condition
    if (count === 0) {

        message.textContent =
            "🫧 Queue is EMPTY!";

        operationText.textContent =
            "Add songs to the playlist first.";

        currentStatus.textContent =
            "Add songs to begin";

        return;
    }


    // ======================================
    // GET FRONT SONG
    // ======================================

    const currentSong = queue[front];
    playingIndex = front;


    // ======================================
    // DISPLAY CURRENT SONG
    // ======================================

    currentSongDisplay.textContent =
        currentSong;

    heroSong.textContent =
        currentSong;

    currentStatus.textContent =
        "Now playing";


    message.textContent =
        `🎵 ${currentSong} is playing!`;

    operationText.textContent =
        `Front = ${front}. ${currentSong} is being played.`;



    // ======================================
    // CIRCULAR MOVEMENT
    // ======================================

    /*
       IMPORTANT:

       We do NOT delete the song.

       Instead, Front moves to the next song.

       Example:

       A → B → C → D → ... → J → A
    */


    front = (front + 1) % count;


    // ======================================
    // WRAP AROUND
    // ======================================

    if (front === 0) {

        operationText.textContent =
            `🔄 Circular movement completed! Front wrapped back to 0. ${queue[front]} is next.`;
    }


    /*
       Count does NOT decrease.

       Because this is a repeating
       music playlist application.

       Therefore:

       A → B → C → ... → J → A → B → ...
    */


    renderQueue();
}


// ==========================================
// RESET QUEUE
// ==========================================

function resetQueue() {

    // Clear queue
    queue = new Array(CAPACITY).fill(null);


    // Reset pointers
    front = -1;
    rear = -1;


    // Reset count
    count = 0;


    // Start again from Song A
    nextSongIndex = 0;


    // Reset display
    currentSongDisplay.textContent =
        "No song playing";

    currentStatus.textContent =
        "Add songs to begin";

    heroSong.textContent =
        "Song A";

    message.textContent =
        "✨ Playlist is ready. Add your first song!";

    operationText.textContent =
        'Click "Add Song" to insert a song at Rear.';


    renderQueue();
}


// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        // A → Add Song
        if (event.key.toLowerCase() === "a") {
            addSong();
        }


        // P → Play Song
        if (event.key.toLowerCase() === "p") {
            playSong();
        }


        // R → Reset
        if (event.key.toLowerCase() === "r") {
            resetQueue();
        }

    }
);


// ==========================================
// INITIAL DISPLAY
// ==========================================

renderQueue();