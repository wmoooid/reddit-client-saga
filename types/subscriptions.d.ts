export type SubscriptionsResponseChildren = {
  kind: 't5';
  data: {
    user_flair_background_color: null;
    submit_text_html: string;
    restrict_posting: boolean;
    user_is_banned: boolean;
    free_form_reports: boolean;
    wiki_enabled: boolean;
    user_is_muted: boolean;
    user_can_flair_in_sr: null;
    display_name: string;
    header_img: string;
    title: string;
    original_content_tag_enabled: boolean;
    allow_galleries: boolean;
    icon_size: number[];
    primary_color: string;
    active_user_count: null;
    icon_img: string;
    display_name_prefixed: string;
    accounts_active: null;
    public_traffic: boolean;
    subscribers: number;
    user_flair_richtext: never[];
    videostream_links_count: number;
    name: string;
    quarantine: boolean;
    hide_ads: boolean;
    prediction_leaderboard_entry_type: string;
    emojis_enabled: boolean;
    advertiser_category: string;
    public_description: string;
    comment_score_hide_mins: number;
    allow_predictions: boolean;
    user_has_favorited: boolean;
    user_flair_template_id: null;
    community_icon: string;
    banner_background_image: string;
    header_title: string;
    community_reviewed: boolean;
    submit_text: string;
    description_html: string;
    spoilers_enabled: boolean;
    allow_talks: boolean;
    header_size: number[];
    user_flair_position: string;
    all_original_content: boolean;
    has_menu_widget: boolean;
    is_enrolled_in_new_modmail: null;
    key_color: string;
    can_assign_user_flair: boolean;
    created: number;
    wls: number;
    show_media_preview: boolean;
    submission_type: string;
    user_is_subscriber: boolean;
    disable_contributor_requests: boolean;
    allow_videogifs: boolean;
    should_archive_posts: boolean;
    user_flair_type: string;
    allow_polls: boolean;
    collapse_deleted_comments: boolean;
    emojis_custom_size: null;
    public_description_html: string;
    allow_videos: boolean;
    is_crosspostable_subreddit: null;
    notification_level: string;
    can_assign_link_flair: boolean;
    accounts_active_is_fuzzed: boolean;
    allow_prediction_contributors: boolean;
    submit_text_label: string;
    link_flair_position: string;
    user_sr_flair_enabled: null;
    user_flair_enabled_in_sr: boolean;
    allow_discovery: boolean;
    accept_followers: boolean;
    user_sr_theme_enabled: boolean;
    link_flair_enabled: boolean;
    subreddit_type: string;
    suggested_comment_sort: null;
    banner_img: string;
    user_flair_text: null;
    banner_background_color: string;
    show_media: boolean;
    id: string;
    user_is_moderator: boolean;
    over18: boolean;
    description: string;
    submit_link_label: string;
    user_flair_text_color: null;
    restrict_commenting: boolean;
    user_flair_css_class: null;
    allow_images: boolean;
    lang: string;
    whitelist_status: string;
    url: string;
    created_utc: number;
    banner_size: number[];
    mobile_banner_image: string;
    user_is_contributor: boolean;
    allow_predictions_tournament: boolean;
  };
};

export type SubscriptionsResponseData = {
  after: null;
  dist: number;
  modhash: null;
  geo_filter: string;
  children: SubscriptionsResponseChildren[];
  before: null;
};

export type SubscriptionsResponse = {
  data: SubscriptionsResponseData;
  kind: 'Listing';
};
