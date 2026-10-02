# circular-queue-music-playlist
# 🎵 Circular Queue – Music Playlist Manager

A Data Structures and Algorithms mini-project implemented using **C** and an interactive **HTML, CSS and JavaScript** visualizer.

## 📌 Project Overview

This project demonstrates the concept of a **Circular Queue** using a music playlist as a real-life application.

In a circular queue, the last position is connected back to the first position. When the rear reaches the last index, it can move back to index 0 if space is available.

The circular movement is performed using:

`(index + 1) % SIZE`

For this project, the queue has a capacity of **10 songs**.

---

## 🎯 Objectives

- Understand the concept of a Circular Queue.
- Implement Circular Queue using C.
- Perform Enqueue and Dequeue operations.
- Handle FULL and EMPTY conditions.
- Demonstrate Front and Rear positions.
- Demonstrate circular wrap-around.
- Visualize the data structure using a web interface.

---

## 🎵 Real-Life Problem Statement

A music playlist can be represented using a queue.

Songs are added to the playlist from the rear and played from the front following the **FIFO (First In, First Out)** principle.

A Circular Queue allows the available positions to be reused after the rear reaches the last position.

### Example

```text
Song A → Song B → Song C → Song D
   ↑                         ↓
   └────── Circular ─────────┘
