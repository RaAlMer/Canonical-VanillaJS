const ul = document.getElementById("data");
const list = document.createDocumentFragment();
const url =
  "https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json";

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let canonical = data;

    canonical.map((canonicalPost) => {
      // Each element of the JSON
      let li = document.createElement("li");
      // Each post in the list
      let card = document.createElement("div");
      // Categorie of the post
      let h5 = document.createElement("h5");
      // Horizontal line to separate category from the rest of the post
      let hr = document.createElement("hr");
      // Picture in the post
      let picture = document.createElement("img");
      // Section that contains the title of the post, the author and the date it was published
      let div = document.createElement("div");
      // Title of the post
      let title = document.createElement("a");
      // Author and date the post was published
      let authorDate = document.createElement("p");
      // Horizontal line to separate the author and date from the rest of the post
      let hr2 = document.createElement("hr");
      // Paragraph that contains the content of the post
      let p = document.createElement("p");

      // Formatting the date into DD Month YYYY
      let myDate = new Date(canonicalPost.date);
      let output =
        myDate.getDate() +
        " " +
        myDate.toLocaleString("en-UK", { month: "long" }) +
        " " +
        myDate.getFullYear();

      // Adding Vanilla Framework classes to the tags
      li.className = "p-card col-small-1 col-medium-2 col-3";
      card.className = "p-card__content";
      hr.className = "p-separator u-no-margin--top firstHr";
      picture.className = "p-card__image";
      title.className = "p-card__content";
      hr2.className = "p-separator u-no-margin";
      
      // Adding content of the post to the tags
      h5.innerHTML =
        `${canonicalPost._embedded["wp:term"][0][0].name}`.toUpperCase(); //Categories in the API
      title.innerHTML = `${canonicalPost.title.rendered}`;
      title.href = `${canonicalPost.link}`;
      authorDate.innerHTML = `<i>By <a href=${canonicalPost._embedded.author[0].link}>${canonicalPost._embedded.author[0].name}</a> on ${output}</i>`;
      picture.src = `${canonicalPost.featured_media}`;
      p.innerHTML = "Article"; // Resume of post's content
      /* p.innerHTML = `${canonicalPost.content.rendered}`; */ // This would be the content of the post

      // Appending all the childs to their parents
      li.appendChild(card);
      card.appendChild(h5);
      card.appendChild(hr);
      card.appendChild(picture);
      card.appendChild(div);
      div.appendChild(title);
      div.appendChild(authorDate);
      card.appendChild(hr2);
      card.appendChild(p);
      list.appendChild(li);
    });
  })
  .then(() => {
    ul.appendChild(list);
  })
  .catch(function (error) {
    console.log(error);
  });
