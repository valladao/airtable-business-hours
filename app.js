const base = require("airtable").base("appdfhl8Hj1EOYKhv")
const express = require("express")
const path = require("path")

const app = express()
app.set("view engine", "pug")
app.set("views", path.join(__dirname, "."))

let records

app.get("/", async (req, res) => {
  if (records) {
    console.log("used cache")
    res.render("page", {
      records,
    })
  } else {
    records = await base("Business Hours")
      .select({
        view: "Grid view",
      })
      .firstPage()
    console.log("cached")
    res.render("page", {
      records,
    })
    setTimeout(() => {
      records = null
      console.log("cache cleaned")
    }, 10 * 1000)
  }
})

app.listen(3000, () => console.log("Server ready"))
