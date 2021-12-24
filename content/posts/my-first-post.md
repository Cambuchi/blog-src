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
## Introduction

When it comes to building a blog/portfolio site, beginners are often directed to services like WordPress or Squarespace. This is understandable, as these website builders provide a tightly guided creation process. Past this beginner plateau however, the difficulty in creating and hosting a fully customizable site increases dramatically. Some services can alleviate this, but often for a price.

After reading this [thread](https://www.reddit.com/r/webdev/comments/rlsxqk/if_i_was_going_to_create_my_own_blog_website_what/) on reddit I realized that even for people with web development experience, the lack of easily available instructions have many defaulting back to this beginner step as well. If you think more advanced web-content creation involves diving into code or crafting HTML for every post, then website builders with built in editors would undoubtedly seem very appealing. However, I am here to tell you that this is not the case and that similar tools and easy to use workflows are available for custom built sites as well.

This guide aims to create a guided "mid-tier" plateau that those beginning their web development journey can reference to help them move beyond standard website builders. We will build a site with Hugo, apply a site theme, use Forestry.io for our CMS, and host with GitHub Pages.

## Why this stack?

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

### 6. Git and GitHub Integration

* At the end of this you will have a site with a commit history for both posts and site edits. This is built into the build and deploy scripts so it's very integrated.
* Somehow broke your site? Just git checkout back to a working commit.

## Assumptions

* This guide is written for Windows 10, but very applicable to Linux/Mac.
  * Git and Git Bash are installed. This is how I use Git and run bash scripts on Windows 10.
* Visual Studio Code was used to edit and create all of the files necessary.
* For customizing: you have some understanding of how HTML/CSS/Javascript work. You can manipulate the DOM and find out classes/selectors for elements from the console.

Let's begin!

## GitHub Setup

Before we get started, make sure you have a [GitHub](https://github.com "GitHub") account. It's free, easy to set up, and incredibly useful.

1. The first step is to create two repositories in GitHub. One for the files you use to generate your website and the other for serving your static website files. Make sure both are public and empty.
   * **Repo #1:** `<your-website-build>`
     * The above repository will be used for your website build. I recommend something like `blog-build`, `blog-source`, `portfolio-build`, etc.
   * **Repo #2:** `<your-website>`
     * The above repository will be used to serve your generated web files to the internet. I recommend something like `blog`, `portfolio`, or `<username>.github.io` (special repository name).

       > **Note:** If you set **Repo #2** to `blog` your website URL will be `<username>.github.io/blog/`, if instead you want `<username>.github.io` to direct to your site, then use that as the name.
       >
       > E.g. your username is **coolperson**, set **Repo #2** to `coolperson.github.io`.

## Hugo Setup

This will setup Hugo on your system so that you can use it as a command from Git Bash/Terminals. Hugo is a framework for building websites that automates much of the process while still allowing for very deep customization. Commands like `hugo server` will run a local live-server for easy website previewing/tweaking and `hugo` will generate the static files you will serve as your website.

The following instructions are specific for Windows 10. Mac and Linux users can find installation instructions [here](https://gohugo.io/getting-started/installing/ "Hugo Installation Instructions").

### Setup

1. Create a new folder `C:\Hugo`.
2. Create a sub-folder in the Hugo folder `C:\Hugo\bin`.
3. Download the latest zipped Hugo executable for your system from [Hugo Releases](https://github.com/gohugoio/hugo/releases "https://github.com/gohugoio/hugo/releases").
   * For me this was `hugo_0.91.2_Windows-64bit.zip`.
4. Extract all contents to your `C:\Hugo\bin` folder.
   * Your directory should look like the following:

          C:
          └───Hugo
              └───bin
                  ├───hugo.exe
                  ├───LICENSE
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
5. If the installation was not successful, please consult the official Hugo instructions for installing on Windows [here](https://gohugo.io/getting-started/installing/#windows "Hugo Windows Install").

## Build & Theme Site

Now for the meat and potatoes. We will build the site with Hugo, attach our theme of choice, rig it all up to GitHub, and deploy to GitHub Pages. Let's go!

### Create the GitHub build directory.

1. On your build repository on GitHub (Repo#1), copy the HTTPS link. It should look something like `https://github.com/<username>/blog-build.git`.
2. Git Bash into the folder where you want to keep your build directory.

        cd documents/github
   * Pay special attention to the slashes! Windows file paths with `\` will not work in Unix based utilities.
   * Alternatively, you can `right click` in the folder you want and select `Git Bash here` from the context menu.
3. Clone your build repository:

        git clone https://github.com/<username>/blog-build.git
4. A new empty folder with your repository name should now exist in the directory. E.g. `documents\github\blog-build`.

### Build the site with Hugo and attach a theme.

1. In the Git Bash terminal, build your Hugo site into the newly created directory with the following:

        hugo new site <folder-name> -f yml --force
   * E.g. `hugo new site blog-build -f yml --force`.
   * You should see a message in the terminal congratulating you.

   > **Note:** feel free to omit `-f yml` if you want to use the default `toml` files for your configurations. I am more familiar with `yaml/yml` files and find them easier to read but they are both quite similar.
2. Next is theming, our theme in this example will be [PaperMod](https://github.com/adityatelange/hugo-PaperMod "PaperMod Theme"). Feel free to browse the many themes at [https://themes.gohugo.io/](https://themes.gohugo.io/ "https://themes.gohugo.io/") for other options.
3. In the terminal, go into the build directory.

        cd <folder-name>
   * E.g. `cd blog-build`
4. Now that we're inside our build folder, run:

        git clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod --depth=1

   > **Note:** to update the theme, go into the PaperMod theme folder and git pull.
   >
   > E.g. `cd themes/PaperMod` followed by `git pull`.

   > The next couple steps are optional but will better flesh out your site on the first build and help you understand what's going on. I highly recommend you do them.
5. **Optional:** Populate your config file.
   * Go to: [config.yml](https://github.com/Cambuchi/blog-src/blob/main/tutorial-guide-files/config.yml "config.yml")
   * Download and replace your `config.yml` file with the file above or open your `config.yml` file and replace the contents.
   * Your config file should be in the root of your build folder.

   > **Important:** on line 1 of `config.yml`, change `baseURL: "https://examplesite.com/"` from the example site to the link that your own site will occupy. An example:
   >
   > ```bash
   > baseURL: "https://cambuchi.github.io/blog"
   > ```
   > If you do not do this, then when you turn on GitHub Pages your site will not render correctly.
6. **Optional:** Create a skeleton post.
   * Go to: [helloworld.md](https://github.com/Cambuchi/blog-src/blob/main/tutorial-guide-files/helloworld.md?plain=1 "helloworld.md")
   * Download the `helloworld.md` file and place it into `content\posts\` in the root of your build folder. E.g. `blog-build\content\posts\helloworld.md`.
7. Build your site and see it on the local live server! With terminal pointed at your build's root directory, run:

        hugo server
8. You should see a message in the terminal with a line that says

        Web Server is available at http://localhost:1313/ (bind address 127.0.0.1)
9. Visit the local host link (in the above case `http://localhost:1313/`) in your web browser and you should see a live preview of how your site currently looks! Ain't she a beauty?

![initial site preview](https://cambuchi.github.io/blog/uploads/firstlivepreview.png)

## Link Site Repo as a Submodule

Next we will link our site repository (**Repo #2**) so that when the site gets built, GitHub pages detects the update and immediately publishes our changes to our domain.

1. First we need to remove the `public` directory from the build repository. This is so that we can use it as a submodule for our site repository. Inside the build root directory:

        rm -rf public
2. On your site repository on GitHub, copy the HTTPS link. It should look something like `https://github.com/<username>/blog.git`. With that we can add our site directory as a submodule:

        git submodule add -b main <HTTPS-repository-link> public

   As an actual example:

        git submodule add -b main https://github.com/coolperson/blog.git public

   > **Note:** depending on your Git/GitHub settings, `main` might have to be replaced with `master`. You can easily determine which to use with Git Bash. When pointed at a root folder, there will be parentheses after the file path telling you which branch you are on.
   >
   > ![bash branch example](https://cambuchi.github.io/blog/uploads/bashbranch.png)
   >
   > As you can see from my example above in the blue text. My branch is `main`.
3. Great! Now when we run `hugo` our site will be generated into `public`, when `public` gets pushed it heads into our site repository on GitHub, automatically triggering GitHub Pages to update our website.

Let's populate our GitHub's build repository so that we have a branch for our CMS to hook onto. This first commit will be the only time that we do this manually. Enter the following while the Terminal is pointed at the build's root folder.

        git add .
        git commit -m "First commit"
        git push origin main

## Forestry.io Setup (CMS)

Now that our site is built and rigged up to GitHub, let's add in a CMS so that content creation is as simple as possible. Before we get started head on over to [Forestry.io](https://forestry.io/ "Forestry.io") and create your account. It’s free for personal use and allows you to add up to 3 users per website.

1. In the top right-hand corner of the page, click `Add Site`.
   * ![forestry-add-site](https://cambuchi.github.io/blog/uploads/forestry-add-site.png)
2. Then select `Hugo` as your static site generator.
   * ![forestry-pick-hugo](https://cambuchi.github.io/blog/uploads/forestry-pick-hugo.png)
3. Choose GitHub as the Git provider.
   * ![forestry-pick-github](https://cambuchi.github.io/blog/uploads/forestry-pick-github.png)
4. A browser window (not pictured) should then pop up asking for your credentials in order to authenticate.
5. After authentication simply select the your **build** repository (**Repo #1**), not your site repository. Pick the `main` branch of your repository.
   * ![forestry-pick-repo](https://cambuchi.github.io/blog/uploads/forestry-pick-repo.png)

   > Forestry should detect your config file and display `Config file found!`. If not, then make sure Hugo is properly set up.

That's it! Forestry is now set up as a CMS for your site. We will go over the workflow and how to use Forestry in more detail at the end.

## Automating

Since changing directories, pulling, adding, committing, and pushing all the time is tedious, we will also write a few bash scripts to automate updating our build and deploying our site.

> **Note:** All scripts will be created and saved onto the build's root directory.

1. First we will create a helper function to change directories since terminal cannot execute `cd` when called from a script. See [here](https://askubuntu.com/questions/481715/why-doesnt-cd-work-in-a-shell-script "https://askubuntu.com/questions/481715/why-doesnt-cd-work-in-a-shell-script") for more details.
   * **_path.sh_**

     ```bash
     # Filename: path.sh
     # This file should be sourced
     
     function public() {
     	cd "public"
     }
     ```
2. Next we will create a script that updates our build.
   * **_update.sh_**

     ```bash
     #!/bin/sh
     # If any part of the script fails the deploy stops.
     set -e
     
     # Status message
     printf "\033[0;32mUpdating build to GitHub…\033[0m\n" 
     
     # Update with any commits the CMS might have added.
     git pull
     
     # Add changes to git. 
     git add . 
     
     # Commit changes. 
     current="`date +'%Y-%m-%d %H:%M:%S'`"
     msg="Updated build: $current"
     git commit -m "$msg"
     
     # Push source. 
     git push origin main
     ```
3. Lastly we will create a script that builds our static files and deploys our site.
   * **_deploy.sh_**

     ```bash
     #!/bin/sh
     # Source the public directory to cd into.
     source ./path.sh
     
     # If any part of the script fails the deploy stops.
     set -e
     
     # Status message.
     printf "\033[0;32mDeploying updates to GitHub…\033[0m\n" 
     
     # Build the project. 
     hugo
     
     # Go to public folder.
     public
     
     # Add changes to git. 
     git add . 
     
     # Commit changes. 
     current="`date +'%Y-%m-%d %H:%M:%S'`"
     msg="Deployed site: $current"
     git commit -m "$msg"
     
     # Push source and deploy. 
     git push origin main
     ```

To use a script it's as easy as opening Git Bash in the build's root directory and typing `./update.sh`. Let's run both scripts right now since we have completed setting up our site's tech stack.

```bash
./update.sh
```

```bash
./deploy.sh
```

## Activate GitHub Pages

With our site set up and ready to go, let's turn on GitHub Pages for our site repository and get our content on the internet.

1. On GitHub, go to your site repository.
2. Click on `Settings`, then `Pages`
3. Select the main branch in the root directory and click save.

## Workflow

With everything completed and set up