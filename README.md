# MyAngularUserManagementApp

is basically exactly the same application as MyIonicReactUserManagementApp. It is practically a CRUD (Create, Read, Update, Delete) app, but not developed in Ionic/React but in Angular/Material. It also uses the same web services and you can use either of the two Docker containers

Essentially, the following concepts are demonstrated:

- Docker
- Angular
- PostgreSQL as a data source with Prisma
- REST web service with JavaScript

A PostgreSQL database is be used for data storage. The web service is implemented in a Docker container and can be run with the following command if Docker is installed:

`docker run -d -p 8081:8081 uhwgmxorg/my-user-management-json-docker-image:0.0.0`

or

`docker run -p 8081:8081 -p 5432:5432 -e POSTGRES_USER=dev_user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydb -d uhwgmxorg/my-user-management-postgresql-docker-image:0.0.0`

like in MyIonicReactUserManagementApp https://github.com/uhwgmxorg/MyIonicReactUserManagementApp.node
