##Initial Setup
npm install

##Setup DB
1) Duplicate the .env.example into a file named `.env`. Update the url in the file with your postgres DB credentials. You don't need to create the db.

2) Run `npx prisma generate`

3) Run `npx prisma migrate dev --name init`

4) Run `npm run seed`
