// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: magic;
let array = ["jurinamatsui3"]

let Parameter = args.widgetParameter

console.log(Parameter)

let user = array[0]//array[Math.floor(Math.random()*(array.length))]

console.log(user)

let filename = Script.name() + ".jpg"
let files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const fileExists = files.fileExists(path)

// 
// 

let fileImage = files.readImage(path)

let widget = new ListWidget()
    widget.addSpacer()
    
    widget.setPadding(87, -20, -10, -20)
let stack = widget.addStack()
    stack.layoutVertically()
    stack.bottomAlignContent()
    stack.backgroundColor = new Color("#001b1b", 0.67)
    stack.setPadding(5, 30, 15, 30)

if (await isOnline()) {
  // do online stuff
} else {
  // do offline stuff
  widget.backgroundImage =  fileImage
  
  return
}

var refreshDate = Date.now() + 1000*60*57
  widget.refreshAfterDate = new Date(refreshDate)


// 
// 
// 

let userReq = new Request("https://www.instagram.com/"+user+"/?__a=1")

userReq.method = "GET"
userReq.headers = {"Content-Type": "application/json"}

let info = await userReq.loadJSON()


console.log(info)

let userID = info.graphql.user.id

// let posts = 
// info.graphql.user.edge_owner_to_timeline_media.count

//if(posts/12 >5){var num = 5}else{var num = Math.trunc(posts/12)}

// var cursor = null

// QuickLook.present(image)
var imageURLs = []
 
 
// let url = new Request("https://www.instagram.com/graphql/query/?query_hash=472f257a40c653c64c666ce877d59d2b&variables=%7B%22id%22%3A%22" + userID + "%22%2C%22first%22%3A12%2C%22after%22%3A" +  cursor + "%7D")


// let json = await url.loadJSON()

// cursor = "%22" + json.data.user.edge_owner_to_timeline_media.page_info.end_cursor + "%22"

let images = info.graphql.user.edge_owner_to_timeline_media.edges[0]


imageURLs[0] = images.node

// images.forEach(image => imageURLs.push(image.node))

//let pnum = Math.floor(Math.random()*(imageURLs.length-0))

let postUrl =  "https://instagram.com/p/" + imageURLs[0].shortcode

widget.url = postUrl

if (!config.runsInWidget) {
Pasteboard.copyString(postUrl)

widget.url = "https://www.instagram.com/"+user+"/?__a=1"
}

console.log(postUrl)

var img
var imageURLs_inpost = []

if (imageURLs[0].__typename != "GraphSidecar"){
  
   img = imageURLs[0].display_url  
 }else{
  let imgreq = new Request(postUrl+"/?__a=1")



  let imglist= await imgreq.loadJSON()
  images_inpost = imglist.graphql.shortcode_media.edge_sidecar_to_children.edges

  images_inpost.forEach(image =>imageURLs_inpost.push(image.node))

    var pnum = Math.floor(Math.random()*(imageURLs_inpost.length))

console.log(pnum)

  img = imageURLs_inpost[pnum].display_url  
}



// (imageURLs[0].__typename == "GraphVideo")

var texts

if (imageURLs[0].product_type == "igtv"){
  texts= info.graphql.user.edge_felix_video_timeline.edges[0].node.title
 

 
}else{
text = imageURLs[0].edge_media_to_caption.edges[0].node.text
}







let timestamp = imageURLs[0].taken_at_timestamp

let date = new Date(timestamp*1000)


let oldtimestamp = Keychain

if (oldtimestamp.contains("timestamp")){
   if((oldtimestamp.get("timestamp") == timestamp) &&(imageURLs_inpost.length <2)){
    return }
  }
  
oldtimestamp.set("timestamp", timestamp.toString())



let bgReq = new Request(img)

let bgImage = await bgReq.loadImage()

/*

let imgSize = bgImage.size

let width = 758

let height = parseInt((width/imgSize.width)*imgSize.height)

let drawing = new DrawContext()

drawing.size = new Size(width,height)

let dImage = drawing.drawImageInRect(bgImage, new Rect(0, 0, width, height))

let fImage = drawing.getImage()

*/


fileImage = files.writeImage(path, bgImage)
// 


// 

//

widget.backgroundImage =  bgImage




let textsObject = stack.addText(text.replace(/\n/g, " "))

textsObject.lineLimit =3

textsObject.leftAlignText()

textsObject.font =  new Font("HiraginoSans-W6", 13)

textsObject.minimumScaleFactor = 0.9







stack.addSpacer()

//


let textsObject2 = stack.addText(
(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+ (date.getMinutes()<10 ? "0" : "" )+ date.getMinutes().toString()+" _Instagram "
)

textsObject2.rightAlignText()
textsObject2.font = new Font("HiraginoSans-W3", 10)

textsObject2.textColor = new Color("#ffaa28")











widget.presentSmall()

Script.setWidget(widget)





async function shadowImage (img) {
  let ctx = new DrawContext()
  // 把画布的尺寸设置成图片的尺寸
  ctx.size = img.size
  // 把图片绘制到画布中
  ctx.drawImageInRect(img, new Rect(0, 0, img.size['width'], img.size['height']))
  // 设置绘制的图层颜色，为半透明的黑色
  ctx.setFillColor(new Color('#000000', 0.3))
  
  // 绘制图层
  ctx.fillRect(new Rect(0, 0, img.size['width'], img.size['height']))
  
  // 导出最终图片
  return await ctx.getImage()
}






async function isOnline() {
  const wv = new WebView()
  let js ="navigator.onLine"
  let r = await wv.evaluateJavaScript(js)
  return r
}