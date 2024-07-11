
# API Documentation

## Overview

This API provides endpoints to fetch data about schools and kindergartens. It supports fetching basic information, detailed information by ID, and random selections of schools and kindergartens.

### Base URL





## Endpoints

### Schools Endpoints

#### 1. Get Basic Information about Schools
- **URL**: `/api/schools`
- **Method**: `GET`
- **Description**: Fetches basic information about all schools within the specified radius.
- **Parameters**: None
- **Response**: Array of school objects with `id`, `name`, and `location`.

**Example Response**:
```json
[
  {
    "id": "1",
    "name": "School A",
    "location": {
      "lat": 48.123456,
      "lng": 11.123456
    }
  },
  ...
]
````

#### 2. Get School Details by ID

- **URL**: `/api/schools/:id`
- **Method**: `GET`
- **Description**: Fetches detailed information about a school by its ID.
- **Parameters**:
  - `id`: The ID of the school
- **Response**: An object containing the `address`, `phoneNumbers`, and `location`.

**Example Response**:

```json
{
  "address": "123 School Street",
  "phoneNumbers": ["123-456-7890"],
  "location": {
    "lat": 48.123456,
    "lng": 11.123456
  }
}
```

#### 3. Get Random Schools

- **URL**: `/api/schools/random/:numSchools`
- **Method**: `GET`
- **Description**: Fetches a random selection of schools.
- **Parameters**:
  - `numSchools`: The number of random schools to fetch.
- **Response**: Array of school objects with `id`, `name`, `address`, `location`, and `phoneNumbers`.

**Example Response**:

```json
[
  {
    "id": "1",
    "name": "School A",
    "address": "123 School Street",
    "location": {
      "lat": 48.123456,
      "lng": 11.123456
    },
    "phoneNumbers": ["123-456-7890"]
  },
  ...
]
```

### Kindergartens Endpoints

#### 1. Get Basic Information about Kindergartens

- **URL**: `/api/kindergartens`
- **Method**: `GET`
- **Description**: Fetches basic information about all kindergartens within the specified radius.
- **Parameters**: None
- **Response**: Array of kindergarten objects with `id`, `name`, and `location`.

**Example Response**:

```json
[
  {
    "id": "1",
    "name": "Kindergarten A",
    "location": {
      "lat": 48.123456,
      "lng": 11.123456
    }
  },
  ...
]
```

#### 2. Get Kindergarten Details by ID

- **URL**: `/api/kindergarten/:id`
- **Method**: `GET`
- **Description**: Fetches detailed information about a kindergarten by its ID.
- **Parameters**:
  - `id`: The ID of the kindergarten
- **Response**: An object containing the `address`, `phoneNumbers`, and `location`.

**Example Response**:

```json
{
  "address": "123 Kindergarten Street",
  "phoneNumbers": ["123-456-7890"],
  "location": {
    "lat": 48.123456,
    "lng": 11.123456
  }
}
```

#### 3. Get Random Kindergartens

- **URL**: `/api/kindergarten/random/:numSchools`
- **Method**: `GET`
- **Description**: Fetches a random selection of kindergartens.
- **Parameters**:
  - `numSchools`: The number of random kindergartens to fetch.
- **Response**: Array of kindergarten objects with `id`, `name`, `address`, `location`, and `phoneNumbers`.

**Example Response**:

```json
[
  {
    "id": "1",
    "name": "Kindergarten A",
    "address": "123 Kindergarten Street",
    "location": {
      "lat": 48.123456,
      "lng": 11.123456
    },
    "phoneNumbers": ["123-456-7890"]
  },
  ...
]
```

```

```
