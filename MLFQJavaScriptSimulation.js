
/*
 * Multilevel Feedback Queue (MLFQ) Scheduling Simulation
 *
 * This is a simplified example of how MLFQ manages CPU time.
 *
 * The simulation uses three processes that all arrive at the
 * same time. Each process starts in the highest-priority queue
 * and receives a limited amount of CPU time.
 *
 * If a process does not finish during its allocated time,
 * it moves to a lower-priority queue, where it can continue
 * running until it completes.
 *
 * To keep the example simple, the simulation does not include
 * processes arriving at different times, waiting for I/O
 * operations, or periodically moving processes back to the
 * highest-priority queue to prevent starvation.
 *
 * The purpose is to demonstrate the basic operation of MLFQ,
 * not to reproduce every feature of a real operating system.
 */

// Define the CPU time intervals for each priority queue.
const timeIntervals = [2, 4, 8];

// Create three priority queues.
const queues = timeIntervals.map(() => []);

// Define the processes and their required CPU time.
const processes = [
  { id: "Checkout", remaining: 3 },
  { id: "Product search", remaining: 5 },
  { id: "Inventory report", remaining: 12 }
];

// All processes start in the highest-priority queue.
processes.forEach(process => queues[0].push({ ...process }));

// Track the total simulated CPU time.
let currentTime = 0;

// Continue until all queues are empty.
while (queues.some(queue => queue.length > 0)) {

  // Find the highest-priority queue with waiting processes.
  const level = queues.findIndex(queue => queue.length > 0);

  // Select the next process from that queue.
  const process = queues[level].shift();

  // Run the process for its interval or until it finishes.
  const duration = Math.min(
    process.remaining,
    timeIntervals[level]
  );

  console.log(
    `${currentTime}-${currentTime + duration}: ` +
    `${process.id} (Queue ${level + 1})`
  );

  // Update the simulated time and remaining CPU work.
  currentTime += duration;
  process.remaining -= duration;

  if (process.remaining === 0) {

    // The process has completed.
    console.log(`  ${process.id} completed`);

  } else {

    // Move unfinished processes to a lower-priority queue.
    const nextLevel = Math.min(level + 1, queues.length - 1);
    queues[nextLevel].push(process);
  }
}

// Display the total simulated execution time.
console.log(`All processes completed at time ${currentTime}.`);

/*
Simulation Output (Tested in Programiz)

0-2: Checkout (Queue 1)
2-4: Product search (Queue 1)
4-6: Inventory report (Queue 1)
6-7: Checkout (Queue 2)
  Checkout completed
7-10: Product search (Queue 2)
  Product search completed
10-14: Inventory report (Queue 2)
14-20: Inventory report (Queue 3)
  Inventory report completed
All processes completed at time 20.
*/
