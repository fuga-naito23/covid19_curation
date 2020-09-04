class YoutubeController < ApplicationController
  GOOGLE_API_KEY = Rails.application.credentials.youtube[:api_key]

  def find_video(keyword)
    service = Google::Apis::YoutubeV3::YouTubeService.new
    service.key = GOOGLE_API_KEY

    next_page_token = nil

    opt = {
      q: keyword,
      type: 'video',
      max_results: 5,
      order: :relevance,
      page_token: next_page_token
      # published_after: after.iso8601,
      # published_before: before.iso8601
    }
    service.list_searches(:snippet, opt)
  end

  def index
    @video_ids = []
  
    movies = find_video("新型コロナ")
    
    movies.items.each do |movie|
     @video_ids.push(movie.id.video_id)
    end

  end
end
