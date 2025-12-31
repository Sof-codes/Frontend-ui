Solution Description
🚀 Technologies used
I used React along with Vite for this project. 
I find React amazing because it lets me break everything down into small pieces (components), which makes the code much easier to manage.
I used Vanilla CSS for the styling because I wanted total control over the "Light Mode" look, making it feel clean and modern without using heavy frameworks.

---------------------------------------------------------------------------------------------------------------------------------------------------------------

📚 Libraries used (and why)
React Flow: This is the "big" one. 
It handles the entire canvas. I used it because it makes things like zooming in/out and dragging the map around feel super smooth right out of the box.
Dagre: This is like the "brain" for positioning. 
I used it because it automatically calculates where every box should go so the mindmap looks like a perfect tree. Without it, I'd have to manually set the X and Y coordinates for every single node.
Lucide React: I used this for icons. It’s light and makes the buttons look much more professional than just using text.
gh-pages: This helped me get the project live on GitHub so you can actually see it working.

----------------------------------------------------------------------------------------------------------------------------------------------------------------

🏗️ Overall architecture / approach
My main goal was to keep the Data and the View separate.

Decoupled Design: The app doesn't have any hardcoded boxes. Instead, it "asks" a JSON file for what to show.
Interactive Sidebar: I built a sidebar that only pops up when you select a node. This keeps the design clean and lets the user focus on the map itself.
State Management: I used React's useState and useCallback to handle things like "hiding" child nodes when you click a parent, which makes the map feel alive.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔄 How data flows from the JSON to the UI
It’s like a 3-step pipeline that runs every time something changes:

Read the JSON: First, the app pulls the hierarchy from 
mindmapData.json
.
Calculate the Layout: The app sends that data to the Dagre library. Dagre does the math to figure out, "If Box A is the parent, Box B and C should sit right next to it."
Draw the Map: Finally, the app takes those calculated positions and tells React Flow to draw them.
Cool part: If you edit a name in the sidebar, the app updates the data in the background, and the map instantly re-draws itself with the new info!

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

You can see result here: https://sof-codes.github.io/Frontend-ui/
