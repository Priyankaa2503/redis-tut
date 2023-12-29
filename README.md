Connect to Redis server :
redis-cli

Set a key-value pair :
SET key_name "value"

Get the value of a key :
GET key_name

Set a key-value pair with expiration (in seconds) :
SETEX key_name expiration_time "value"

Set a key-value pair only if the key does not exist :
SETNX key_name "value"

Check if a key exists :
EXISTS key_name

Delete a key :
DEL key_name

Increment a key (if the key holds an integer) :
INCR key_name

Decrement a key (if the key holds an integer) :
DECR key_name

List all keys matching a pattern :
KEYS pattern

List all members of a set :
SMEMBERS set_name

Add a member to a set :
SADD set_name "member"

Remove a member from a set :
SREM set_name "member"

Get the number of members in a set :
SCARD set_name

List all items in a list :
LRANGE list_name 0 -1

Push an item onto the beginning of a list :
LPUSH list_name "item"

Pop an item from the beginning of a list :
LPOP list_name

