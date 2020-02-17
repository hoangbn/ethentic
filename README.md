# ETHentic
## Inspiration
Our team was determined to challenge a major problem in society, and create a practical solution. It occurred to us early on that **false facts** and **fake news** has become a growing problem, due to the availability of information over common forms of social media. Many initiatives and campaigns recently have used approaches, such as ML fact checkers, to identify and remove fake news across the Internet. Although we have seen this approach become evidently better over time, our group felt that there must be a way to innovate upon the foundations created from the ML.

In short, our aspirations to challenge an ever-growing issue within society, coupled with the thought of innovating upon current technological approaches to the solution, truly inspired what has become ETHentic.

## What it does
ETHentic is a **betting platform** with a twist. Rather than preying on luck, you play against the odds of truth and justice. Users are given random snippets of journalism and articles to review, and must determine whether the information presented within the article is false/fake news, or whether it is legitimate and truthful, **based on logical reasoning and honesty**. 

Users must initially trade in Ether for a set number of tokens (0.30ETH = 100 tokens). One token can be used to review one article. Every article that is chosen from the Internet is first evaluated using an ML model, which determines whether the article is truthful or false. For a user to _win_ the bet, they must evaluate the same choice as the ML model. By winning the bet, a user will receive a $0.40 gain on bet. This means a player is very capable of making a return on investment in the long run. 

Any given article will only be reviewed 100 times by any unique user. Once the 100 cap has been met, the article will retire, and the results will be published to the Ethereum blockchain. The results will include anonymous statistics of ratio of truth:false evaluation, the article source, and the ML's original evaluation. This data is public, immutable, and has a number of advantages. All results going forward will be capable of improving the ML model's ability to recognize false information, by comparing the relationship of assessment to public review, and training the model in a cost-effective, open source method. 

To summarize, ETHentic is an incentivized, fun way to educate the public about recognizing fake news across social media, while improving the ability of current ML technology to recognize such information. We are improving the two current best approaches to beating fake news manipulation, by educating the public, and improving technology capabilities. 

## How we built it 
ETHentic uses a multitude of tools and software to make the application possible. First, we drew out our task flow. After sketching wireframes, we designed a prototype in Framer X. We conducted informal user research to inform our UI decisions, and built the frontend with React. 

We used **Blockstack** Gaia to store user metadata, such as user authentication, betting history, token balance, and Ethereum wallet ID in a decentralized manner. We then used MongoDB and Mongoose to create a DB of articles and a counter for the amount of people who have viewed any given article. Once an article is added, we currently outsourced to Google's fact checker ML API to generate a true/false value. This was added to the associated article in Mongo **temporarily**.  

Users who wanted to purchase tokens would receive a Metamask request, which would process an Ether transfer to an admin wallet that handles all the money in/money out. Once the payment is received, our node server would update the Blockstack user file with the correct amount of tokens. 

Users who perform betting receive instant results on whether they were correct or wrong, and are prompted to accept their winnings from Metamask.

Everytime the Mongo DB updates the counter, it checks if the count = 100. Upon an article reaching a count of 100, the article is removed from the DB and will no longer appear on the betting game. The ML's initial evaluation, the user results, and the source for the article are all published permanently onto an Ethereum blockchain. We used IPFS to create a hash that linked to this information, which meant that the cost for storing this data onto the blockchain was massively decreased. We used Infuria as a way to get access to IPFS without needing a more heavy package and library. Storing on the blockchain allows for easy access to useful data that can be used in the future to train ML models at a rate that matches the user base growth.

As for our brand concept, we used a green colour that reminded us of Ethereum Classic. Our logo is Lady Justice - she's blindfolded, holding a sword in one hand and a scale in the other. Her sword was created as a tribute to the Ethereum logo. We felt that Lady Justice was a good representation of what our project meant, because it gives users the power to be the judge of the content they view, equipping them with a sword and a scale. Our marketing website, ethergiveawayclaimnow.online, is a play on "false advertising" and not believing everything you see online, since we're not actually giving away Ether (sorry!). We thought this would be an interesting way to attract users. 

## Challenges we ran into
Figuring out how to use and integrate new technologies such as Blockstack, Ethereum, etc., was the biggest challenge. Some of the documentation was also hard to follow, and because of the libraries being a little unstable/buggy, we were facing a lot of new errors and problems.

## Accomplishments that we're proud of
We are really proud of managing to create such an interesting, fun, yet practical potential solution to such a pressing issue. Overcoming the errors and bugs with little well documented resources, although frustrating at times, was another good experience.

## What we learned
We think this hack made us learn two main things:
1) Blockchain is more than just a cryptocurrency tool.
2) Sometimes even the most dubious subject areas can be made interesting.

The whole fake news problem is something that has traditionally been taken very seriously. We took the issue as an opportunity to create a solution through a different approach, which really stressed the lesson of thinking and viewing things in a multitude of perspectives.

## What's next for ETHentic
ETHentic is looking forward to the potential of continuing to develop the ML portion of the project, and making it available on test networks for others to use and play around with. 