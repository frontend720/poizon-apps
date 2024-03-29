AI Story Crafter Server
This Node.js application serves as the backend for an AI story crafter that utilizes OpenAI's API. It provides features to:

Generate AI-assisted stories based on user prompts and settings.
Manage user accounts and preferences.
Store and retrieve story drafts and completed stories.
Technology Stack:

Node.js
Express.js
OpenAI API
Firebase

Features:

Story Generation:
Users can provide prompts and settings to guide the AI in generating a story.
Different AI models and temperature settings can be specified for further control over the generated text.
Generated stories can be saved as drafts or published as completed stories.
User Management:
Users can create accounts and manage their profiles.
User preferences, such as preferred AI models and temperature settings, can be saved.
Story Management:
Users can access and edit their saved story drafts.
Completed stories can be viewed, shared, and exported.
Installation:

Clone this repository.
Install dependencies: npm install
(Optional) Configure environment variables:
OPENAI_API_KEY: Your OpenAI API key.
DATABASE_URL: (If using Firebase) URL of your Firebase database.
MONGODB_URI: (If using MongoDB) URL of your MongoDB database.
Run the server: npm start
Usage:

Open your web browser and navigate to http://localhost:3000.
(If using user accounts) Register or log in.
Provide a story prompt and adjust settings as desired.
Click "Generate Story" to create an AI-assisted story.
Save drafts, publish stories, and manage your profile as needed.


BOOK WRITING STYLES

Narrative Writing
First-Person Narrative
Third-Person Narrative
Omniscient Point of View
Limited Omniscient Point of View
Stream of Consciousness
Epistolary
Experimental

GOOK GENRES

Fantasy
Science Fiction
Romance
Mystery
Thriller
Horror
Historical Fiction
Dystopian

TONE

Formal
Informal
Positive
Negative
Lighthearted
Dramatic

THEMES

Love
Death
Identity

Write chapter 1 of a 3 chapter romantic book about a black widow spider and a terrier

Formal:

SETTINGS

CITY
TOWN
MOUNTAINS
BOAT
DESERT
PRAIRIE
BEACH
ISLAND
WAR
SPACE
UNDERWATER

create_chapter(chapter_number=1, total_chapters=3, genre="romance", protagonists=["black_widow_spider", "terrier"])
generate_story(opening_lines="The moonlight cast long shadows across the garden...", characters=["black_widow_spider", "terrier"], plot_point="initial_encounter")
write_chapter_outline(chapter_number=1, title="A Web of Destiny", characters=["Arachnia", "Scout"], setting="moonlit_garden")
Informal:

write_spider_dog_romance(chapters=3)
start_love_story(spider=True, dog=True)
generate_chapter(spider_name="Arachnia", dog_breed="Jack Russell", tone="romantic")
Specific:

write_encounter(chapter_number=1, characters=["Arachnia", "Scout"], setting="garden", time="night")
generate_friendship(chapter_number=1, characters=["black_widow_spider", "terrier"], theme="unlikely_pair")
create_romance(chapter_number=1, characters=["Arachnia", "Scout"], personality_contrast=True)

Additional Options:

Add keywords for genre, subgenre, or specific elements.
Define character attributes, relationships, and goals.
Specify setting details, time period, and atmosphere.
Example Query:

*****

create_chapter(chapter_number=1, total_chapters=3, genre="unconventional_romance", characters=["Arachnia", "Scout"], setting="garden", time="night", tone="romantic", theme="forbidden_love")


Instructionals

createRecipe({
  "chapter_number": 1,
  "total_chapters": 7,
  "genre": "recipe",
  "setting": "sasilo",
  "theme": "tanzania",
  "time": "2022",
  "style": "instructional / procedural"
})


{
 "chapter_number": 1,
 "total_chapters": 12,
 "education_level": "11 grade high school",
 "user_presets": "teacher",
 "style": "informal, informative",
 "time_period": "up to present",
 "script_type": "classroom",
 "tone": "educational",
 "genre": "17th century industry",
 "perspective": "second person narrative",
 "audience": "readers"
}


For users who want to create a story longer than a certain length, you have several options:

1. Offer additional tokens for purchase:

This is the most straightforward approach. You can sell tokens in various denominations, allowing users to purchase the amount they need to complete their story.
Consider offering bulk discounts for larger purchases to incentivize longer stories.
Clearly communicate the cost per token and the approximate number of tokens needed for different story lengths.
2. Implement a tiered system:

Instead of a single token price, you can offer different tiers with varying features and token limits.
For example, a free tier might offer a limited number of tokens and basic functionalities, while a paid tier could provide more tokens, additional features, and longer story creation capabilities.
This model allows you to cater to different user needs and budgets while still encouraging engagement with the premium features.
3. Introduce a subscription model:

This option provides users with unlimited access to premium features, including longer story creation, for a fixed monthly or annual fee.
This is ideal for users who frequently create long stories and want predictable costs.
You can offer different subscription tiers with varying benefits, such as priority access to new features or exclusive story themes.
4. Implement a hybrid model:

Combine elements of the above approaches to offer a flexible pricing structure.
For instance, users could receive a limited number of tokens per day or week for free, with the option to purchase additional tokens if needed.
This hybrid model caters to users who want to try the premium features without committing to a subscription while still generating revenue from dedicated users.
Additional considerations:

Token conversion: Allow users to convert tokens to other forms of currency within the app, like points or rewards, to enhance value and encourage long-term engagement.
Community features: Implement community features like leaderboards or contests where users can submit their long stories for recognition and rewards. This can incentivize longer story creation and generate user-generated content.
Data analysis: Track user behavior and story length data to understand how users utilize the premium features and adapt your pricing strategy accordingly.
By offering a variety of options and taking into account the specific needs of your user base, you can ensure that users who want to create longer stories have access to the resources they need while still maintaining a sustainable business model for your AI story app.

Read Stories | Share Stores | Like Stories