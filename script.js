const searchBtn = document.querySelector(".searchBtn");
const showData = document.getElementById('wrapper');
const notfound = document.querySelector(".notFound");
const repoScroll = document.querySelector(".repo_scroll")
const followerScroll = document.querySelector(".follower_scroll");
const userContainer = document.querySelector(".user_container");

async function showContent(e) {
	e.preventDefault();
	let search = document.getElementById('search').value;
	let name = search.split(" ").join("")
	const dataUrl = await fetch(`https://api.github.com/users/${name}`);
	const profile = await dataUrl.json();
 
/*======Storing fetch data of followers & repos=====*/

        let followers = profile.followers_url;
        let repo = profile.repos_url;

/*======search user by login & name ========*/        
        console.log(dataUrl.status);
		if(dataUrl.status === 200){
			showData.style.display = "flex";
			document.getElementById('search').disabled = true;
		}else{
			notfound.style.display = "block";
			document.getElementById('search').disabled = true;
			alert("Please Enter Valid Username")
		}

       const userArea = document.createElement("div");
       const userImg = document.createElement("div");
       const aTag = document.createElement("a");
       const userPic = document.createElement("img");
       const userContent = document.createElement("div");
       const userName = document.createElement("a");
       const userh1 = document.createElement("h1")
       const userLink = document.createElement("p");
       const userBio = document.createElement("span");
       const userData = document.createElement("div");
       const userIcon = document.createElement("i");
       const userFollower = document.createElement("p");
       const userFollowing = document.createElement("p");

         userContainer.appendChild(userArea);
         userArea.appendChild(userImg);
         userImg.appendChild(aTag);
         aTag.appendChild(userPic);
         userArea.appendChild(userContent);
         userContent.appendChild(userName);
         userName.appendChild(userh1);
         userContent.appendChild(userLink);
         userContent.appendChild(userBio);
         userContent.appendChild(userData);
         userData.appendChild(userIcon);
         userData.appendChild(userFollower);
         userData.appendChild(userFollowing);
         userName.setAttribute("href",`${profile.html_url}`)
         userName.setAttribute("target","_blank");
         aTag.setAttribute("href",`${profile.html_url}`)
         aTag.setAttribute("target","_blank");


          userArea.classList.add("user_area");
          userImg.classList.add("user_img");  
          userContent.classList.add("user_content");
          userName.classList.add("user_name");
          userLink.classList.add("username");
          userBio.classList.add("user_bio")
          userData.classList.add("user_data");
          userIcon.className = "fa-solid fa-user-group";
          userFollower.classList.add("user_followers");
          userFollowing.classList.add("user_following");
        
        userPic.src = `${profile.avatar_url}`;
        userh1.innerHTML = `${profile.name}`;
        
        userLink.innerHTML = `${profile.login}`;
        userBio.innerHTML = `${profile.bio}`
        userFollower.innerHTML = `${profile.followers} followers`;
        userFollowing.innerHTML = `${profile.following} following`;
        
/*========Fetching Repos Data By using Followers Variable===========*/
        const repoUrl = await fetch(`${repo}`)
        const repoData = await repoUrl.json();
       	for (let i = 0; i < repoData.length; i++) {
          
        const repo = document.createElement("div");
        const divRepo = document.createElement("a")
        const repoTitle = document.createElement("h2");
        const repoDesc = document.createElement("p");
        const repoContent = document.createElement("div");
        const repoDay = document.createElement("p");
        const divider = document.createElement("div");

        repo.classList.add("repo_data");
        divRepo.classList.add("repo_name");
        divRepo.setAttribute("target","_blank");
        repoDesc.classList.add("repo_desc");
        repoContent.classList.add("repo_content");
        repoDay.classList.add("repo_day");
        divider.classList.add("divider");
   
        divRepo.appendChild(repoTitle);
        repo.append(divRepo);
        repo.appendChild(repoDesc);
        repo.appendChild(repoContent);
        repoContent.appendChild(repoDay);
        repo.appendChild(divider);
        repoScroll.appendChild(repo);

        repoTitle.innerHTML = `${repoData[i].name}`
        repoDesc.innerHTML = `${repoData[i].description}`
        repoDay.innerHTML = ` Last Updated on ${repoData[i].updated_at}`;
        divRepo.setAttribute("href",`${repoData[i].html_url}`)
       	}

/*=======Fetching Followers Data By using Followers Variable ========*/

        const followUrl = await fetch(`${followers}`);
        const followData = await followUrl.json();
        	for (let i = 0; i < followData.length; i++){        

            const followerArea = document.createElement("div");
            const followerImg = document.createElement("div");
            const img = document.createElement("img");
            const followerContent = document.createElement("div");
            const followerLinkName = document.createElement("a");
            const followerName = document.createElement("h1");
            const followerUsername = document.createElement("p");
            const followerDivider = document.createElement("div");

            followerArea.classList.add("follower_area");
            followerImg.classList.add("follower_img");
            img.classList.add("follower_img");
            followerContent.classList.add("follower_content");
            followerLinkName.classList.add("follower_link");
            followerName.classList.add("follower_name");
            followerUsername.classList.add("follower_username");
            followerDivider.classList.add("right_section_divider");


            followerScroll.appendChild(followerArea);                                                                                           
            followerArea.appendChild(followerImg);
            followerImg.appendChild(img);
            followerArea.appendChild(followerContent);
            followerContent.appendChild(followerLinkName);
            followerLinkName.appendChild(followerName);
            followerContent.appendChild(followerUsername);
            followerScroll.appendChild(followerDivider);
       
            img.src = `${followData[i].avatar_url}`;
            followerName.innerHTML = `${followData[i].login}`;
            followerUsername.innerHTML = `${followData[i].html_url}`;
            followerLinkName.setAttribute("target","_blank");
            followerLinkName.setAttribute("href",`${followData[i].html_url}`)

        	}
          document.getElementById("footer").style.display = "flex";
	}
searchBtn.addEventListener('click', showContent);
