<!-- Proposal
id
title
description
date
proposer_name
client_name
time_unit
currency
list_style
settings (JSON)
created_at
updated_at
--------------------
proposal_objectives
id
proposal_id
description
--------------------
proposal_services
id
proposal_id
name
description
budget
estimated_time_min
estimated_time_max
optional? -->

### Proposal

| Column        | Type   | Notes                     |
| ------------- | ------ | ------------------------- |
| id            | number | Primary key               |
| title         | string |                           |
| description   | string |                           |
| date          | string | ISO date                  |
| proposer_name | string |                           |
| client_name   | string |                           |
| time_unit     | string | e.g., "day", "week"       |
| currency      | string | e.g., "USD", "IDR"        |
| list_style    | string | e.g., "bullet", "number"  |
| settings      | JSON   | Theme, pages, layout etc. |
| created_at    | string | Timestamp                 |
| updated_at    | string | Timestamp                 |

### Proposal_Objectives

| Column      | Type   | Notes       |
| ----------- | ------ | ----------- |
| id          | number | Primary key |
| proposal_id | number | Foreign key |
| description | string |             |

### Proposal_Services

| Column             | Type    | Notes                       |
| ------------------ | ------- | --------------------------- |
| id                 | number  | Primary key                 |
| proposal_id        | number  | Foreign key                 |
| name               | string  | Service name                |
| description        | string  |                             |
| budget             | number  |                             |
| estimated_time_min | number  | Min estimated time          |
| estimated_time_max | number  | Max estimated time          |
| optional           | boolean | True if service is optional |
