# TubeTutor - SmartStudy Chrome Extension
UniHack March 2025 Project
## Authors
- Akhil Boda, Bachelor of Information Technology, Monash University
- Sofia Quach, Bachlor of Science and Computer Science, Monash University
- Ruby Hall, Bachlor of Computer Science and Games and Interactivty, Swineburne University
- Krittapong Tiankarot - Bachelor of Information Technology, Monash University

## Description
We designed a Google Chrome extension that helps users study by recommending them Youtube videos that relate to the articles they are currently viewing. In order to do this, we looked at the metadata of the site the user was inspecting and the program was then supposed to use this to create keywords for a search query with Youtube’s API. The content script accesses the title, description and keywords of the website and then sends this through a port message to the service worker script, which is able to display this in the console of the extension. Unfortunately, we were unable to connect this to the Youtube API, as Chrome’s new extension version, Manifest version 3, does not allow the use of external libraries due to security reasons. In the future, we will create an external website that is able to access Youtube’s API. 

The toggle switch and the settings are saved using Chrome’s local storage feature. This means that they are able to persist even when you close the extension and open it back up. The toggle turns the display of our features on and off. Settings allow users to change the colours, font style and font size of the extension.
