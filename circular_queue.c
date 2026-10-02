#include <stdio.h>
#include <string.h>

#define SIZE 10

char queue[SIZE][50];

int front = -1;
int rear = -1;

/* Check whether queue is empty */
int isEmpty()
{
    return front == -1;
}

/* Check whether queue is full */
int isFull()
{
    return (rear + 1) % SIZE == front;
}

/* ENQUEUE - Add a song */
void enqueue(char song[])
{
    if (isFull())
    {
        printf("\nQueue is FULL!\n");
        return;
    }

    if (isEmpty())
    {
        front = 0;
        rear = 0;
    }
    else
    {
        rear = (rear + 1) % SIZE;
    }

    strcpy(queue[rear], song);

    printf("\n%s added successfully!\n", song);
    printf("Rear = %d\n", rear);
}

/* DEQUEUE - Play and remove front song */
void dequeue()
{
    if (isEmpty())
    {
        printf("\nQueue is EMPTY! No song to play.\n");
        return;
    }

    printf("\nPlaying: %s\n", queue[front]);
    printf("Front = %d\n", front);

    if (front == rear)
    {
        front = -1;
        rear = -1;
    }
    else
    {
        front = (front + 1) % SIZE;
    }
}

/* Display the queue */
void display()
{
    int i;

    if (isEmpty())
    {
        printf("\nQueue is EMPTY!\n");
        return;
    }

    printf("\n========== MUSIC PLAYLIST ==========\n");

    i = front;

    while (1)
    {
        printf("Index %d : %s", i, queue[i]);

        if (i == front)
        {
            printf(" <- FRONT");
        }

        if (i == rear)
        {
            printf(" <- REAR");
        }

        printf("\n");

        if (i == rear)
        {
            break;
        }

        i = (i + 1) % SIZE;
    }

    printf("====================================\n");
}

/* Check queue status */
void status()
{
    if (isEmpty())
    {
        printf("\nQueue Status : EMPTY\n");
    }
    else if (isFull())
    {
        printf("\nQueue Status : FULL\n");
    }
    else
    {
        printf("\nQueue Status : NOT FULL\n");
    }

    printf("Front : %d\n", front);
    printf("Rear  : %d\n", rear);
}

/* Main function */
int main()
{
    int choice;
    char song[50];

    while (1)
    {
        printf("\n\n===== CIRCULAR QUEUE - MUSIC PLAYLIST =====\n");
        printf("1. Add Song (Enqueue)\n");
        printf("2. Play Song (Dequeue)\n");
        printf("3. Display Playlist\n");
        printf("4. Check Queue Status\n");
        printf("5. Exit\n");

        printf("\nEnter your choice: ");
        scanf("%d", &choice);

        switch (choice)
        {
            case 1:

                printf("Enter song name: ");
                scanf(" %[^\n]", song);

                enqueue(song);
                break;

            case 2:

                dequeue();
                break;

            case 3:

                display();
                break;

            case 4:

                status();
                break;

            case 5:

                printf("\nProgram ended.\n");
                return 0;

            default:

                printf("\nInvalid choice! Try again.\n");
        }
    }

    return 0;
}