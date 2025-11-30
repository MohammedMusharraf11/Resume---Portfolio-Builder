#!/bin/bash

echo "========================================"
echo "Starting Resume Portfolio App"
echo "========================================"
echo ""

echo "[1/2] Starting Backend Server..."
cd backend && npm run dev &
BACKEND_PID=$!
sleep 3

echo "[2/2] Starting Frontend Server..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Both servers are starting..."
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:8080"
echo ""
echo "Backend PID:  $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "========================================"
echo ""

# Wait for both processes
wait
