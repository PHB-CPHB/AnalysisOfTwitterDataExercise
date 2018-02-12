# Analysis Of Twitter

## Requirements
 - NPM and Node - Guide can be found [https://www.npmjs.com/get-npm](here)
 - Docker - Guide can be found [https://www.docker.com](here)
 - Terminal

## Setup Docker and Database
 1. Make sure to have Docker installed and working in a terminal.
 2. Run the following commands in the terminal
   - docker run --rm -v $(pwd)/data:/data/db --publish=27017:27017 --name dbms -d mongo
   - docker exec -it dbms bash
   - apt-get update
   - apt-get install -y wget
   - apt-get install -y unzip
   - wget http://cs.stanford.edu/people/alecmgo/trainingandtestdata.zip
   - unzip trainingandtestdata.zip
   - sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv
   - mongoimport --drop --db social_net --collection tweets --type csv --headerline --file testdata.manual.2009.06.14.csv
   
 ## Usage
 1. Clone the project
 2. Make sure the have installed NPM and Node.
 3. Open a new terminal and go to the project
 4. Write node -v (The version must be 8.4.0 if not please update)
 5. Write "npm install"
 6. Write "npm run"
 7. Be sure to see that the terminal says "Server started on 127.0.0.1:8081"
 8. Open browser and go to 127.0.0.1:8081/
 There is a list undernet to see where you can see the result
    - Total Count -> 127.0.0.1:8081/totalCount
    - Most Grumpy -> 127.0.0.1:8081/mostGrumpy
    - Most Happy -> 127.0.0.1:8081/mostHappy
    - Most Active -> 127.0.0.1:8081/mostActive
    - Most Mentioned -> 127.0.0.1:8081/mostMentioned
    - Most Links -> 127.0.0.1:8081/mostLink
