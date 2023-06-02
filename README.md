# Wardrobify

Team:

* Dream Ramirez - Shoes microservice
* Samantha Chin - Hats microservice

## Design

## Shoes microservice

Explain your models and integration with the wardrobe
microservice, here.

## Hats microservice

The Location Value Object, defined as LocationVO, is the value object
for the Hat Model. It is defined by polling from the Location Model
defined in the Wardrobe (monolith) for the Hats (microservice).

The Hat Model is defined to store all instances of hats in the
Wardrobe. It has multiple attributes listed below. The location attribute
is the foreign key, linking the LocationVO and Hat models. Every hat instance
will be tied to a location.
1-Style Name
2-Fabric
3-Color
4-Picture URL
5-Location

API Documentation
| Method | What it does                   | URL                                       |
| :----- |:-------------------------------| :-----------------------------------------|
| GET    | List hats                      | (http://localhost:8090/api/hats/)         |
| POST   | Create a hat                   | (http://localhost:8090/api/hats/)         |
| GET    | Display a specific hat details | (http://localhost:8090/api/hats/hat_id/) |
| DELETE | Delete a specific hat          | (http://localhost:8090/api/hats/hat_id/) |
