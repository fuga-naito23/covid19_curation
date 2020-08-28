class YoutubeController < ApplicationController
  GOOGLE_API_KEY = Rails.application.credentials.youtube[:api_key]

  def find_video(keyword)
    service = Google::Apis::YoutubeV3::YouTubeService.new
    service.key = GOOGLE_API_KEY

    next_page_token = nil

    opt = {
      q: keyword,
      type: 'video',
      max_results: 3,
      order: :date,
      page_token: next_page_token
      # published_after: after.iso8601,
      # published_before: before.iso8601
    }
    service.list_searches(:snippet, opt)
  end

  def index
    @videos = find_video("コロナ")
    binding.pry
  end
end
