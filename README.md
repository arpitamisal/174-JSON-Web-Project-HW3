Name: Arpita Misal
HW3 - JSON 

AWS EC2 URL:
http://44.202.223.244/index.html


Instructions:
1. Open the above URL in a browser.
2. Enter the JSON file name in the textbox (e.g., truckinglist.json).
3. Click "Submit Query" to display the trucking companies table.

# 🚚 Trucking Companies JSON Viewer

A dynamic web application that loads and displays trucking company data from a JSON file. Built using **HTML, JavaScript, and JSON parsing**, the app validates input data and renders a structured table with company details and logos.

---

## 🚀 Features

- 📥 Load trucking data from a JSON file URL
- 📊 Dynamically generate a table of companies
- 🏢 Display company details:
  - Name
  - Services
  - Headquarters info
  - Revenue
  - Website
  - Logo
- ⚠️ Error handling for invalid or malformed JSON
- 🧪 Multiple test cases for edge conditions

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- JavaScript (DOM Manipulation)
- JSON

---

## ▶️ How to Run

### Option 1: Local

1. Open the project folder  
2. Open `index.html` in your browser  
3. Enter a JSON file name like:


truckinglist.json


4. Click **Submit Query**

---

### Option 2: Hosted (AWS EC2)

Open:

👉 http://44.202.223.244/index.html :contentReference[oaicite:0]{index=0}  

---

## 🧠 How It Works

- The user enters a JSON file URL in the input field :contentReference[oaicite:1]{index=1}  
- JavaScript fetches and parses the JSON  
- The app validates:
  - Root structure (`Mainline → Table`)
  - Header existence
  - Row format (must be an array)
- If valid → renders a table  
- If invalid → displays an error message  

Example valid data structure: 

```json
{
  "Mainline": {
    "Table": {
      "Header": { "Data": [...] },
      "Row": [...]
    }
  }
}
```

---

## ⚠️ Error Handling

The app handles multiple edge cases:

- ❌ Invalid JSON format
- ❌ Missing root (Mainline)
- ❌ Missing headers
- ❌ Incorrect row type
- ❌ Empty dataset
- ❌ Missing fields (logo, homepage, etc.)

Test files included:

- truckinglistbadrow.json
- truckinglistempty.json
- truckinglistmissingroot.json
- truckinglistpartial.json
