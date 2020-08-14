Rails.application.routes.draw do
  root 'articles#index'
  get 'articles/index'
end
