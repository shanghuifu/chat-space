class Group < ApplicationRecord
  has_many :users, through: :group_users
  has_many :users_groups
end