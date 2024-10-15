# /bin/bash

docker run -it -v ./src/:/app/src analyzer-node /bin/sh
# docker run -it -p 2222:22 -v ./.ssh:/root/.ssh analyzer-node /bin/sh
