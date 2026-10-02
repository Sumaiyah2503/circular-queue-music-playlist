/* =========================================================
   CIRCULAR QUEUE — MUSIC PLAYLIST MANAGER
   Capacity = 10
========================================================= */

const CAPACITY = 10;

/* Queue storage */
let queue = new Array(CAPACITY).fill(null);

/* Circular Queue pointers */
let front = -1;
let rear = -1;
let count = 0;

/* Playlist songs */
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

let nextSongIndex = 0;


/* =========================================================
   HTML ELEMENTS
========================================================= */

const queueElement = document.getElementById("queue");

const frontValue = document.getElementById("front-value");
const rearValue = document.getElementById("rear-value");
const sizeValue = document.getElementById("size-value");

const currentSong = document.getElementById("current-song");
const currentStatus = document.getElementById("current-status");

const message = document.getElementById("message");
const operationText = document.getElementById("operation-text");

const heroSong = document.getElementById("hero-song");


/* =========================================================
   CREATE QUEUE VISUAL
========================================================= */

function createQueueSlots() {

    queueElement.innerHTML = "";

    for (let i = 0; i < CAPACITY; i++) {

        const slot = document.createElement("div");

        slot.className = "queue-slot";

        slot.id = `slot-${i}`;

        slot.innerHTML = `
            <span class="index">INDEX ${i}</span>

            <span class="empty">＋</span>

            <div class="position-labels"></div>
        `;

        queueElement.appendChild(slot);
    }

    updateQueueDisplay();
}


/* =========================================================
   UPDATE QUEUE VISUAL
========================================================= */

function updateQueueDisplay() {

    for (let i = 0; i < CAPACITY; i++) {

        const slot = document.getElementById(`slot-${i}`);

        if (!slot) continue;

        slot.classList.remove("front", "rear");

        const index = slot.querySelector(".index");
        const labels = slot.querySelector(".position-labels");

        if (queue[i] !== null) {

            slot.innerHTML = `
                <span class="index">INDEX ${i}</span>

                <span class="song">
                    🎵 ${queue[i]}
                </span>

                <div class="position-labels"></div>
            `;

        } else {

            slot.innerHTML = `
                <span class="index">INDEX ${i}</span>

                <span class="empty">＋</span>

                <span style="
                    font-size:10px;
                    color:#a8adbd;
                    margin-top:4px;
                ">
                    Empty
                </span>

                <div class="position-labels"></div>
            `;
        }

        const labelContainer =
            slot.querySelector(".position-labels");


        /* Front indicator */

        if (i === front && front !== -1) {

            slot.classList.add("front");

            labelContainer.innerHTML += `
                <span class="front-label">
                    FRONT
                </span>
            `;
        }


        /* Rear indicator */

        if (i === rear && rear !== -1) {

            slot.classList.add("rear");

            labelContainer.innerHTML += `
                <span class="rear-label">
                    REAR
                </span>
            `;
        }
    }


    /* Update numbers */

    if (front === -1) {
        frontValue.textContent = "-";
    } else {
        frontValue.textContent = front;
    }

    if (rear === -1) {
        rearValue.textContent = "-";
    } else {
        rearValue.textContent = rear;
    }

    sizeValue.textContent =
        `${count} / ${CAPACITY}`;
}


/* =========================================================
   CHECK QUEUE EMPTY
========================================================= */

function isEmpty() {

    return count === 0;
}


/* =========================================================
   CHECK QUEUE FULL
========================================================= */

function isFull() {

    return count === CAPACITY;
}


/* =========================================================
   ENQUEUE
   ADD SONG
========================================================= */

function addSong() {

    /* Check FULL */

    if (isFull()) {

        message.textContent =
            "🔴 Queue Full! All 10 positions are occupied.";

        message.className =
            "status-message full";

        operationText.textContent =
            "ENQUEUE stopped because count = 10. " +
            "The queue must have an empty position before inserting a new song.";

        return;
    }


    /* Select next song */

    const song = songs[nextSongIndex];

    nextSongIndex =
        (nextSongIndex + 1) % songs.length;


    /* First insertion */

    if (isEmpty()) {

        front = 0;
        rear = 0;

    } else {

        /*
            Circular movement:

            Rear = (Rear + 1) % Capacity
        */

        rear = (rear + 1) % CAPACITY;
    }


    /* Insert song */

    queue[rear] = song;

    count++;


    /* Update screen */

    updateQueueDisplay();


    currentSong.textContent = song;

    currentStatus.textContent =
        `Added at index ${rear}`;

    heroSong.textContent = song;


    message.textContent =
        `✨ ${song} added at Rear → Index ${rear}`;

    message.className =
        "status-message success";


    operationText.textContent =
        `ENQUEUE: ${song} was inserted at Rear. ` +
        `Rear is now ${rear}. ` +
        `Queue size = ${count}/${CAPACITY}.`;


    /* Special wrap-around explanation */

    if (rear === 0 && count > 1) {

        operationText.textContent +=
            " 🔄 Wrap-around happened! " +
            "Rear moved from index 9 back to index 0.";
    }
}


/* =========================================================
   DEQUEUE
   PLAY / REMOVE FRONT SONG
========================================================= */

function playSong() {

    /* Check EMPTY */

    if (isEmpty()) {

        message.textContent =
            "🔵 Queue Empty! There is no song to play.";

        message.className =
            "status-message";

        currentSong.textContent =
            "No song playing";

        currentStatus.textContent =
            "Add songs to begin";

        operationText.textContent =
            "DEQUEUE stopped because count = 0. " +
            "The queue is empty.";

        return;
    }


    /* Store Front song */

    const playedSong = queue[front];

    const oldFront = front;


    /* Remove Front */

    queue[front] = null;

    count--;


    /* If queue becomes empty */

    if (count === 0) {

        front = -1;
        rear = -1;

        currentSong.textContent =
            "No song playing";

        currentStatus.textContent =
            "Queue is empty";

        message.textContent =
            `🎵 ${playedSong} played. Queue is now EMPTY.`;

        message.className =
            "status-message success";

        operationText.textContent =
            `DEQUEUE: ${playedSong} was removed from Front ` +
            `at index ${oldFront}. ` +
            `Since count = 0, the queue is now empty.`;

    } else {

        /*
            Circular movement:

            Front = (Front + 1) % Capacity
        */

        front =
            (front + 1) % CAPACITY;


        currentSong.textContent =
            playedSong;

        currentStatus.textContent =
            `Played from index ${oldFront}`;

        heroSong.textContent =
            playedSong;


        message.textContent =
            `▶ ${playedSong} played & removed from index ${oldFront}`;

        message.className =
            "status-message success";


        operationText.textContent =
            `DEQUEUE: ${playedSong} was removed from Front ` +
            `at index ${oldFront}. ` +
            `Front moved to index ${front}.`;


        /* Wrap-around explanation */

        if (front === 0 && oldFront === 9) {

            operationText.textContent +=
                " 🔄 Wrap-around happened! " +
                "Front moved from index 9 back to index 0.";
        }
    }


    updateQueueDisplay();
}


/* =========================================================
   RESET QUEUE
========================================================= */

function resetQueue() {

    queue = new Array(CAPACITY).fill(null);

    front = -1;
    rear = -1;
    count = 0;

    nextSongIndex = 0;


    currentSong.textContent =
        "No song playing";

    currentStatus.textContent =
        "Add songs to begin";

    heroSong.textContent =
        "Song A";

    message.textContent =
        "✨ Playlist is ready. Add your first song!";

    message.className =
        "status-message";


    operationText.textContent =
        'Click "Add Song" to insert a song at the Rear.';


    updateQueueDisplay();
}


/* =========================================================
   INITIALIZE
========================================================= */

createQueueSlots();


/* =========================================================
   OPTIONAL KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener("keydown", function(event) {

    /* A = Add */

    if (
        event.key.toLowerCase() === "a" &&
        !event.ctrlKey &&
        !event.altKey
    ) {
        addSong();
    }


    /* P = Play / Dequeue */

    if (
        event.key.toLowerCase() === "p" &&
        !event.ctrlKey &&
        !event.altKey
    ) {
        playSong();
    }


    /* R = Reset */

    if (
        event.key.toLowerCase() === "r" &&
        !event.ctrlKey &&
        !event.altKey
    ) {
        resetQueue();
    }

});