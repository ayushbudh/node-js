#! /usr/bin/env node

// import packages
import open from 'open'
import fetch from 'node-fetch'
import yargs from 'yargs'
import dotenv from 'dotenv'
dotenv.config();

// parse env vars
const { argv } = yargs(process.argv)
// init fetch to reddit api
const res = await fetch(`${process.env.ENDPOINT}.json`)
const data = await res.json()
const randomIndex = Math.floor(Math.random() * data.data.children.length)
// get radom post from reddit api response of all posts on front page
const post = data.data.children[randomIndex]

if(argv.h){
    console.log('\n\n==================== COMMAND USAGE ==================== \n\n\t --print, -p   -   to print post title and link\n\t --open, -o    -   to open the post in your default browser\n\t -h\t       -   to print the command usage\n');
}
else if (argv.print || argv.p) {
  console.log(`
    Title: ${post.data.title}\n
    Link: ${post.data.permalink}
  `)
} else if(argv.open || argv.o) {
  // open in browser if not
  open(`${process.env.ENDPOINT}${post.data.permalink}`)
}else{
    console.log("Sorry can't quite get it. Use reddit -H to see this command usage.")
}
