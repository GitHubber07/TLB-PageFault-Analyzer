# TLB & Page Fault Simulator

A memory management simulator that visualizes page replacement algorithms with TLB caching.

## Features
- Simulates FIFO, LRU, Optimal, and Clock algorithms
- Tracks TLB hits/misses and page faults
- Displays frame allocation changes step-by-step
- Configurable number of frames

## How to Run
1. Install Node.js (v18+)
2. Clone this repository:
   ```bash
   git clone https://github.com/GitHubber07/TLB-PageFault-Analyzer.git
   ```
3. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your browser

## Usage
1. Select an algorithm from the dropdown
2. Enter page numbers (comma-separated, e.g. "1, 2, 3, 4")
3. Set the number of frames (e.g. 3)
4. Click "Simulate" to see results

## Example Simulation
**Input**:
- Pages: `1, 2, 3, 2, 1`
- Frames: `3`
- Algorithm: `FIFO`

**Output**:
```
Hit Rate: 40.0%
Total Hits: 2 | Misses: 3

Step  Page  Frame 1  Frame 2  Frame 3  Status
-------------------------------------------
1     1     1        -        -        Miss
2     2     1        2        -        Miss
3     3     1        2        3        Miss
4     2     1        2        3        Hit
5     1     1        2        3        Hit
```


## Technical Details
- **Backend**: Node.js with Express
- **Frontend**: Plain JavaScript/HTML/CSS
- **Algorithms**:
  - FIFO (First-In-First-Out)
  - LRU (Least Recently Used)
  - Optimal
  - Clock
