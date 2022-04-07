#Build reacjs app with productipn mode
npm run build

#Move to build folder
cd build

#Clone index.html into 200.html
cp index.html 200.html

#Start deploying via Surgem
#The command means deploy current folder to domain paul
surge . zaolil-todo-app.surge.sh