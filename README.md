# notiz.dev API

## Get started

```bash
npm i

cd mail-templates
npm i

cd ..

npm run start:dev
```

See Swagger APi [localhost:3000/api](http://localhost:3000/api).

## Email Templates

```bash
cd mail-templates

npm run watch

# build for production, copies to Nest JS application
npm run production
```

Add handlebar placeholder using `@{{username}}` which compiles down to `{{username}}` in the mail template.
