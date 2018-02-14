# Analysis Of Twitter

## Requirements
 - NPM and Node - Guide can be found [here](https://www.npmjs.com/get-npm)
 - Docker - Guide can be found [here](https://www.docker.com)
 - Terminal

## Setup Docker and Database
 1. Make sure to have Docker installed and working in a terminal.
 2. Run the following commands in the terminal
   - Run docker run --rm -v $(pwd)/data:/data/db --publish=27017:27017 --name dbms -d mongo
   - Run docker exec -it dbms bash
   - Run apt-get update
   - Run apt-get install -y wget
   - Run apt-get install -y unzip
   - Run wget http://cs.stanford.edu/people/alecmgo/trainingandtestdata.zip
   - Run unzip trainingandtestdata.zip
   - Run sed -i '1s;^;polarity,id,date,query,user,text\n;' training.1600000.processed.noemoticon.csv
   - Run mongoimport --drop --db social_net --collection tweets --type csv --headerline --file testdata.manual.2009.06.14.csv
   
 ## Usage
 1. Clone the project
 2. Make sure the have installed NPM and Node.
 3. Open a new terminal and go to the project
 4. Run node -v (The version must be 8.4.0 if not please update)
 5. Run npm install
 6. Run npm run
 7. Be sure to see that the terminal says "Server started on 127.0.0.1:8081"
 8. Open browser and go to 127.0.0.1:8081/
 There is a list undernet to see where you can see the result
    - Total Count -> 127.0.0.1:8081/totalCount
    - Most Grumpy -> 127.0.0.1:8081/mostGrumpy
    - Most Happy -> 127.0.0.1:8081/mostHappy
    - Most Active -> 127.0.0.1:8081/mostActive
    - Most Mentioned -> 127.0.0.1:8081/mostMentioned
    - Most Links -> 127.0.0.1:8081/mostLink
