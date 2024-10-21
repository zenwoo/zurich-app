# Motor Insurance Pricing API

## Description

This project provides a motor insurance pricing API, allowing users to query premiums based on product code and location, with administrative features to manage products and pricing.

## Project setup

```bash
$ npm install
```

## Compile and run the project

1. Create a .env.local file with the following content in `api` directory:

    > **NOTE:** Make sure to update `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_PASSWORD` and `JWT_SECRET` with your own values.

    ```
    DATABASE_HOST=
    DATABASE_PORT=
    DATABASE_PASSWORD=
    JWT_SECRET=
    ```

2. Start the development server:

    ```bash
    # development
    $ npm run start

    # watch mode
    $ npm run start:dev

    # production mode
    $ npm run start:prod
    ```

## Running with Docker Compose

1. Build and start the services using Docker Compose:

```bash
docker-compose up -d --build
```

2. Stop and remove the services and network

```bash
docker-compose down
```

## Interacting with the Swagger UI

1. Go to [jwt.io](https://jwt.io/) to generate a JWT token.

2. In the **PAYLOAD** section, enter the following JSON:

    > **NOTE:** Feel free to modify the role field to any other value besides `Admin`. You'll notice that `POST`, `PUT`, and `DELETE` API requests will fail with a `forbidden` response

    ```json
    {
      "sub": "1234567890",
      "iat": 1516239022,
      "role": [
        "Admin"
      ]
    }
    ```

3. In the **VERIFY SIGNATURE** section, replace `your-256-bit-secret` with `CwdKzE4H3rcXd2DM`.

4. Copy the encoded JWT token.

5. Navigate to [Swagger UI](http://localhost:3000/api/swagger-ui).

6. Click on **Authorize**, paste the copied JWT token into the `Value` field and click **Authorize** button.

7. You can now test all the available APIs.
