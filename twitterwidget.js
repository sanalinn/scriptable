// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: magic;
const bearer = "AAAAAAAAAAAAAAAAAAAAAEABJAEAAAAAUCV548ZeXGfMXi%2BpZMmTCgrhZWY%3DNZWBW8zRNqVgM3x3ojjM513VZhQU3zdX3CPyCam9wq6CY4NorE"


let user = "jurina38g"


let filename = Script.name() + ".jpg"
let files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const fileExists = files.fileExists(path)

let fileImage = files.readImage(path)
 
console.log("file")

let widget=new ListWidget()
    widget.addSpacer()
let stack = widget.addStack()
    stack.layoutVertically()


if (await isOnline()) {
  // do online stuff
} else {
  // do offline stuff
  widget.backgroundImage =  fileImage
  
  return
}




const req = new Request ("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name="+ user +"&count=1")

req.headers = {"Authorization": ("Bearer " + bearer) ,"Content-Type": "application/json"}



let timeline = await req.loadJSON()



let tweet = timeline[0]

let date = new Date(tweet.created_at)

console.log(date)

let tweetid = tweet.id_str

console.log("1.1 api: " + tweetid)


tweeturl = "https://twitter.com/" + user + "/status/" + tweetid

widget.url = tweeturl

if (!config.runsInWidget) {
Pasteboard.copyString(tweeturl)}

let tweetreq = new Request("https://api.twitter.com/2/tweets?ids="+ tweetid + "&expansions=attachments.media_keys&media.fields=url" )

tweetreq.headers = {"Authorization": ("Bearer " + bearer) ,"Content-Type": "application/json"}

let json = await tweetreq.loadJSON()

let textlf = tweet.text

let text = textlf.replace('\n', 
" ")


var imageURLs = []

console.log("2 api")
// 
// 
let textsObject = stack.addText(text)

textsObject.leftAlignText()

textsObject.font =  new Font("HiraginoSans-W6", 13)

//textsObject.shadowRadius =1

stack.addSpacer()


let textsObject2 = stack.addText(
(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+ (date.getMinutes()<10 ? "0" : "" )+ date.getMinutes().toString()+" _Twitter "
)


textsObject2.rightAlignText()
textsObject2.font = new Font("HiraginoSans-W3", 10)



//textsObject2.shadowRadius =1








if (json.hasOwnProperty("includes")){
let images = json.includes.media

images.forEach(image =>imageURLs.push(image.url))

let pnum = 
Math.floor(Math.random()*(imageURLs.length-0))

let  imgraw = imageURLs[pnum]

let img = imgraw +":small"

// let img = imgraw.replace(".jpg", "?format=jpg&name=small")
console.log(img)


let bgReq = new Request(img)

var bgImage = await bgReq.loadImage()

    stack.backgroundColor = new Color("#001b1b", 0.67)
    
    widget.setPadding(87, -20, -10, -20)
    stack.layoutVertically()
    stack.bottomAlignContent()
    stack.setPadding(5, 30, 15, 30)
    
    textsObject.lineLimit =3
    textsObject.minimumScaleFactor = 0.9
    
    
    textsObject2.textColor = new Color("#ffaa28")
    
    widget.backgroundImage = bgImage
    
    fileImage = files.writeImage(path, bgImage)

}else{
  
    widget.setPadding(-10, -10, -10, -10)
    stack.setPadding(35, 20, 20, 20)
    
//     let bgc = new LinearGradient([new Color("ffaa28"), new Color("ffffff")])
    
    widget.backgroundColor = new Color("#58878a")
    
//     textsObject.lineLimit = 10
    
    textsObject.minimumScaleFactor = 1
    
    
    
    textsObject2.textColor = new Color("ff9c00")

}





widget.presentSmall()

Script.setWidget(widget)






async function isOnline() {
  const wv = new WebView()
  let js ="navigator.onLine"
  let r = await wv.evaluateJavaScript(js)
  return r
}


