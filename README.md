##  Userテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many  :groups, through: :user_groups
- has_many  :comments
- has_many  :user_groups


## Groupテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null: false, unique: true|

### Association
- has_many  :users, through: :user_groups
- has_many  :comments


## Users_Groupsテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


##  Commentテーブル

|Column|Type|Option|
|------|----|------|
|body|text|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user