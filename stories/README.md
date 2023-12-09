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


createLesson({
  "chapter_number": 1,
  "total_chapters": 5,
  "genre": "textbook/student version",
  "setting": "pocatello id",
  "theme": "social studies",
  "time": "2023",
  "style": "instructional, omniscient point of view",
  "audience": "6th grade elementary pupils"
})