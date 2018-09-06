# Symfony4 Admin Template (incl. Docker)

## Disclaimer
Admin refers to the fact that the template has a set firewall and a login page, it does not contain any fancy graphs or similar

![Symfony4 Admin Template](https://raw.githubusercontent.com/primus852/symfony4-admin-template/master/template.png)
*Main Page*

## Setup
1. Clone Repository `git clone https://github.com/primus852/symfony4-admin-template`
2. Change to directory `cd symfony4-admin-template`
3. Fire up the Docker Container and log in to the console `docker-compose up -d && docker-compose run httpd bash`
4. You are now in the Docker Image
5. Install Composer Dependencies:  `composer update`
6. Install NPM Assets `cd public && npm install`
7. Open Your browser `http://localhost`, you should see the Login Page

## Load Users
The docker-compose.yml is set to load anything from the 'data' folder. This folder contains a prepared database with a user:
Username: admin
Password: ABcd1234

However, if you opt for the persistent mysql database (check docker-compose.yml), create the database structure with `php bin/console doctrine:migrations:migrate`, afterwads you can load the User via `php bin/console doctrine:fixtures:load` (careful, this will purge the database).

To be continued...
