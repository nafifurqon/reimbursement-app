**1. Clone from online repository**
`git clone https://github.com/nafifurqon/reimbursement-app.git`

**2. Install**

```
npm install -g sequelize-cli
npm install
```

**3. Make sure there no database exists**
`sequelize db:drop`

**4. Create database using sequelize**
`sequelize db:create`

**5. Migrate to database**
`sequelize db:migrate`

**6. Create default user and status**
`sequelize db:seed:all`

**7. Run app for development**
`npm run dev`

**Usage**

**Access on web browser**
[localhost:3000/](http://localhost:3000/)

**List User**
| username      | password      | role    |    division   | 
| ------------- |:-------------:| -------:| -------------:|
| farhan        | PassFarhan    | Manager | Field Engineer|
| rizki         | PassRizki     | Staff   | Field Engineer|
| ravi          | PassRavi      | Manager | Finance       |
| ikhsan        | PassIkhsan    | Staff   | Finance       |
