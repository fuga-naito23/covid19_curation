Rails.application.routes.draw do
  root 'articles#index'
  get 'articles/index'

  resources :youtube, only: :index
end