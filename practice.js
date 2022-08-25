let myLeads = []
const inputEl = document.querySelector(".input")
const inputBtn = document.querySelector(".savebtn")
const ulEl = document.querySelector(".container")
// 1. Store the delete button in a deleteBtn variable
const deleteBtn = document.querySelector(".delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.querySelector(".savetab")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function render(Leads) {
    let listItems = ""
    const https = "https://"
    for (let i = 0; i < Leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${https}${Leads[i]}'>
                     ${Leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
 
// 2. Listen for double clicks on the delete button (google it!)
// 3. When clicked, clear localStorage, myLeads, and the DOM

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear(leadsFromLocalStorage)
    myLeads = []
    render(myLeads)
})


inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
})

