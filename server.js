
const express = require('express');
const cors = require('cors');
const ig = require('instagram-scraping');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT || 5500;

let postCount, imgURL, followers;

app.get("/", (req, res, next) => {
		ig.scrapeUserPage("advertere.tms").then((result) => {
			postCount = result.user.edge_owner_to_timeline_media.count;
			followers = result.user.edge_followed_by.count;
			imgURL = result.user.edge_owner_to_timeline_media.edges.map((edge) => {
				return edge.node.thumbnail_resources[0].src;
			});
			// console.log(postCount, imgURL)
      res.send({ postCount: postCount, followers: followers, imgURL: imgURL });
		});
});

app.listen(PORT, () => {
  console.log(`successfully connected to port ${PORT}`);
});
