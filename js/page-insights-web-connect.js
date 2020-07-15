var CONNECTION_NAME = 'Facebook page insight';
var START_DAY = 1293840000; // 01/01/2011 // note there is a bug with this currently. Need to check up on this...
var today = new Date();
var SINCE_DAY = Math.floor(today.setDate(today.getDate() - 90) / 1000); // TODAY / right now

//Helper function. Returns property if it exists in data object.
function ifexists(data, property) {
    var str = property.split('.')[0]; //get top level object
    if (data.hasOwnProperty(str)) {
        var strToRet = data[property.split('.')[0]][property.split('.')[1]]; //return second level object
        return strToRet;
    } else {
        return '';
    }
}
//Helper function. Builds url for initail search string for each page.
function buildUrl(pageCount, page_response) {
    var page_ids = Object.getOwnPropertyNames(page_response);
    var next_page = '/' + page_response[page_ids[pageCount - 1]].id + '/insights/' +
// Page Content
        'page_tab_views_login_top_unique,' +
        'page_tab_views_login_top,' +
        'page_tab_views_logout_top,' +
// Page CTA clicks
        'page_total_actions,' +
        'page_cta_clicks_logged_in_total,' +
        'page_cta_clicks_logged_in_unique,' +
        'page_cta_clicks_by_site_logged_in_unique,' +
        'page_cta_clicks_by_age_gender_logged_in_unique,' +
        'page_cta_clicks_logged_in_by_country_unique,' +
        'page_cta_clicks_logged_in_by_city_unique,' +
        'page_call_phone_clicks_logged_in_unique,' +
        'page_call_phone_clicks_by_age_gender_logged_in_unique,' +
        'page_call_phone_clicks_logged_in_by_country_unique,' +
        'page_call_phone_clicks_logged_in_by_city_unique,' +
        'page_call_phone_clicks_by_site_logged_in_unique,' +
        'page_get_directions_clicks_logged_in_unique,' +
        'page_get_directions_clicks_by_age_gender_logged_in_unique,' +
        'page_get_directions_clicks_logged_in_by_country_unique,' +
        'page_get_directions_clicks_logged_in_by_city_unique,' +
        'page_get_directions_clicks_by_site_logged_in_unique,' +
        'page_website_clicks_logged_in_unique,' +
        'page_website_clicks_by_age_gender_logged_in_unique,' +
        'page_website_clicks_logged_in_by_country_unique,' +
        'page_website_clicks_logged_in_by_city_unique,' +
        'page_website_clicks_by_site_logged_in_unique,' +
//Page Engagement
        'page_engaged_users,' +
        'page_post_engagements,' +
        'page_consumptions,' +
        'page_consumptions_unique,' +
        'page_consumptions_by_consumption_type,' +
        'page_consumptions_by_consumption_type_unique,' +
        'page_places_checkin_total,' +
        'page_places_checkin_total_unique,' +
        'page_places_checkin_mobile,' +
        'page_places_checkin_mobile_unique,' +
        'page_places_checkins_by_age_gender,' +
        'page_places_checkins_by_locale,' +
        'page_places_checkins_by_country,' +
        'page_negative_feedback,' +
        'page_negative_feedback_unique,' +
        'page_negative_feedback_by_type,' +
        'page_negative_feedback_by_type_unique,' +
        'page_positive_feedback_by_type,' +
        'page_positive_feedback_by_type_unique,' +
        'page_fans_online,' +
        'page_fans_online_per_day,' +
        'page_fan_adds_by_paid_non_paid_unique,' +
// Page Impressions
        'page_content_activity,' +
        'page_impressions,' +
        'page_impressions_unique,' +
        'page_impressions_paid,' +
        'page_impressions_paid_unique,' +
        'page_impressions_organic,' +
        'page_impressions_organic_unique,' +
        'page_impressions_viral,' +
        'page_impressions_viral_unique,' +
        'page_impressions_nonviral,' +
        'page_impressions_nonviral_unique,' +
        'page_impressions_by_story_type,' +
        'page_impressions_by_story_type_unique,' +
        'page_impressions_by_city_unique,' +
        'page_impressions_by_country_unique,' +
        'page_impressions_by_locale_unique,' +
        'page_impressions_by_age_gender_unique,' +
        'page_impressions_frequency_distribution,' +
        'page_impressions_viral_frequency_distribution,' +
// Page Posts
        'page_posts_impressions,' +
        'page_posts_impressions_unique,' +
        'page_posts_impressions_paid,' +
        'page_posts_impressions_paid_unique,' +
        'page_posts_impressions_organic,' +
        'page_posts_impressions_organic_unique,' +
        'page_posts_served_impressions_organic_unique,' +
        'page_posts_impressions_viral,' +
        'page_posts_impressions_viral_unique,' +
        'page_posts_impressions_nonviral,' +
        'page_posts_impressions_nonviral_unique,' +
        'page_posts_impressions_frequency_distribution,' +
// Page Post Engagement
        'post_engaged_users,' +
        'post_negative_feedback,' +
        'post_negative_feedback_unique,' +
        'post_negative_feedback_by_type,' +
        'post_negative_feedback_by_type_unique,' +
        'post_engaged_fan,' +
        'post_clicks,' +
        'post_clicks_unique,' +
        'post_clicks_by_type,' +
        'post_clicks_by_type_unique,' +
// // Negative Feedback Types
//         'hide_clicks,' +
//         'hide_all_clicks,' +
//         'report_spam_clicks,' +
//         'unlike_page_clicks,' +

// Page Reactions
        'page_actions_post_reactions_like_total,' +
        'page_actions_post_reactions_love_total,' +
        'page_actions_post_reactions_wow_total,' +
        'page_actions_post_reactions_haha_total,' +
        'page_actions_post_reactions_sorry_total,' +
        'page_actions_post_reactions_anger_total,' +
        'page_actions_post_reactions_total,' +

// Page User Demographics
        'page_fans,' +
        'page_fans_locale,' +
        'page_fans_city,' +
        'page_fans_country,' +
        'page_fans_gender_age,' +
        'page_fan_adds,' +
        'page_fan_adds_unique,' +
        'page_fan_removes,' +
        'page_fan_removes_unique,' +
        'page_fans_by_unlike_source_unique,' +

// Page Views
        'page_views_total,' +
        'page_views_logout,' +
        'page_views_logged_in_total,' +
        'page_views_logged_in_unique,' +
        'page_views_external_referrals,' +
        'page_views_by_profile_tab_total,' +
        'page_views_by_profile_tab_logged_in_unique,' +
        'page_views_by_internal_referer_logged_in_unique,' +
        'page_views_by_site_logged_in_unique,' +
        'page_views_by_age_gender_logged_in_unique,' +
        'page_views_by_referers_logged_in_unique,' +

// Page Video Views
        'page_video_views,' +
        'page_video_views_paid,' +
        'page_video_views_organic,' +
        'page_video_views_by_paid_non_paid,' +
        'page_video_views_autoplayed,' +
        'page_video_views_click_to_play,' +
        'page_video_views_unique,' +
        'page_video_repeat_views,' +
        'page_video_complete_views_30s,' +
        'page_video_complete_views_30s_paid,' +
        'page_video_complete_views_30s_organic,' +
        'page_video_complete_views_30s_autoplayed,' +
        'page_video_complete_views_30s_click_to_play,' +
        'page_video_complete_views_30s_unique,' +
        'page_video_complete_views_30s_repeat_views,' +

        '?since=' + SINCE_DAY;
    return next_page;
}
var myConnector = tableau.makeConnector();
// Define the schema
myConnector.getSchema = function(schemaCallback) {
    var cols = [{
        id: "page_name",
        alias: "Page Name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "page_username",
        alias: "Page Username",
        dataType: tableau.dataTypeEnum.string
    }, {
            id: "date",
            alias: "Date",
            description: "The Date as reported by Facebook",
            dataType: tableau.dataTypeEnum.date
        },
// Page Content
        {
            id: "page_tab_views_login_top_unique",
            alias: "page_tab_views_login_top_unique",
            description: "The number of users logged in to Facebook who saw tabs on your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_tab_views_login_top",
            alias: "page_tab_views_login_top",
            description: "The number of times users logged in to Facebook saw tabs on your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_tab_views_logout_top",
            alias: "page_tab_views_logout_top",
            description: "The number of times users not logged in to Facebook saw tabs on your Page",
            dataType: tableau.dataTypeEnum.int
        },
// CTA Clicks
        {
            id: "page_total_actions",
            alias: "page_total_actions",
            description: "The number of clicks on your Page's contact info and call-to-action button",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_logged_in_total",
            alias: "page_cta_clicks_logged_in_total",
            description: "Total number of clicks on the Page CTA button by people who are logged in to Facebook.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_logged_in_unique",
            alias: "page_cta_clicks_logged_in_unique",
            description: "Unique number of clicks on the Page CTA button by people who are logged in to Facebook",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_by_site_logged_in_unique",
            alias: "page_cta_clicks_by_site_logged_in_unique",
            description: "Number of people who are logged in to Facebook and clicked on the CTA button, broken down by www, mobile, api or other",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_by_age_gender_logged_in_unique",
            alias: "page_cta_clicks_by_age_gender_logged_in_unique",
            description: "Number of people who are logged in to Facebook and clicked the Page CTA button, broken down by age and gender group.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_logged_in_by_country_unique",
            alias: "page_cta_clicks_logged_in_by_country_unique",
            description: "Number of people who are logged in to Facebook and clicked the Page CTA button, broken down by country",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_cta_clicks_logged_in_by_city_unique",
            alias: "page_cta_clicks_logged_in_by_city_unique",
            description: "Number of people who are logged in to Facebook and clicked the Page CTA button, broken down by city",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_call_phone_clicks_logged_in_unique",
            alias: "page_call_phone_clicks_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Call Now button",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_call_phone_clicks_by_age_gender_logged_in_unique",
            alias: "page_call_phone_clicks_by_age_gender_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Call Now button, broken down by age and gender group",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_call_phone_clicks_logged_in_by_country_unique",
            alias: "page_call_phone_clicks_logged_in_by_country_unique",
            description: "Number of people who logged in to Facebook and clicked the Call Now button, broken down by countries",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_call_phone_clicks_logged_in_by_city_unique",
            alias: "page_call_phone_clicks_logged_in_by_city_unique",
            description: "Number of people who logged in to Facebook and clicked the Call Now button, broken down by city",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_call_phone_clicks_by_site_logged_in_unique",
            alias: "page_call_phone_clicks_by_site_logged_in_unique",
            description: "The number of people who clicked your Page's phone number or Call Now button while they were logged into Facebook, broken down by the type of device they used",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_get_directions_clicks_logged_in_unique",
            alias: "page_get_directions_clicks_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Get Directions button",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_get_directions_clicks_by_age_gender_logged_in_unique",
            alias: "page_get_directions_clicks_by_age_gender_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Get Directions button, broken down by age and gender group",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_get_directions_clicks_logged_in_by_country_unique",
            alias: "page_get_directions_clicks_logged_in_by_country_unique",
            description: "Number of people who logged in to Facebook and clicked the Get Directions button, broken down by country",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_get_directions_clicks_logged_in_by_city_unique",
            alias: "page_get_directions_clicks_logged_in_by_city_unique",
            description: "Number of people who logged in to Facebook and clicked the Get Directions button, broken down by city",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_get_directions_clicks_by_site_logged_in_unique",
            alias: "page_get_directions_clicks_by_site_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Get Directions button, broken down by www, mobile, api or other",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_website_clicks_logged_in_unique",
            alias: "page_website_clicks_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the goto website CTA button",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_website_clicks_by_age_gender_logged_in_unique",
            alias: "page_website_clicks_by_age_gender_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the goto website CTA button, broken down by age and gender group",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_website_clicks_logged_in_by_country_unique",
            alias: "page_website_clicks_logged_in_by_country_unique",
            description: "Number of people who logged in to Facebook and clicked the goto website CTA button, broken down by country",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_website_clicks_logged_in_by_city_unique",
            alias: "page_website_clicks_logged_in_by_city_unique",
            description: "Number of people who logged in to Facebook and clicked the goto website CTA button, broken down by city",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_website_clicks_by_site_logged_in_unique",
            alias: "page_website_clicks_by_site_logged_in_unique",
            description: "Number of people who logged in to Facebook and clicked the Page CTA button, broken down by www, mobile, api and other",
            dataType: tableau.dataTypeEnum.int
        },

//Page Engagemnt
        {
            id: "page_engaged_users",
            alias: "Page Engaged Users",
            description: "The number of people who engaged with your Page. Engagement includes any click",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_post_engagements",
            alias: "page_post_engagements",
            description: "The number of times people have engaged with your posts through reactions, comments, shares and more",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_consumptions",
            alias: "Page Consumptions",
            description: "The number of times people clicked on any of your content",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_consumptions_unique",
            alias: "Page Consumptions Unique",
            description: "The number of people who clicked on any of your content",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_consumptions_by_consumption_type",
            alias: "page_consumptions_by_consumption_type",
            description: "The number of times people clicked on any of your content, by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_consumptions_by_consumption_type_unique",
            alias: "page_consumptions_by_consumption_type_unique",
            description: "The number of people who clicked on any of your content, by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkin_total",
            alias: "Page Places Checkin Total",
            description: "The number of times people checked into a place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkin_total_unique",
            alias: "Page Places Checkin Total Unique",
            description: "The number of people who checked into a place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkin_mobile",
            alias: "Page Places Checkin Mobile",
            description: "The number of times people checked into a place using mobile phones",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkin_mobile_unique",
            alias: "Page Places Checkin Mobile Unique",
            description: "The number of people who checked into a place using mobile phones",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkins_by_age_gender",
            alias: "page_places_checkins_by_age_gender",
            description: "gender and age of people who checked in at your Place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkins_by_locale",
            alias: "page_places_checkins_by_locale",
            description: "top locales of people who checked into your Place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_places_checkins_by_country",
            alias: "page_places_checkins_by_country",
            description: "top countries of people who checked into your Place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_negative_feedback",
            alias: "Page Negative Feedback",
            description: "The number of times people took a negative action (e.g., un-liked or hid a post)",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_negative_feedback_unique",
            alias: "Page Negative Feedback Unique",
            description: "The number of people who took a negative action (e.g., un-liked or hid a post)",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_negative_feedback_by_type",
            alias: "page_negative_feedback_by_type",
            description: "The number of times people took a negative action broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_negative_feedback_by_type_unique",
            alias: "page_negative_feedback_by_type_unique",
            description: "The number of people who took a negative action broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_positive_feedback_by_type",
            alias: "page_positive_feedback_by_type",
            description: "The number of times people took a positive action broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_positive_feedback_by_type_unique",
            alias: "page_positive_feedback_by_type_unique",
            description: "The number of people who took a positive action broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_online",
            alias: "page_fans_online",
            description: "The number of your fans who saw any posts on Facebook on a given day, broken down by hour of day in PST/PDT",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_online_per_day",
            alias: "Page Fans Online Per Day",
            description: "The number of your fans who saw any posts on Facebook on a given day",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fan_adds_by_paid_non_paid_unique",
            alias: "page_fan_adds_by_paid_non_paid_unique",
            description: "The number of new people who have liked your Page broken down by paid and non-paid",
            dataType: tableau.dataTypeEnum.int
        },
// Page Impressions
        {
            id: "page_impressions",
            alias: "Page Impressions",
            description: "The total number of impressions seen of any content associated with your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_unique",
            alias: "Page Impressions Unique",
            description: "The number of people who have seen any content associated with your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_paid",
            alias: "Page Impressions Paid",
            description: "The number of impressions of a Sponsored Story or Ad pointing to your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_paid_unique",
            alias: "Page Impressions Paid Unique",
            description: "Number of people who saw a sponsored story or Ad about your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_organic",
            alias: "Page Impressions Organic",
            description: "The number of times your posts were seen in News Feed or Ticker or on visits to your Page. These impressions can be Fans or non-Fans",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_organic_unique",
            alias: "Page Impressions Organic Unique",
            description: "The number of people who visited your Page, or saw your Page or one of its posts in News Feed or Ticker. These impressions can be Fans or non-Fans",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_viral",
            alias: "Page Impressions Viral",
            description: "The number of impressions of a story published by a friend about your Page. These stories include liking your Page, posting to your Page's Wall, liking, commenting on or sharing one of your Page posts, answering a Question you posted, RSVPing to one of your events, mentioning your Page, phototagging your Page or checking in at your Place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_viral_unique",
            alias: "Page Impressions Viral Unique",
            description: "The number of people who saw your Page or one of its posts from a story published by a friend. These stories include liking your Page, posting to your Page's Wall, liking, commenting on or sharing one of your Page posts, answering a Question you posted, RSVPing to one of your events, mentioning your Page, phototagging your Page or checking in at your Place",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_nonviral",
            alias: "page_impressions_nonviral",
            description: "The number of times any content from your Page entered a person's screen. This does not include content created about your Page with social information attached. Social information displays when a person's friend interacted with your Page, post or story. This includes when someone's friend likes or follows your Page, engages with a post, shares a photo of your Page and checks into your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_nonviral_unique",
            alias: "page_impressions_nonviral_unique",
            description: "The number of people who had any content from your Page enter their screen. This does not include content created about your Page with social information attached. As a form of organic distribution, social information displays when a person's friend interacted with your Page, post or story. This includes when someone's friend likes or follows your Page, engages with a post, shares a photo of your Page and checks into your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_story_type",
            alias: "page_impressions_by_story_type",
            description: "Total impressions of posts published by a friend about your Page by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_story_type_unique",
            alias: "page_impressions_by_story_type_unique",
            description: "The number of people who saw posts published by a friend about your Page by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_city_unique",
            alias: "page_impressions_by_city_unique",
            description: "The number of people who have seen any content associated with your Page by city",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_country_unique",
            alias: "page_impressions_by_country_unique",
            description: "The number of people who have seen any content associated with your Page by country",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_locale_unique",
            alias: "page_impressions_by_locale_unique",
            description: "The number of people who have seen any content associated with your Page by user selected language",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_by_age_gender_unique",
            alias: "page_impressions_by_age_gender_unique",
            description: "The number of people who saw any content by your Page or about your Page, grouped by age and gender. This number is an estimate",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_frequency_distribution",
            alias: "page_impressions_frequency_distribution",
            description: "The number of people your Page reached broken down by how many times people saw any content about your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_impressions_viral_frequency_distribution",
            alias: "page_impressions_viral_frequency_distribution",
            description: "The number of people your Page reached from a story published by a friend, broken down by how many times people saw stories about your Page",
            dataType: tableau.dataTypeEnum.int
        },
// Page Posts
        {
            id: "page_posts_impressions",
            alias: "Page Posts Impressions",
            description: "The number of impressions that came from all of your posts",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_unique",
            alias: "Page Posts Impressions Unique",
            description: "The number of people who saw any of your Page posts",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_paid",
            alias: "Page Posts Impressions Paid",
            description: "The number of impressions of your Page posts in an Ad or Sponsored Story",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_paid_unique",
            alias: "Page Posts Impressions Paid Unique",
            description: "The number of people who saw your Page posts in an Ad or Sponsored Story",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_organic",
            alias: "Page Posts Impressions Organic",
            description: "The number of impressions of your posts in News Feed or Ticker or on your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_organic_unique",
            alias: "Page Posts Impressions Organic Unique",
            description: "The number of people who saw your Page posts in News Feed or Ticker, or on your Page's Wall",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_served_impressions_organic_unique",
            alias: "page_posts_served_impressions_organic_unique",
            description: "The number of people who were served your Page's posts in their News Feed whether it entered their screen or not. Posts include statuses, photos, links, videos and more",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_viral",
            alias: "Page Posts Impressions Viral",
            description: "The number of times users saw your posts via stories published by their friends",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_viral_unique",
            alias: "Page Posts Impressions Viral Unique",
            description: "The number of people who saw your Page posts via a story from a friend",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_nonviral",
            alias: "page_posts_impressions_nonviral",
            description: "The number of times your Page's posts entered a person's screen. This does not include content created about your Page with social information attached. Social information displays when a person's friend interacted with you Page or post. This includes when someone's friend likes or follows your Page, engages with a post, shares a photo of your Page and checks into your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_nonviral_unique",
            alias: "page_posts_impressions_nonviral_unique",
            description: "The number of people who had any posts by your Page enter their screen. This does not include content created about your Page with social information attached. As a form of organic distribution, social information displays when a person's friend interacted with you Page or post. This includes when someone's friend likes or follows your Page, engages with a post, shares a photo of your Page and checks into your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_posts_impressions_frequency_distribution",
            alias: "page_posts_impressions_frequency_distribution",
            description: "The number of people who saw your Page posts, broken down by how many times people saw your posts",
            dataType: tableau.dataTypeEnum.int
        },
// Page Post Engagement
        {
            id: "post_engaged_users",
            alias: "post_engaged_users",
            description: "The number of people who clicked anywhere in your posts",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_negative_feedback",
            alias: "post_negative_feedback",
            description: "The number of times people took a negative action in your post (e.g. hid it)",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_negative_feedback_unique",
            alias: "post_negative_feedback_unique",
            description: "The number of people who took a negative action in your post (e.g., hid it)",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_negative_feedback_by_type",
            alias: "post_negative_feedback_by_type",
            description: "The number of times people took a negative action in your post broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_negative_feedback_by_type_unique",
            alias: "post_negative_feedback_by_type_unique",
            description: "The number of people who took a negative action in your post broken down by type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_engaged_fan",
            alias: "post_engaged_fan",
            description: "People who have liked your Page and engaged with your post",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_clicks",
            alias: "post_clicks",
            description: "The number of times people clicked on anywhere in your posts without generating a story",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_clicks_unique",
            alias: "post_clicks_unique",
            description: "The number of people who clicked anywhere in your post without generating a story",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_clicks_by_type",
            alias: "post_clicks_by_type",
            description: "The number of times people clicked on anywhere in your posts without generating a story, by consumption type",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "post_clicks_by_type_unique",
            alias: "post_clicks_by_type_unique",
            description: "The number of people who clicked anywhere in your post without generating a story, by consumption type",
            dataType: tableau.dataTypeEnum.int
        },
// // Negative Feedback Types
//         {
//             id: "hide_clicks",
//             alias: "hide_clicks",
//             description: "Hide this story",
//             dataType: tableau.dataTypeEnum.int
//         }, {
//             id: "hide_all_clicks",
//             alias: "hide_all_clicks",
//             description: "Hide all posts from this page",
//             dataType: tableau.dataTypeEnum.int
//         }, {
//             id: "report_spam_clicks",
//             alias: "report_spam_clicks",
//             description: "Report an object as a spam",
//             dataType: tableau.dataTypeEnum.int
//         }, {
//             id: "unlike_page_clicks",
//             alias: "unlike_page_clicks",
//             description: "Unlike a page",
//             dataType: tableau.dataTypeEnum.int
//         },


        {
            id: "page_content_activity",
            alias: "Page Content Activity",
            description: "The number of stories created about your Page (Stories)",
            dataType: tableau.dataTypeEnum.int
        },

// Page Reactions
        {
            id: "page_actions_reactions_like_total",
            alias: "Page Actions Post Reactions Like Total",
            description: "Daily total post \"like\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_reactions_love_total",
            alias: "Page Actions Post Reactions Love Total",
            description: "Daily total post \"love\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_reactions_wow_total",
            alias: "Page Actions Post Reactions Wow Total",
            description: "Daily total post \"wow\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_post_reactions_haha_total",
            alias: "Page Actions Post Reactions Haha Total",
            description: "Daily total post \"haha\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_post_reactions_sorry_total",
            alias: "Page Actions Post Reactions Sorry Total",
            description: "Daily total post \"sorry\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_post_reactions_anger_total",
            alias: "Page Actions Post Reactions Anger Total",
            description: "Daily total post \"anger\" reactions of a page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_actions_post_reactions_total",
            alias: "page_actions_post_reactions_total",
            description: "Daily total post reactions of a page by type",
            dataType: tableau.dataTypeEnum.int
        },

// Page User Demographics
        {
            id: "page_fans",
            alias: "Page Fans",
            description: "The total number of people who have liked your Page.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_locale",
            alias: "page_fans_locale",
            description: "Aggregated language data about the people who like your Page based on the default language setting selected when accessing Facebook",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_city",
            alias: "page_fans_city",
            description: "Aggregated Facebook location data, sorted by city, about the people who like your Page.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_country",
            alias: "page_fans_country",
            description: "The number of people, aggregated per country, that like your Page. Only the 45 countries with the most people that like your Page are included.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_gender_age",
            alias: "page_fans_gender_age",
            description: "The number of people who saw any of your posts at least once, grouped by age and gender. Aggregated demographic data is based on a number of factors, including age and gender information users provide in their Facebook profiles. This number is an estimate.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fan_adds",
            alias: "Page Fan Adds",
            description: "The number of new people who have liked your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fan_adds_unique",
            alias: "Page Fan Adds Unique",
            description: "The number of new people who have liked your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fan_removes",
            alias: "Page Fan Removes",
            description: "Unlikes of your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fan_removes_unique",
            alias: "Page Fan Removes Unique",
            description: "Unlikes of your Page",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_fans_by_unlike_source_unique",
            alias: "page_fans_by_unlike_source_unique",
            description: "The number of people who unliked your Page, broken down by the most common ways people can unlike your Page.",
            dataType: tableau.dataTypeEnum.int
        },

// Page Views
        {
            id: "page_views_total",
            alias: "Page Views Total",
            description: "The number of times a Page's profile has been viewed by logged in and logged out people",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_logout",
            alias: "Page Views Logout",
            description: "The number of times a Page's profile has been viewed by people not logged into Facebook",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_logged_in_total",
            alias: "Page Views Logged In Total",
            description: "The number of times a Page’s profile has been viewed by people logged into Facebook",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_logged_in_unique",
            alias: "Page Views Logged In Unique",
            description: "The number of people logged into Facebook who have viewed the Page profile",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_external_referrals",
            alias: "page_views_external_referrals",
            description: "Top referrering external domains sending traffic to your Page.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_profile_tab_total",
            alias: "page_views_by_profile_tab_total",
            description: "The number of people who have viewed each Page profile tab.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_profile_tab_logged_in_unique",
            alias: "page_views_by_profile_tab_logged_in_unique",
            description: "The number of people logged in to Facebook who have viewed your Page's profile, broken down by each tab.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_internal_referer_logged_in_unique",
            alias: "page_views_by_internal_referer_logged_in_unique",
            description: "The number of people logged in to Facebook who have viewed your Page, broken down by the internal referer within Facebook.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_site_logged_in_unique",
            alias: "page_views_by_site_logged_in_unique",
            description: "The number of people logged in to Facebook who have viewed your Page profile, broken down by the type of device.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_age_gender_logged_in_unique",
            alias: "page_views_by_age_gender_logged_in_unique",
            description: "The number of people logged in to Facebook who have viewed your Page profile, broken down by gender group.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_views_by_referers_logged_in_unique",
            alias: "page_views_by_referers_logged_in_unique",
            description: "Logged-in page visit counts (unique users) by referral source.",
            dataType: tableau.dataTypeEnum.int
        },

// Page Video Views
        {
            id: "page_video_views",
            alias: "Page Video Views",
            description: "Total number of times page's videos have been viewed for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_paid",
            alias: "Page Video Views Paid",
            description: "Total number of times page's promoted videos have been viewed for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_organic",
            alias: "Page Video Views Organic",
            description: "Total number of times page's videos have been viewed for more than 3 seconds by organic reach",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_by_paid_non_paid",
            alias: "page_video_views_by_paid_non_paid",
            description: "The number of times your Page's videos played for at least 3 seconds, or for nearly their total length if they're shorter than 3 seconds, broken down by total, paid, and non-paid. During a single instance of a video playing, we'll exclude any time spent replaying the video.",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_autoplayed",
            alias: "Page Video Views Autoplayed",
            description: "Total number of times page's autoplayed videos have been viewed for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_click_to_play",
            alias: "Page Video Views Click To Play",
            description: "Total number of times page's videos have been viewed after the user clicks on play for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_views_unique",
            alias: "Page Video Views Unique",
            description: "Total number of times page's videos have been played for unique people for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_repeat_views",
            alias: "Page Video Repeat Views",
            description: "Total number of times that people replay a page's videos for more than 3 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s",
            alias: "Page Video Complete Views 30s",
            description: "Total number of times page's videos have been viewed for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_paid",
            alias: "Page Video Complete Views 30s Paid",
            description: "Total number of times page's promoted videos have been viewed to the end, or for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_organic",
            alias: "Page Video Complete Views 30s Organic",
            description: "Total number of times page's videos have been viewed to the end, or viewed for more than 30 seconds by organic reach",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_autoplayed",
            alias: "Page Video Complete Views 30s Autoplayed",
            description: "Total number of times page's autoplayed videos have been viewed to the end, or viewed for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_click_to_play",
            alias: "Page Video Complete Views 30s Click To Play",
            description: "Total number of times page's videos have been viewed to the end, or viewed after the user clicks on play for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_unique",
            alias: "Page Video Complete Views 30s Unique",
            description: "Total number of times page's videos have been played for unique people to the end, or viewed for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "page_video_complete_views_30s_repeat_views",
            alias: "Page Video Complete Views 30s Repeat Views",
            description: "Total number of times that people replay a page's videos to the end, or for more than 30 seconds",
            dataType: tableau.dataTypeEnum.int
        }
    ];
    var tableSchema = {
        id: "facebook_page_insights",
        alias: "Facebook page insights",
        columns: cols
    };
    schemaCallback([tableSchema]);
};

/**
 * 5. Start getting feed data from selected pages
 */
//gets top level data about page
myConnector.getData = function getData(table, doneCallback) {
    pagesInfo = JSON.parse(tableau.connectionData); //includes page response and access token
    var pagesCount = pagesInfo.length;
    var initialUrl = "";
    getFbFeed(table, doneCallback, initialUrl, pagesCount, pagesInfo, 0);
};


/**
 * Helper
 * @param  {[type]}
 * @return {[type]}
 */
function roundDate(timeStamp) {
    timeStamp -= timeStamp % (24 * 60 * 60 * 1000); //subtract amount of time since midnight
    return new Date(timeStamp);
}

/**
 * Helper
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
function getTableauDataObject(tableData, data) {
    return tableData.filter(function(obj) {
        return obj.unix_date === data[ii].values[jj].end_time;
    })[0];
}

/**
 * 6. Populate table in tableu with data
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
function getFbFeed(table, doneCallback, next_page, pagesCount, pagesInfo, currentPageLoop) {
    var pageInfo = pagesInfo[currentPageLoop]
    var page_response = pageInfo.page_response;
    if(!next_page) {
        next_page = buildUrl(1, page_response);
    }
    var page_ids = Object.getOwnPropertyNames(page_response);
    var toRet = [];

    FB.api(next_page,
        'GET',
        {
            access_token: pageInfo.token,
            date_format: 'U', //set time format to unicode so that it works with Tableau
            limit:LIMIT
        }, function(feed_response) {
            //callback loop
            var data = feed_response.data;

            if (Array.isArray(data) && data.length) {
                var tableData = [];
                var endThisNow = false;
                for (ii = 0; ii < data.length; ++ii) {

                    if (data[ii].period != "day" && data[ii].period != "lifetime") {
                        continue;
                    }
                    var tableArrayTemp = [];
                    var page_ids = Object.getOwnPropertyNames(page_response);
                    var currentPage = page_response[page_ids[0]];

                    for (jj = 0; jj < data[ii].values.length; ++jj) {
                        var date = new Date(data[ii].values[jj].end_time * 1000);

                        var tableauDataObject = getTableauDataObject(tableData, data);

                        if (tableauDataObject) {
                            tableauDataObject[data[ii].name] = data[ii].values[jj].value;
                        } else {
                            var roundedDate = roundDate(data[ii].values[jj].end_time * 1000);
                            if (roundDate(START_DAY * 1000).setHours(0, 0, 0, 0) == roundedDate.setHours(0, 0, 0, 0)) {
                                endThisNow = true;
                                break;
                            }
                            var obj = {};
                            obj.unix_date = data[ii].values[jj].end_time; // used for comparision
                            obj.date = date;
                            obj[data[ii].name] = data[ii].values[jj].value;
                            obj.page_name = currentPage.name;
                            obj.page_username = currentPage.username;
                            tableData.push(obj);
                        }
                    }
                    if (endThisNow === true) {
                        break;
                    }
                }
                if (endThisNow === true) {
                    // if there are more than one page begin on the new page now
                    if(currentPageLoop + 1  !== pagesCount) {
                        var paging_next = "";
                        currentPageLoop ++;
                        getFbFeed(table, doneCallback, paging_next, pagesCount, pagesInfo, currentPageLoop);

                    } else {
                        doneCallback();
                        return;
                    }

                } else {
                    table.appendRows(tableData);
                    var paging_next = feed_response.paging.previous; //set next page string
                    getFbFeed(table, doneCallback, paging_next, pagesCount, pagesInfo, currentPageLoop);
                }
            } else {
                doneCallback();
                return;
            }
        });


}

tableau.registerConnector(myConnector);
