class Api::YoutubeController < ApplicationController
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
    }
    service.list_searches(:snippet, opt)
  end

  def index
    @video_ids = []

    videos = find_video("新型コロナ")

    videos.items.each do |video|
      @video_ids.push(video.id.video_id)
    end

  end
end
