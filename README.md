# Chat-space DB設計

## usersテーブル
|Column  |Type  |Options    |
|--------|------|-----------|
|nickname|string|null: false|
|email   |string|null: false|
|password|string|null: false|
### Association
- has_many :groups, through: :users_groups
- has_many :messages
- has_many :photos

## groupsテーブル
|Column|Type  |Options    |
|------|------|-----------|
|name  |string|null: false|
### Association
- has_many :users, through: :users_groups
- has_many :messages
- has_many :photos

## users_groupsテーブル
|Column  |Type   |Options                      |
|--------|-------|-----------------------------|
|user_id |integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column    |Type   |Options                       |
|----------|-------|------------------------------|
|text      |text   |null: false                   |
|created_at|string |null: false                   |
|user_id   |integer|null: false, foreign_key: true|
|group_id  |integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## photosテーブル
|Column    |Type   |Options                       |
|----------|-------|------------------------------|
|photo     |string |null: false                   |
|created_at|string |null: false                   |
|user_id   |integer|null: false, foreign_key: true|
|group_id  |integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group