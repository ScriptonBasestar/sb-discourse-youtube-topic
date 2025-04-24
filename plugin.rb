# frozen_string_literal: true

# name: discourse-plugin-youtube-topic
# about: TODO
# meta_topic_id: TODO
# version: 0.0.1
# authors: archmagece
# url: https://github.com/ScriptonBasestar/sb-discourse-youtube-topic
# required_version: 2.7.0

enabled_site_setting :youtube_topic_enabled

module ::MyPluginModule
  PLUGIN_NAME = "discourse-plugin-youtube-topic"
end

require_relative "lib/my_plugin_module/engine"

after_initialize do
  # Hook into topic creation
  DiscourseEvent.on(:topic_created) do |topic, opts, user|
    urls = opts.dig(:extra, :youtubeUrls)
    if SiteSetting.youtube_topic_enabled && urls.present?
      topic.custom_fields["youtube_video_urls"] = urls
      topic.save_custom_fields
    end
  end
end
