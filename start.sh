
cd ./service
nohup python -m flask run --port 3002 > service.log &
echo "Start service complete!"


cd ..
echo "" > front.log
nohup pnpm dev > front.log &
echo "Start front complete!"
tail -f front.log
