Rails.application.routes.draw do
  root 'articles#index'
  get 'articles/index'

  namespace :api do
    resources :youtube, only: :index, defaults: { format: 'json' }
  end

end