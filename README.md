# Open Psychology
This is a MeteorJS (https://meteor.com) project.

You can read about the project here: https://boutinov.website/work/open-psychology


## Install
```
meteor npm install
```


## Usage

To run the project, execute
```
meteor --settings ./dev-settings.json
```
Note: all secrects have been removed using BFG repo-cleaner so that this repo could go public. To run the project, you would have to provide your own AWS S3 credentials in `.dev-settings.json`.


## Directory layout

Basic project structure looks like this:

```
imports/
  startup/
    client/
      index.js                 # import client startup through a single index entry point
      routes.js                # set up all routes in the app
      useraccounts-configuration.js # configure login templates
    server/
      fixtures.js              # fill the DB with example data on startup
      index.js                 # import server startup through a single index entry point

  api/
    lists/                     # a unit of domain logic
      server/
        publications.js        # all list-related publications
        publications.tests.js  # tests for the list publications
      lists.js                 # definition of the Lists collection
      lists.tests.js           # tests for the behavior of that collection
      methods.js               # methods related to lists
      methods.tests.js         # tests for those methods

  ui/
    components/                # all reusable components in the application
                               # can be split by domain if there are many
    layouts/                   # wrapper components for behaviour and visuals
    pages/                     # entry points for rendering used by the router

client/
  main.js                      # client entry point, imports all client code

server/
  main.js                      # server entry point, imports all server code
```

[Special directories|https://guide.meteor.com/structure.html#special-directories].
