## Microservice

### Team Props Microservice

The `Team Props Microservice` manages and provides data related to team-specific gbetting propositions (props). This
includes team-level statistics, betting markers, probabilities, and outcomes for specific matches

Request Parameters:

- Team Info
  - `teamId`: The unique identifier for a team
    - Example: `teamId=6` (represents `Dallas Mavericks`)
- Match Info
  - `matchId`: The unique identifier for a match
    - Example: `matchId=2292111`
- Market Info
  - `marketType`: Specifies the type of betting market (e.g., `Moneyline`, `Spread`, `Total Points`)
- Projection Info
  - `projectionType`: Specifies the projection data type to retrieve (e.g., `mean`, `median`, `all`)
    - Example: `projectType=mean`
- Market Status Info
  - `marketStatus`: Filters results based on the current market status (e.g., `active`, `suspended`)
    - Example: `marketStatus=active`
- Lines Info
  - `lineRange`: Filters results for lines within a specific range
    - Example: `lineRange=0.5-1.5`

API Endpoints:

1. Get Team Props by Team ID

- Endpoint: GET /teams/{teamId}/props
- Purpose: Retrieve props for a specific team based on various parameters.
- Request
- Parameters:
  - teamId (mandatory: query parameter): The unique identifier for a team.
  - matchId (optional): The unique identifier for the match.
  - marketType (optional): Specifies the type of betting market (e.g., Moneyline).
  - projectionType (optional): Specifies the projection type to retrieve (e.g., mean).
  - marketStatus (optional): Filters by market status (e.g., active).
  - lineRange (optional): Filters by line range(e.g., 0.5-1.5).
- Example Request:

```
GET /teams/6/props?matchId=2292111&marketType=Moneyline&projectionType=mean&marketStatus=active&lineRange=0.5-1.5
```

- Example Response:

```
{
  "team": {
    "id": 6,
    "abbr": "Dal"
  },
  "matchId": 2292111,
  "marketType": "Moneyline",
  "marketStatus": "active",
  "projections": {
    "mean": 0.6336,
    "median": 0.6336
  },
  "lines": [
    {
      "line": 0.5,
      "probs": {
        "over": 0.6332,
        "under": 0.3668
      },
      "status": "Market Not Suspended"
    }
  ]
}
```

2. Get Team Props for a Match

- Endpoint: GET /matches/{matchId}/teams
- Purpose: Retrieve props for both home and away teams in a specific match.
- Request Parameters:
  - matchId (mandatory: query parameter): The unique identifier for a match.
  - marketType (optional): Specifies the type of betting market (e.g., Moneyline).
  - projectionType (optional): Specifies the projection type to retrieve (e.g., mean).
  - marketStatus (optional): Filters by market status (e.g., active).
  - lineRange (optional): Filters by line range (e.g., 0.5-1.5).
- Example Request:

```
GET /matches/2292111/teams?marketType=Moneyline&projectionType=median&marketStatus=active&lineRange=0.5-1.0
```

- Example Response

```
{
  "matchId": 2292111,
  "teams": {
    "home": {
      "id": 6,
      "abbr": "Dal",
      "marketType": "Moneyline",
      "marketStatus": "active",
      "projections": {
        "mean": 0.6336,
        "median": 0.6336
      },
      "lines": [
        {
          "line": 0.5,
          "probs": {
            "over": 0.6332,
            "under": 0.3668
          },
          "status": "Market Not Suspended"
        }
      ]
    },
    "away": {
      "id": 9,
      "abbr": "GS",
      "marketType": "Moneyline",
      "marketStatus": "active",
      "projections": {
        "mean": 0.3668,
        "median": 0.3668
      },
      "lines": [
        {
          "line": 0.5,
          "probs": {
            "over": 0.3668,
            "under": 0.6332
          },
          "status": "Market Not Suspended"
        }
      ]
    }
  }
}
```

### Player Props Microservice

The Player Props Microservice handles player-specific betting data, such as individual player stats, performance
projections, and betting props for specific matches. It allows users to query data for specific players, their
performaces in matches, and related betting lines.

Request Parameters

- Player Info
  - playerId: The unique identifier for a player
    - Example: `playerId=338365` (represents `Stephen Curry`)
- Match Info
  - `matchId` (optional): The unique identifier for a match to retrieve player props for a specific game
    - Example: `matchId=2292111`
- Prop Info
  - `propName` (optional): Filters the type of props to retrieve (e.g., offense)
    - Example: `propName=offense`
  - `statType` (optional): Filters by the specific stat type (e.g., points, rebounds, assists)
    - Example: `statType=points`
- Projection Info
  - `projectionType` (optional): Specifies which projection to retrieve (e.g., mean, median)
    - Example: `projectionType=mean`
- Market Status Info
  - `marketStatus` (optional): Filters props based on the current market status (e.g., active, suspended)
  - Example: `marketStatus=active`
- Line Info
  - lineRange (optional): Filters by betting line values within a specific range
    - Example: `lineRange=29-30`

API Endpoints:

1. Get Player Props by Player ID

- Endpoint: GET /players/{playerId}/props
- Purpose: Retrieve all available props for a specific player.
- Request Parameters:
  - `playerId` (mandator: query parameter): The unique identifier for a player.
  - `matchId` (optional): Retrieve props for a specific match.
  - `propName` (optional): Filter by type of prop (e.g., `offense`).
  - `statType` (optional): Filter by stat type (e.g., `points`).
  - `projectionType` (optional): Retrieve specific projections (e.g., `mean`).
  - `marketStatus` (optional): Filter props based on market status.
  - `lineRange` (optional): Filter props within a specific line range.
- Example Request:

```
GET /players/338365/props?matchId=2292111&propName=offense&statType=points&projectionType=mean&marketStatus=active&lineRange=29-30

```

- Example Response:

```
{
  "player": {
    "id": 338365,
    "name": "Stephen Curry"
  },
  "props": [
    {
      "name": "offense",
      "type": "points",
      "projection": {
        "mean": 29.54,
        "median": 29.5398
      },
      "lines": [
        {
          "line": 29.5,
          "probs": {
            "over": 0.5016,
            "under": 0.4984
          },
          "status": "Market Not Suspended"
        }
      ]
    }
  ]
}
```

1. Get Player Props for a Specific Match

- Endpoint: GET /matches/{matchId}/players/{playerId}/props
- Purpose: Retrieve props for a player in a specific match.
- Request Parameters:
  - `matchId` (mandatory: query parameter): The unique identifier for a match.
  - `playerId` (mandatory: query parameter): The unique identifier for a player.
  - `propName` (optional): Filter by type of prop (e.g., `offense`).
  - `statType` (optional): Filter by stat type (e.g., `points`).
  - `projectionType` (optional): Retrieve specific projections (e.g., `median`).
  - `marketStatus` (optional): Filter props based on market status.
  - `lineRange` (optional): Filter props within a specific line range.
- Example Request:

```
GET /matches/2292111/players/338365/props?propName=offense&statType=points&projectionType=median
```

- Example Response:

```
{
  "matchId": 2292111,
  "player": {
    "id": 338365,
    "name": "Stephen Curry"
  },
  "props": [
    {
      "name": "offense",
      "type": "points",
      "projection": {
        "mean": 29.54,
        "median": 29.5398
      },
      "lines": [
        {
          "line": 29.5,
          "probs": {
            "over": 0.5016,
            "under": 0.4984
          },
          "status": "Market Not Suspended"
        }
      ]
    }
  ]
}
```

## Caching Layer and Strategy

A caching layer and the strategy to use it effectively and efficiently is crucial for improving performance, reducing
database load, and ensuring faster responses in a system that handles real-time data such as Sports Betting System that
we are designing.

### Caching Strategy Overview

I would like to use `Redis` as our caching layer. Redis is an in-memory data store that supports high-throughput and
low-latency read/write operations. It's well-suited for caching purposes due to its speed and scalability.

Redis will cache frequently accessed data (e.g., match data, player props, team props), reducing the need to hit the
database for every request. The cached data willhave an expiration time (TTL - Time to Live) to ensure freshness, and
I'll implement cache invalidatino to handle updates or changes in data.

### Caching Layer Design

1. Cacheable Data:

- Team Props Data: Team odds, match results, market types (e.g., Moneyline), and probabilities.
- Player Props Data: Individual player projections, stats, and betting lines.
- Match Data: Data related to a specific match (teams involed, match date)
- queries: Frequently queried combinations like `matchId`, `teamId`, and `playerId` will be cached.

2. Cache Keys: Cache keys should be unique, descriptive, and based on the parameters used to fetch the data.

- Team Props

```
team:{teamId}:match:{matchId}:props
```

- Player Props:

```
player:{playerId}:match:{matchId}:props
```

- Example A cache key for the team props of the "Dallas Mavericks" in match `2292111` can be

```
team:6:match:2292111:props`
```
