# Find A Friend API
An API for animal's organizations to register their accounts and post their little furry friends (or not) for adoption!

## Functionalities

- Create a new organization
- Authenticate your account
- Create new pets for adoption
- Search pets by city & characteristics

## Technologies Used

- Node.js
- Typescript
- Fastify
- Prisma
- Zod
- Docker (PostgreSQL)
- Vitest
- Supertest

## Installing the Project

```
git clone *projet-url*

cd *projects-directory*

npm install
```

## Load Docker Image (PostgreSQL)

*Reminder: Docker software must be installed previously.

```
docker compose up -d
```

## Functional Requirements

## Application Rules
- [x] It must be possible to register a pet.
- [x] It must be possible to list all pets available for adoption in a city.
- [x] It must be possible to filter pets by their characteristics.
- [ ] It must be possible to view details of a pet for adoption.
- [x] It must be possible to register as an organization.
- [x] It must be possible to log in as an organization.

## Business Rules
- [x] To list pets, it is mandatory to provide the city.
- [x] An ORG must have an address and a WhatsApp number.
- [x] A pet must be linked to an ORG.
- [x] All filters, besides the city, are optional.
- [x] For an ORG to access the application as an admin, it needs to be logged in.

## Routes

### Organization Routes

#### Register Organization

```http
  POST /organization
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Mandatory**. Organization's name |
| `name_responsible` | `string` | **Mandatory**. Organization's responsible person name |
| `email` | `string` | **Mandatory**. Organization's email. |
| `password` | `string` | **Mandatory**. Organization's password. |
| `address` | `string` | **Mandatory**. Organization's address. |
| `city` | `string` | **Mandatory**. Organization's city. |
| `postal_code` | `string` | **Mandatory**. Organization's postal_code. |
| `image` | `string` | **Optional**. Organization's image. |
| `whatsapp` | `string` | **Mandatory**. Organization's whatsapp. |

#### Authenticate Organization

```http
  POST /authenticate
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Mandatory**. Organization's email. |
| `password` | `string` | **Mandatory**. Organization's password. |


### Pets Routes

#### Create Pet

```http
  POST /pets
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Mandatory**. Pet's name. |
| `about` | `string` | **Mandatory**. Pet's description. |
| `age` | `string` | **Mandatory**. Pet's age description. |
| `energy` | `number` | **Mandatory**. Pet's energy level. |
| `independent` | `string` | **Mandatory**. Pet's independency description. |
| `environment` | `string` | **Mandatory**. Pet's environment adaptability (small places, etc). |
| `city` | `string` | **Mandatory**. Pet's city (must be same as Organization that's creating pet). |
| `type` | `string` | **Mandatory**. Pet's type (dog, cat, bird, etc). |
| `requirements` | `string` | **Mandatory**. Pet's requirements for adoption. |
| `photo` | `string` | **Mandatory**. Pet's photo. |

#### Fetch Pets by City

```http
  GET /pets/city
```

| Query Params   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `query` | `string` | **Mandatory**. Query parameter, in this case is the city. |
| `page` | `number` | **Optional**. Page with pets information. |


#### Fetch Pets by Characteristics

```http
  GET /pets
```

| Body Data   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `city` | `string` | **Mandatory**. City to look up pets. |
| `age` | `string` | **Optional**. Pet's age. |
| `energy` | `string` | **Optional**. Pet's energy level. |
| `type` | `string` | **Optional**. Pet's type. |
| `independent` | `string` | **Optional**. Pet's independent description. |
| `environment` | `string` | **Optional**. Pet's environment description. |

## Take Aways

- Improved unit & integration testing abilities
- Better understanding of working with layers in application
- SOLIDs principles of dependencies inversion & single responsibilities
- Docker basic concepts practiced
- Build test environment