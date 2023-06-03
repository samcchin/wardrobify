# Wardrobify

Team:

* Dream Ramirez - Shoes microservice
* Samantha Chin - Hats microservice

## Design

## Shoes microservice

The Bin Value Object, defined as BinVO, is the value object for the
Shoe Model. It is defined by polling from the Bin Model defined in the
Wardrobe (monolith) for Shoes (microservice).

The Shoe model is defined to store all instances of shoes in the
Wardrobe. It has multiple attributes, listed below. The bin is the
foreign key, linking the BinVO and Shoe models.
Every shoe instance will be tied to a location.
Shoe Model attributes:
1-Model Name
2-Manufacturer
3-Color
4-Picture URL
5-Bin

API Documentation for Shoes
| Method | What it does                    | URL                                       |
| :----- |:--------------------------------| :-----------------------------------------|
| GET    | List shoes                      | (http://localhost:8090/api/hats/)         |
| POST   | Create a shoe                   | (http://localhost:8090/api/hats/)         |
| GET    | Display a specific shoe details | (http://localhost:8090/api/hats/hat_id/)  |
| DELETE | Delete a specific shoe          | (http://localhost:8090/api/hats/hat_id/)  |

## Hats microservice

The Location Value Object, defined as LocationVO, is the value object
for the Hat Model. It is defined by polling from the Location Model
defined in the Wardrobe (monolith) for Hats (microservice).

The Hat Model is defined to store all instances of hats in the
Wardrobe. It has multiple attributes, listed below. The location attribute is the foreign key, linking the LocationVO and Hat models. Every hat instance will be tied to a location.
Hat Model attributes:
1-Style Name
2-Fabric
3-Color
4-Picture URL
5-Location

API Documentation for Hats
| Method | What it does                   | URL                                       |
| :----- |:-------------------------------| :-----------------------------------------|
| GET    | List hats                      | (http://localhost:8080/api/shoes/)         |
| POST   | Create a hat                   | (http://localhost:8080/api/shoes/)         |
| GET    | Display a specific hat details | (http://localhost:8080/api/shoes/shoe_id/) |
| DELETE | Delete a specific hat          | (http://localhost:8080/api/shoes/shoe_id/) |
