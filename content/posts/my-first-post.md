---
title: 'Build a blog with CMS & Git functionality '
date: 2021-12-22T13:53:01.000-08:00
tags:
- Blog
- CMS
- Git
- Hugo
- Forestry.io
- GitHub
- Web Development
- Hosting
- Development
- Free
- Tutorial
showToc: true
TocOpen: false
hidemeta: false
comments: false
description: How to build and host a free blog with a content management system (CMS)
  for content creation that doesn't require diving into code or managing markdown
  files.
canonicalURL: https://canonical.url/to/page
disableHLJS: false
disableShare: false
hideSummary: false
searchHidden: false
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
cover:
  image: uploads/blog-build-banner.jpg
  alt: The blog build tech stack
  caption: With Hugo, Github Pages, & Forestry we can create a fully featured site.
  relative: false
  hidden: false
editPost:
  URL: https://github.com/Cambuchi/blog-src/blob/main/content
  Text: Suggest Changes
  appendFilePath: true

---
# Introduction

When it comes to building a blog/portfolio site, beginners are often directed to services like WordPress or Squarespace. This is understandable, as these closed systems guide you through the entire creation process. Past this beginner plateau however, the difficulty in creating a fully customizable site with all the bells and whistles increases dramatically.

After reading this [thread](https://www.reddit.com/r/webdev/comments/rlsxqk/if_i_was_going_to_create_my_own_blog_website_what/) on reddit I realized that even for people with web development experience, the lack of easily available instructions have many defaulting back to this beginner step as well. If you think more advanced web-content creation involves diving into code or crafting HTML for every post, then the editors on website building services would indeed seem very appealing. However I am here to tell you that this is not the case, and that similar tools and easy to use workflows are available for custom built sites as well.

This guide aims to create a guided "mid-tier" plateau that those beginning their web development journey can reference to help them move beyond standard website builders. We will build the site with Hugo, apply a site theme, use Forestry.io for our CMS, and host with GitHub Pages.

# Why this stack?

### 1. Free

* From beginning to end, this entire process is free. This blog you are looking at right now was made for free and does not cost anything to host.
* GitHub Pages is already set up to easily support paid custom domains if you want a different URL for your blog.

### 2. Easy content creation with a CMS

* Making content is just as easy as website builders. You get a fully functional online text/markdown editor that automatically commits to your sites repository.
* No need to open code or edit HTML just to make a new post.
* Here is an example of me making a new post for my blog on Forestry:

![making a new post in forestry](https://cambuchi.github.io/blog/uploads/buildsite.gif "making a new post in forestry")

### 3. Easy to use/workflow

* Create content on Forestry (this commits to your repository)
* Run a script that does the following
  1. Pull update from repository into your build directory
  2. Build site using Hugo
  3. Add, commit, and push changes to your repository
* GitHub Pages detects that you made changes and automatically updates your site within minutes.
* After creating the content, it takes me less than 30 seconds to update my site with the new post.

### 4. Easy to set-up

* Hugo and Hugo Themes do all of the heavy lifting for generating your website.
* No need to build all the logic and HTML for tags. categories, search functionality, syntax highlighting, etc. Generating a site and getting it online can be done in less than an hour.

### 5. Customization

* Since everything is HTML and JavaScript, changing the site layout and little details is completely under your control. No more default footers advertising WordPress or Squarespace on your site.
* Toggle or button not where you want it? Moving elements around and custom CSS is easily done in the Hugo framework.

### 6. Git and GitHub

* At the end of this you will have a site with a commit history for both posts and site editing. This is built into the build and deploy scripts so it's very integrated.
* Somehow broke your site? Just git checkout back to a working commit.

# Assumptions

* This guide is written for Windows 10, but very applicable to Linux/Mac.
  * You have Git and Git Bash installed. This is how I use Git and run bash scripts on Windows 10.
* Visual Studio Code was used to edit and create all of the files necessary.
* For customizing: you have some understanding of how HTML/CSS/Javascript work. You can manipulate the DOM and find out classes/selectors for elements from the console.

Let's begin!

# GitHub Setup

Before we get started, make sure you have a [GitHub](https://github.com "GitHub") account. It's free, easy to set up, and incredibly useful.

1. The first step is to create two repositories in GitHub. One for the files you use to generate your website and the other for serving your static website files.

   **Repo #1:** `<your-website-build>`

   > The above repository will be used for your website build. I recommend something like `blog-build`, `blog-source`, `portfolio-build`, etc.

   **Repo #2:** `<your-website>`

   > The above repository will be used to serve your generated web files to the internet. I recommend something like `blog`, `portfolio`, or `<username>.github.io` (special repository name).
   >
   > Note:
   > * If you set **Repo #2** to `blog` your website URL will be `<username>.github.io/blog/`, if instead you want `<username>.github.io` to direct to your site, then use that as the name.
   > * E.g. your username is **coolperson**, set **Repo #2** to `coolperson.github.io`.

# Hugo Setup

This will setup Hugo on your system so that you can use it as a command from Git Bash/Terminals. Hugo is a framework for building websites that automates much of the process while still allowing for very deep customization. Commands like `hugo server` will run a local live-server for easy website previewing/tweaking and `hugo build` will generate the static files you will serve as your website.

The following instructions are specific for Windows 10. Mac/Linux users can find installation instructions here: [https://gohugo.io/getting-started/installing/](https://gohugo.io/getting-started/installing/ "https://gohugo.io/getting-started/installing/")

### Setup

1. Create a new folder `C:\Hugo`.
2. Create a subfolder in the Hugo folder `C:\Hugo\bin`.
3. Download the latest zipped Hugo executable from [Hugo Releases](https://github.com/gohugoio/hugo/releases "https://github.com/gohugoio/hugo/releases").
   * For me this was `hugo_0.91.2_Windows-64bit.zip`.
4. Extract all contents to your `C:\Hugo\bin` folder.
   * Your directory should look like the following:

          C:
          └───Hugo
              └───bin
                  └───hugo.exe
                  └───LICENSE
                  └───README.md
5. Add the `C:\Hugo\bin` folder to Windows PATH settings.
   1. Hit the `Windows + R` key combination or from the start menu type `run` and hit `enter`.
   2. In the run application, type `SystemPropertiesAdvanced` and hit `enter`.  
      ![Run Application](https://cambuchi.github.io/blog/uploads/run.png)
   3. Click on `Environment Variables...` on the bottom right.
      ![System Properties](https://cambuchi.github.io/blog/uploads/system-properties.png)
   4. Under `User variables` double click on `PATH` (might be `Path`).
      * If you are an admin and they only user of your computer feel free to add to the `PATH` under `System variables`.
   5. Click on `New`.
   6. Type `C:\Hugo\bin` hit `enter` and then click `OK`.
   7. Click `OK` on the Environment Variables window, and then `OK` on the System Properties window.

### Verify

At this point we need to run a few commands to verify that the executable is ready to use. To ensure that the PATH environment variables have propagated, it's best to restart your computer. At the very least, make sure Git Bash and any Terminal apps are fully closed.

1. Open Git Bash.
2. Type `hugo help` and hit enter.
3. You should see output that starts with:

          hugo is the main command, used to build your Hugo site.
          
          Hugo is a Fast and Flexible Static Site Generator
          built with love by spf13 and friends in Go.

   Complete documentation is available at https://gohugo.io/.
4. If you see that, success! You have correctly installed Hugo.