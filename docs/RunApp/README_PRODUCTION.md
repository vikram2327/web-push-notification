# Run Application
-   ## Run Using Docker File
    1. ### Build Image
        ```
        docker build -t webpush_notification:dev . 
        ```
    2. ### Run Container Using Image
        - powershell
            ```
            docker run --rm -v ${PWD}:/app -v /app/node_modules -p 127.0.0.1:8101:3000 -e CHOKIDAR_USEPOLLING=true --name webpush_notification-dev webpush_notification:dev
            ```
        - cmd
            ```
            docker run --rm -v %cd%:/app -v /app/node_modules -p 127.0.0.1:8101:3000 -e CHOKIDAR_USEPOLLING=true --name webpush_notification-dev webpush_notification:dev
            ```
*** 
# Run Application
-   ## Run Using Docker File
    1. ### Build Image
        ```
        sudo docker build -t webpush_notification:dev . 
        ```
    2. ### Run Container Using Image
        ```
        docker run --rm -v ${PWD}:/app -v /app/node_modules -p 127.0.0.1:8101:3000 -e CHOKIDAR_USEPOLLING=true --name webpush_notification-dev webpush_notification:dev
        ```
*** 
