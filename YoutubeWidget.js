// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
if (await isOnline()) {
  // do online stuff
} else {
  // do offline stuff
//   widget.backgroundImage =  fileImage
  
  return
}



let req = new Request("https://api.factmaven.com/xml-to-json?xml=https://www.youtube.com/feeds/videos.xml?channel_id=UCA6XWTTtC2f88M2xpmhLRBg")

let jsonraw = await req.loadString()



let json = JSON.parse(jsonraw.replace(/media\:/g,"media").replace(/@/g, ""))

let mediagroup = json.feed.entry[0].mediagroup

let text = mediagroup.mediatitle

console.log(text)

let imageurl = mediagroup.mediathumbnail.url

console.log(imageurl)

let imagereq = new Request(imageurl)

let image = await imagereq.loadImage()


let date = new Date(json.feed.entry[0].published)

console.log(date)



// 

let widget = new ListWidget()

widget.url = "youtube://channel/UCA6XWTTtC2f88M2xpmhLRBg"

var refreshDate = Date.now() + 1000*60*57
  widget.refreshAfterDate = new Date(refreshDate)

widget.backgroundImage = image

widget.addSpacer()

let stack = widget.addStack()



stack.backgroundColor = new Color("#001b1b", 0.67)

let textsObject = stack.addText(text)

textsObject.leftAlignText()

textsObject.font =  new Font("HiraginoSans-W6", 13)

    
   widget.setPadding(87, -20, -10, -20)
    stack.layoutVertically()
    stack.bottomAlignContent()
    stack.setPadding(5, 30, 15, 30)
    
    textsObject.lineLimit =3
    textsObject.minimumScaleFactor = 0.9
    
     stack.addSpacer()



let textsObject2 = stack.addText(
(date.getMonth()+1)+"/"+date.getDate()+" "+date.getHours()+":"+ (date.getMinutes()<10 ? "0" : "" )+ date.getMinutes().toString()+" _YouTube "
)


textsObject2.rightAlignText()
textsObject2.font = new Font("HiraginoSans-W3", 10)
        
        
    
     textsObject2.textColor = new Color("#ffaa28")



widget.presentSmall()




Script.setWidget(widget)







async function isOnline() {
  const wv = new WebView()
  let js ="navigator.onLine"
  let r = await wv.evaluateJavaScript(js)
  return r
}

